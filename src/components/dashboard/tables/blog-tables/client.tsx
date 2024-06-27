"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { User } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { Blog } from "@prisma/client";
import { useTransition } from "react";
import { CreateNewBlog } from "~/app/(dashboard)/dashboard/blogs/_action";
import { toast } from "~/components/ui/use-toast";

interface ProductsClientProps {
  data: (Blog & {
    link: string;
  })[];
}

export const BlogClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const newBlog = async () => {
    startTransition(async () => {
      const { success, error, id } = await CreateNewBlog();
      if (error) {
        toast({
          title: "Error",
          description: error,
        });
        return;
      }
      toast({
        title: "Success",
        description: success,
      });
      router.push(`/dashboard/blogs/${id}`);
    });
  };
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={`Blogs (${data.length})`} description="Manage blogs " />
        <form action={newBlog}>
          <Button disabled={isPending} className="text-xs md:text-sm">
            {isPending ? "Creating..." : "New Blog"}{" "}
            <Plus size={16} className="ml-2" />
          </Button>
        </form>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
