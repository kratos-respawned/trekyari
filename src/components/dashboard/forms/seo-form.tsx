"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import {
  createSeoEntry,
  updateSeoEntry,
  deleteSeoEntry,
} from "@/app/(dashboard)/actions/seo/seo.action";
import { SeoFormValues, SeoSchema } from "~/validators/form-schema";
import { AlertModal } from "../modal/alert-modal";

interface SeoFormProps {
  initialData: SeoFormValues | null;
}

export const SeoForm: React.FC<SeoFormProps> = ({ initialData }) => {
  const { seoId } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit SEO Metadata" : "Create SEO Metadata";
  const description = initialData
    ? "Edit SEO Metadata."
    : "Add new SEO Metadata";
  const toastMessage = initialData
    ? "SEO Metadata updated."
    : "SEO Metadata created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<SeoFormValues>({
    resolver: zodResolver(SeoSchema),
    defaultValues: initialData || {
      url: "",
      title: "",
      description: "",
      h1: "",
      canonical: "",
      ogUrl: "",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      schema: "",
      metaRobots: "",
      altTag: "",
      schemaReview: "",
      keywords: "",
    },
  });
  // Update form values when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);
  const onSubmit = async (data: SeoFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        const result = await updateSeoEntry(seoId as string, data);
        if (result.error) throw new Error(result.error);
      } else {
        const result = await createSeoEntry(data);
        if (result.error) throw new Error(result.error);
      }
      router.refresh();
      router.push(`/dashboard/seo`);
      toast({
        title: toastMessage,
        description: "Your request was successful.",
      });
    } catch (error: any) {
      console.log("Error is here", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      if (initialData) {
        const result = await deleteSeoEntry(seoId as string);
        if (result.error) throw new Error(result.error);
        router.refresh();
        router.push(`/dashboard/seo`);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    console.log(seoId);
  }, [seoId]);

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="h1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>H1</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="H1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="canonical"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Canonical URL</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Canonical URL"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ogUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OG URL</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="OG URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ogTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OG Title</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="OG Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ogDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OG Description</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="OG Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ogImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OG Image URL</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="OG Image URL"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="metaRobots"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Robots</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Meta Robots"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="altTag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alt Tag</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Alt Tag" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keywords</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Keywords" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="schema"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Schema</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Schema" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="schemaReview"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Schema Review</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Schema Review"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
