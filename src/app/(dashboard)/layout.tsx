import { ArchiveX, File, Inbox, LucideIcon, Send } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid grid-cols-[180px_1px_1fr] min-h-screen">
      <aside className="group flex flex-col gap-4 ">
        <p className="border-b font-bold font-heading tracking-wide  text-2xl py-3 px-3">
          Dashboard
        </p>
        <nav className="grid gap-2 px-3 ">
          <Nav href="/dashboard" Icon={Inbox} title="Inbox" variant="default" />
          <Nav href="/dashboard" Icon={File} title="Draft" variant="ghost" />
          <Nav href="/dashboard" Icon={Send} title="Sent" variant="ghost" />
          <Nav href="/dashboard" Icon={ArchiveX} title="Junk" variant="ghost" />
        </nav>
      </aside>
      <Separator orientation="vertical" />
      <div>{children}</div>
    </main>
  );
}
interface Links {
  title: string;
  Icon: LucideIcon;
  href: string;
  variant: "default" | "ghost";
}
const Nav = ({ Icon, title, variant, href }: Links) => {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: variant, size: "sm" }),
        variant === "default" &&
          "dark:bg-muted dark:text-white  dark:hover:bg-muted dark:hover:text-white",
        "justify-start"
      )}
    >
      <Icon className="mr-2 h-4 w-4" />
      {title}
    </Link>
  );
};
