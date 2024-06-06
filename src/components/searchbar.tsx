"use client";
import { useCallback, useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export function SearchMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "mt-5 mx-auto flex relative cursor-text items-center w-full justify-between rounded-[0.5rem] bg-background text-sm font-normal  shadow  max-w-sm "
        )}
        onClick={() => setOpen(true)}
      >
        <span>Find your next adventure...</span>
        <Search className="h-4" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for your next adventure..." />
        <CommandList className="max-h-96">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Expeditions">
            <CommandItem
              onClick={() => runCommand(() => router.push("/signin"))}
            >
              Everest Base Camp
            </CommandItem>
            <CommandItem
              onClick={() => runCommand(() => router.push("/signin"))}
            >
              Friendship Peak
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Treks">
            <CommandItem
              onClick={() => runCommand(() => router.push("/signin"))}
            >
              Har ki Dun
            </CommandItem>
            <CommandItem
              onClick={() => runCommand(() => router.push("/signin"))}
            >
              Kedarnath
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Adventure">
            <CommandItem
              onClick={() => runCommand(() => router.push("/signin"))}
            >
              River Rafting
            </CommandItem>
            <CommandItem
              onClick={() => runCommand(() => router.push("/signin"))}
            >
              Bungy Jump
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
