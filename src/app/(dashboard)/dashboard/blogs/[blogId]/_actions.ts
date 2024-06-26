"use server";

import { revalidatePath } from "next/cache";
import { currentUser } from "~/lib/auth";
import { db } from "~/lib/prisma";
import { BlogSchema } from "~/validators/blog";
import { FaqSchema } from "~/validators/faq";

export const CreateFaq = async (faq: FaqSchema) => {
  const { success, data } = FaqSchema.safeParse(faq);
  if (!success) {
    return { error: "Invalid data" };
  }
  try {
    const user = await currentUser();
    if (user?.role !== "ADMIN") {
      return { error: "You are not authorized to perform this action" };
    }
    const faqData = await db.faqs.create({
      data: {
        answer: faq.answer,
        question: faq.question,
        blogId: faq.blogId,
      },
    });
    revalidatePath(`/dashboard/blogs/${data.blogId}`);
    return { success: "FAQ created successfully" };
  } catch (error) {
    return { error: "Error creating FAQ" };
  }
};

export const SaveBlog = async (blogStr: string) => {
  const session = await currentUser();
  if (!session || session.role !== "ADMIN") {
    return { error: "You are not authorized to perform this action" };
  }
  const blog = JSON.parse(blogStr);
  const { success, data } = BlogSchema.safeParse(blog);
  if (!success) {
    return { error: "Invalid data" };
  }
  try {
    await db.blog.update({
      where: {
        id: blog.id,
      },
      data: {
        name: blog.name,
        content: blog.content.json,
        html: blog.content.html,
        author: {
          connect: {
            id: session.id,
          },
        },
      },
    });
    revalidatePath(`/dashboard/blogs`);
    return { success: "Blog saved successfully" };
  } catch (error) {
    return { error: "Error saving blog" };
  }
};
