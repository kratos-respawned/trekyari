"use client";
import { AlertModal } from "@/components/dashboard/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Blog } from "@prisma/client";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { DeleteBlog } from "~/app/(dashboard)/dashboard/blogs/_action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { toast } from "~/components/ui/use-toast";

interface CellActionProps {
  data: Blog;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    startTransition(async () => {
      const { error, success } = await DeleteBlog(data.id);
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
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          if (loading) {
            toast({
              title: "Error",
              description: "Please wait for the current action to complete",
            });
            return;
          }
          setOpen(false);
        }}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/blogs/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
