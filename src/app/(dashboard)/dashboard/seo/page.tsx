import BreadCrumb from "@/components/dashboard/breadcrumb";
import { columns } from "@/components/dashboard/tables/seo-tables/columns";
import { SeoTable } from "@/components/dashboard/tables/seo-tables/seo-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import {
  createData,
  fetchSeoEntries,
} from "@/app/(dashboard)/actions/seo/seo.action";

const breadcrumbItems = [{ title: "Seo", link: "/dashboard/seo" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function Page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const search = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const { total, items } = await fetchSeoEntries(
    offset,
    pageLimit,
    search as string
  );
  const pageCount = Math.ceil(total! / pageLimit);

  // used for creating dummy data,
  // const doing = await createData();

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`SEO (${total})`}
            description="Manage SEO entries (Server side table functionalities)."
          />

          <Link
            href="/dashboard/seo/new"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <SeoTable
          searchKey="url"
          pageNo={page}
          columns={columns}
          totalUsers={total!}
          data={items!}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
