"use client";
import { Blog, faqs } from "@prisma/client";
import { EditorInstance, JSONContent } from "novel";
import { useRef, useState, useTransition } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Editor from "~/components/editor/TailwindEditor";
import { columns } from "../tables/blog-tables/blog-faq-table/columns";
import { DataTable } from "~/components/ui/data-table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaqSchema } from "~/validators/faq";
import { useToast } from "~/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Loader } from "lucide-react";
import { CreateFaq } from "~/app/(dashboard)/dashboard/blogs/[blogId]/_actions";
// import { Textarea } from "@/components/ui/textarea"
interface BlogFormProps {
  blog: Blog | null;
  faqs: faqs[] | null;
}
export const BlogForm = ({ blog, faqs }: BlogFormProps) => {
  const editorRef = useRef<EditorInstance>(null);
  const [clientFaqs, setClientFaqs] = useState<faqs[]>(faqs || []);
  const [saveStatus, setSaveStatus] = useState<"Saved" | "Unsaved">("Unsaved");
  const { toast } = useToast();
  return (
    <section className=" relative pt-8 space-y-3">
      <div className="flex items-center absolute right-5 top-0 z-10 mb-5 gap-2">
        <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
          {saveStatus}
        </div>
        <Button>Save</Button>
      </div>
      <p className="text-lg font-semibold">Title</p>
      <TextareaAutosize
        placeholder="Title"
        className="w-full resize-none border rounded-lg py-3 appearance-none overflow-hidden bg-transparent text-4xl pl-4 font-bold focus:outline-none"
      />

      <p className="text-lg font-semibold">Content</p>

      <Editor
        className="border-2 dark:border"
        ref={editorRef}
        blog={blog?.content as JSONContent | null}
      />
      <div className="flex justify-between  pt-7">
        <p className="text-lg font-semibold">FAQs</p>
        {blog ? (
          <AddFaq blogId={blog?.id} />
        ) : (
          <Button
            onClick={() =>
              toast({
                title: "Error",
                description: "Please save the blog first",
                variant: "destructive",
              })
            }
            variant={"outline"}
          >
            Add FAQ
          </Button>
        )}
      </div>
      <section className="space-y-4">
        <DataTable searchKey="question" columns={columns} data={clientFaqs} />
      </section>
    </section>
  );
};

export default function AddFaq({ blogId }: { blogId: string }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<FaqSchema>({
    resolver: zodResolver(FaqSchema),
    defaultValues: {
      answer: "",
      question: "",
      blogId: blogId,
    },
  });
  const [open, setOpen] = useState(false);
  async function addFaq(formdata: FaqSchema) {
    startTransition(async () => {
        //    await new Promise((resolve) => setTimeout(resolve, 4000));
      const { success, error } = await CreateFaq(formdata);
      if (error) {
        toast({
          title: "Error signing up",
          description: error,
        });
        return;
      }
      toast({
        title: "Success",
        description: success,
      });
    });
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (isPending) {
          toast({
            title: "Error",
            description: "Please wait for the current request to complete",
            variant: "destructive",
          });
          return;
        }
        setOpen(state);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Add FAQ</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add FAQ</DialogTitle>
          <DialogDescription>
            <div className="bg-destructive/30 border-l-4 border-destructive p-4">
              <p className="font-bold">Warning:</p>
              Changes will be only saved when you click the save button.
            </div>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(addFaq)}>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="How long is the duration of this trek?"
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="The duration of this trek is 5 days."
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <input
                type="hidden"
                value={blogId}
                {...form.register("blogId")}
              />
              <DialogFooter>
                <Button disabled={isPending} type="submit">
                  {isPending ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" /> Saving
                    </>
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
