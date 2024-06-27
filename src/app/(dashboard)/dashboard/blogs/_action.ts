"use server";
import { revalidatePath } from "next/cache";
import { currentUser } from "~/lib/auth";
import { db } from "~/lib/prisma";

export const CreateNewBlog = async () => {
  const session = await currentUser();
  if (!session || session.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }
  try {
    const blog = await db.blog.create({
      data: {
        name: "New Blog",
        author: {
          connect: {
            id: session.id,
          },
        },
      },
    });

    return {
      success: "Blog created successfully. Redirecting...",
      id: blog.id,
    };
  } catch (e) {
    return { error: "Something went wrong, please try again later" };
  }
};
export const DeleteBlog = async (id: string) => {
  const session = await currentUser();
  if (!session || session.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }
  try {
    await db.blog.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/blogs");
    return {
      success: "Blog deleted successfully",
    };
  } catch (e) {
    console.log(e);
    return { error: "Something went wrong, please try again later" };
  }
};
