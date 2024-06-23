import BreadCrumb from "@/components/dashboard/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Blog, faqs } from "@prisma/client";
import { notFound } from "next/navigation";
import { JSONContent } from "novel";
import React from "react";
import { BlogForm } from "~/components/dashboard/forms/blogs-form";
import Editor from "~/components/editor/TailwindEditor";
import { db } from "~/lib/prisma";

interface BlogEditorParams {
  params: {
    blogId: string;
  };
}
export default async function BlogEditor({ params }: BlogEditorParams) {
  let blog: Blog | null = null;
  let faqs: faqs[] | null = null;
  if (params.blogId !== "new") {
    blog = await db.blog.findUnique({
      where: {
        id: params.blogId,
      },
    });
    faqs = await db.faqs.findMany({
      where: {
        blogId: params.blogId,
      },
    });
    if (blog === null) notFound();
  }
  const breadcrumbItems = [
    { title: "User", link: "/dashboard/blogs" },
    blog
      ? { title: blog.name, link: `/dashboard/blogs/${blog.id}` }
      : { title: "Create", link: "/dashboard/blogs/create" },
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <BlogForm blog={blog}  faqs={faqs}/>
      </div>
    </ScrollArea>
  );
}
