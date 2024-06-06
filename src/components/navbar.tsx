import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  return (
    <header className="sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b border-border/40 bg-background/95 px-8 lg:px-10 h-14 flex justify-between items-center">
      <Link href="/" className="flex items-center justify-center">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Trekking Adventures</span>
      </Link>
      <nav className="sm:hidden block">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="ml-auto text-base transition-all font-medium hover:underline hover:text-primary underline-offset-4"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/treking">Trekking</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/expedition">Expedition</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/adventure">Adventure</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/holiday">Holiday</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/contact">Contact</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <nav className="ml-auto hidden sm:flex gap-4 sm:gap-6">
        <Link
          href="#"
          className="text-base transition-all font-medium hover:underline hover:text-primary underline-offset-4"
        >
          Trekking
        </Link>
        <Link
          href="#"
          className="text-base transition-all font-medium hover:underline hover:text-primary underline-offset-4"
        >
          Expedition
        </Link>
        <Link
          href="#"
          className="text-base transition-all font-medium hover:underline hover:text-primary underline-offset-4"
        >
          Adventure
        </Link>
        <Link
          href="#"
          className="text-base transition-all font-medium hover:underline hover:text-primary underline-offset-4"
        >
          Holiday
        </Link>
        <Link
          href="tel:+919876543210"
          className="text-base transition-all font-medium hover:underline hover:text-primary underline-offset-4"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
};

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
