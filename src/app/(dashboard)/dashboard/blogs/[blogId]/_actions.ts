"use server";

import { revalidatePath } from "next/cache";
import { currentUser } from "~/lib/auth";
import { db } from "~/lib/prisma";
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
    })
    revalidatePath(`/dashboard/blogs/${data.blogId}`);
    return { success: "FAQ created successfully" };
  } catch (error) {
    return { error: "Error creating FAQ" };
  }
};
