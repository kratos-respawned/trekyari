"use client";
import BreadCrumb from "@/components/dashboard/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";
import { SeoForm } from "~/components/dashboard/forms/seo-form";
import { useParams } from "next/navigation";
import { fetchSeoEntryById } from "@/app/(dashboard)/actions/seo/seo.action";
import { SeoFormValues } from "~/validators/form-schema";

export default function Page() {
  const { seoId } = useParams();
  const [initialData, setInitialData] = useState<SeoFormValues | null>(null);

  useEffect(() => {
    if (seoId && seoId !== "new") {
      const fetchInitialData = async () => {
        const result = await fetchSeoEntryById(seoId as string);
        if (result.success) {
          setInitialData(result.data as SeoFormValues);
        }
      };
      fetchInitialData();
    }
  }, [seoId]);

  const breadcrumbItems = [
    { title: "SEO", link: "/dashboard/seo" },
    {
      title: seoId === "new" ? "Create" : "Edit",
      link: `/dashboard/seo/${seoId}`,
    },
  ];

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
        <SeoForm initialData={seoId === "new" ? null : initialData} />
      </div>
    </ScrollArea>
  );
}
