import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "~/components/navbar";
import { buttonVariants } from "~/components/ui/button";
import { CardContent } from "~/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { db } from "~/lib/prisma";
import { cn, formatDate } from "~/lib/utils";

interface PageParams {
  params: {
    id: string;
  };
}
const post = {
  title: "Conquering the Valley of Flowers Trek: A Challenge Worth Taking",
  date: "2022-01-01",
  image: "/home/test2.jpg",
  authors: [
    {
      _id: "1",
      title: "John Doe",
      twitter: "johndoe",
      avatar: "https://avatars.dicebear.com/api/avataaars/johndoe.svg",
    },
  ],
};
const BlogPage = async ({ params }: PageParams) => {
  const blog = await db.blog.findUnique({
    where: {
      id: params.id,
    },
    include: {
      author: true,
    },
  });
  if (!blog) {
    notFound();
  }
  return (
    <main className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <article className="container relative max-w-4xl py-6 lg:pt-10">
        <Link
          href={`/blog`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-[-200px] top-14 hidden xl:inline-flex"
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
        <div>
          <h1 className=" inline-block font-heading text-4xl leading-tight lg:text-5xl">
            {blog.name}
          </h1>
          {blog.createdAt && (
            <time
              dateTime={blog.createdAt.toDateString()}
              className="block mt-2 text-sm text-muted-foreground"
            >
              Published on {formatDate(blog.createdAt.toDateString())}
            </time>
          )}

          <div className="mt-4 flex space-x-4">
            {
              <Link
                key={blog.author.id}
                href={`https://twitter.com/${blog.author.email}`}
                className="flex items-center space-x-2 text-sm"
              >
                <Image
                  src={blog.author.image || post.authors.at(0)?.avatar || ""}
                  alt={blog.author.name || "anonymous"}
                  width={42}
                  height={42}
                  className="rounded-full bg-white"
                />
                <div className="flex-1 text-left leading-tight">
                  <p className="font-medium">{blog.author.name}</p>
                  {blog.author.email && (
                    <p className="text-[12px] text-muted-foreground">
                      {blog.author.email}
                    </p>
                  )}
                </div>
              </Link>
            }
          </div>
        </div>
        <Carousel autoplay className="w-full ">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <Image
                  src={post.image}
                  alt={post.title}
                  // width={720}
                  // height={405}
                  width={1024}
                  height={576}
                  quality={100}
                  className="my-8 rounded-lg border aspect-[720/405] object-cover bg-muted transition-colors"
                  priority
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: blog.html || "No content" }}
        />
        <hr className="mt-12" />
        <div className="flex justify-center py-6 lg:py-10">
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            See all posts
          </Link>
        </div>
      </article>
    </main>
  );
};
export default BlogPage;
