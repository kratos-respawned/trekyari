import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
const BlogPage = ({ params }: PageParams) => {
  return (
    <main className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <article className="container relative max-w-4xl py-6 lg:pt-10">
        <Link
          href="/blog/1"
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
            {post.title}
          </h1>
          {post.date && (
            <time
              dateTime={post.date}
              className="block mt-2 text-sm text-muted-foreground"
            >
              Published on {formatDate(post.date)}
            </time>
          )}
          {post.authors?.length ? (
            <div className="mt-4 flex space-x-4">
              {post.authors.map((author) =>
                author ? (
                  <Link
                    key={author._id}
                    href={`https://twitter.com/${author.twitter}`}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <Image
                      src={author.avatar}
                      alt={author.title}
                      width={42}
                      height={42}
                      className="rounded-full bg-white"
                    />
                    <div className="flex-1 text-left leading-tight">
                      <p className="font-medium">{author.title}</p>
                      <p className="text-[12px] text-muted-foreground">
                        @{author.twitter}
                      </p>
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          ) : null}
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
