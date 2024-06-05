import Link from "next/link";

export const Navbar = () => {
  return (
        <header className=" sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b border-border/40 bg-background/95 px-8 lg:px-10 h-14 flex items-center">
      <Link href="/" className="flex items-center justify-center">
        <MountainIcon className="h-6 w-6 " />
        <span className="sr-only">Trekking Adventures</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
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
  