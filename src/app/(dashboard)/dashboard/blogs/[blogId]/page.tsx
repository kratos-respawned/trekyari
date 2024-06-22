import BreadCrumb from "@/components/dashboard/breadcrumb";
import { ProductForm } from "@/components/dashboard/forms/product-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Blog } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import Editor from "~/components/editor/TailwindEditor";
import { db } from "~/lib/prisma";
interface BlogEditorParams {
  params: {
    blogId: string;
  };
}
export default async function BlogEditor({ params }: BlogEditorParams) {
  let blog: Blog | null = null;
  if (params.blogId !== "new") {
    blog = await db.blog.findUnique({
      where: {
        id: params.blogId,
      },
    });
    if (blog === null) notFound();
  }
  const breadcrumbItems = [
    { title: "User", link: "/dashboard/blogs" },
    { title: "Create", link: "/dashboard/blogs/create" },
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <Editor />
      </div>
    </ScrollArea>
  );
}
