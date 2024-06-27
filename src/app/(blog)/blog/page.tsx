import Link from "next/link";
import { db } from "~/lib/prisma";

const BlogsPage = async () => {
  const blogs = await db.blog.findMany();
  return (
    <div>
      {blogs.map((blog) => {
        return (
          <div key={blog.id}>
            <h1>{blog.name}</h1>
            <Link href={`/blog/${blog.id}`}>Read more</Link>
          </div>
        );
      })}
    </div>
  );
};
export default BlogsPage;
