import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { AlignRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import { SiInstagram } from "@icons-pack/react-simple-icons";

export const Navbar = () => {
  return (
    // backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/95
    <header className=" sticky top-0 shadow  z-50 border-b border-border/40 bg-background px-8 lg:px-10 h-14 flex items-center justify-between">
      <Link href="/" className="flex items-center justify-center">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Trekking Adventures</span>
      </Link>
      <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:flex  hidden gap-4 sm:gap-6">
        <Link
          href="#"
          className="text-base transition-all font-medium hover:underline  hover:text-primary underline-offset-4"
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
      <div className="flex items-center justify-center gap-4">
        <MobileNav />
        <div className="flex items-center gap-3">
          {/* <Button variant={"secondary"}  size={"icon"}>
          <Phone className="w-4 h-4"/>
        </Button>
        <Button variant={"secondary"}  size={"icon"}>
          <SiInstagram className="w-4 h-4"/>
        </Button> */}
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <Button>Sign In</Button>
            </Link>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="   lg:hidden">
          <AlignRight />
          <span className="sr-only">Open Navigation Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <Link href={"/"} className="font-heading text-3xl text-left">
          Trekyaari
        </Link>
        {/* <div className="flex flex-col h-full  gap-3 justify-between"> */}
        <nav className=" my-4  flex-1   flex flex-col gap-4">
          <Link
            href="/"
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

        <Card className="self-end place-self-end">
          <CardHeader className=" ">
            <CardTitle className="">Follow us on instagram</CardTitle>
            <CardDescription>
              Get the latest updates on our treks and expeditions and exclusive
              offers.
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <Button size="sm" className="w-full">
              Follow us
            </Button>
          </CardContent>
        </Card>
        {/* <div className="px-6">
            <Button size={"sm"} className=" w-full gap-2">
              <PhoneOutgoing className="w-4 h-4 " />
              Contact Us
            </Button>
          </div> */}
        {/* </div> */}
      </SheetContent>
    </Sheet>
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
