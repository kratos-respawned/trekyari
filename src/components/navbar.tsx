import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { AlignRight, Mountain, Phone, PhoneOutgoing } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { SignInModal } from "@/components/sign-in-modal";

// import { SiInstagram } from "@icons-pack/react-simple-icons";

export const Navbar = async () => {
  // const session = await auth();
  return (
    <header className=" sticky top-0 shadow  z-50 border-b border-border/40 bg-background px-8 lg:px-10 h-14 flex items-center justify-between">
      <Link href="/" className="flex items-center justify-center">
        <Mountain className="h-6 w-6" />
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
      <MobileNav />
      <div className="hidden lg:flex items-center gap-3">
        {/* {session?.user ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button>Sign Out</Button>
          </form>
        ) : ( */}
        <></>
        <SignInModal />
        {/* )} */}
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
