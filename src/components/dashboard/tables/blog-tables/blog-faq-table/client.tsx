"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { User } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { Blog, faqs } from "@prisma/client";

interface FaqClientProps {
  data: faqs[] | null;
}

export const FaqClient: React.FC<FaqClientProps> = ({ data }) => {
  const router = useRouter();
  if (!data) data = [];
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Faqs (${data?.length})`}
          description="Manage Faqs for this blog."
        />
        {/* <Button
          className="text-xs md:text-sm"
          
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button> */}
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
