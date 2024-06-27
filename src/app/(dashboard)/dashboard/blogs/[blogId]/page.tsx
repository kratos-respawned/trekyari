import BreadCrumb from "@/components/dashboard/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { notFound } from "next/navigation";
import React from "react";
import { BlogForm } from "~/components/dashboard/forms/blogs-form";
import { db } from "~/lib/prisma";
export const dynamic="force-dynamic"
interface BlogEditorParams {
  params: {
    blogId: string;
  };
}
export default async function BlogEditor({ params }: BlogEditorParams) {
  const blog = await db.blog.findUnique({
    where: {
      id: params.blogId,
    },
  });
  if (blog === null) notFound();
  const faqs = await db.faqs.findMany({
    where: {
      blogId: params.blogId,
    },
  });

  const breadcrumbItems = [
    { title: "User", link: "/dashboard/blogs" },
    {
      title: blog.name,
      link: `/dashboard/blogs/${blog.id}`,
    },
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <BlogForm blog={blog} faqs={faqs} />
      </div>
    </ScrollArea>
  );
}
