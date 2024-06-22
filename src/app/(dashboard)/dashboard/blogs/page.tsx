import BreadCrumb from "@/components/dashboard/breadcrumb";

import { BlogClient } from "~/components/dashboard/tables/blog-tables/client";
import { db } from "~/lib/prisma";

const breadcrumbItems = [{ title: "Blogs", link: "/dashboard/blogs" }];
export default async function BlogsDashboard() {
  const blogs = await db.blog.findMany();
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <BlogClient data={blogs} />
      </div>
    </>
  );
}
