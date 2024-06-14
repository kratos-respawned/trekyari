import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Navbar } from "~/components/navbar";
import { SearchMenu } from "~/components/searchbar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Ambulance, Backpack, Compass } from "lucide-react";

export default async function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 ">
          <div className="container px-8 md:px-10 ">
            <div className=" text-center">
              <h1 className="text-3xl font-heading font-bold  sm:text-5xl md:text-6xl">
                Explore the Wonders of Nature
              </h1>
              <p className="max-w-[700px]  mx-auto text-gray-500 md:text-xl dark:text-gray-400 mt-4">
                Discover the most breathtaking trekking destinations and plan
                your next adventure with our expert tips and advice.
              </p>
            </div>
            <SearchMenu />
            <Image
              priority
              src={"/home/test2.jpg"}
              width={1920}
              height={1080}
              alt="Trekking Adventures"
              className=" w-full h-full grayscale-[0.4] mt-8 shadow-primary/25 shadow-2xl rounded-xl md:rounded-3xl"
            />
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-8 md:px-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-heading font-bold  sm:text-4xl md:text-5xl">
                  Popular Trekking Destinations
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Explore the most breathtaking landscapes and challenge
                  yourself on unforgettable treks.
                </p>
              </div>
            </div>
            <div className="px-8 md:px-10 mt-8">
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full  "
              >
                <CarouselContent>
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <CarouselItem
                        key={index}
                        className="md:basis-1/2 lg:basis-1/3"
                      >
                        <Card>
                          <CardContent className="flex flex-col items-center justify-center p-6">
                            <Image
                              src="/home/mt.webp"
                              width="400"
                              height="300"
                              alt="Destination"
                              className="aspect-[4/3] select-none overflow-hidden rounded-lg object-cover"
                            />
                            <h3 className="text-xl font-bold cursor-pointer select-none mt-4">
                              Everest Base Camp
                            </h3>
                            <p className="text-gray-500 select-none dark:text-gray-400 mt-2">
                              Challenge yourself on this iconic trek to the base
                              of the world&apos;s highest mountain.
                            </p>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="h-10 w-10" />
                <CarouselNext className="h-10 w-10" />
              </Carousel>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Trekking Tips and Advice
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Get the most out of your trekking adventures with our expert
                  tips and advice.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <Card>
                <CardContent className="p-6">
                  <Backpack className="w-10 h-10 text-primary" />
                  <h3 className="text-xl font-bold mt-4">Packing Essentials</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Learn what to pack for your trekking adventures to ensure
                    you&apos;re prepared for any conditions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Ambulance className="w-10 h-10 text-primary" />
                  <h3 className="text-xl font-bold mt-4">
                    Safety and First Aid
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Stay safe on the trail with our tips on first aid, emergency
                    preparedness, and more.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Compass className="w-10 h-10 text-primary" />
                  <h3 className="text-xl font-bold mt-4">
                    Navigation and Gear
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Discover the best navigation tools and gear to make your
                    trekking experience more enjoyable.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-100 p-6 md:py-12 w-full dark:bg-gray-800">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <Link href="#" prefetch={false}>
              About Us
            </Link>
            <Link href="#" prefetch={false}>
              Our Team
            </Link>
            <Link href="#" prefetch={false}>
              Careers
            </Link>
            <Link href="#" prefetch={false}>
              News
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Destinations</h3>
            <Link href="#" prefetch={false}>
              Everest Base Camp
            </Link>
            <Link href="#" prefetch={false}>
              Patagonia
            </Link>
            <Link href="#" prefetch={false}>
              Machu Picchu
            </Link>
            <Link href="#" prefetch={false}>
              Kilimanjaro
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <Link href="#" prefetch={false}>
              Trekking Tips
            </Link>
            <Link href="#" prefetch={false}>
              Gear Guides
            </Link>
            <Link href="#" prefetch={false}>
              Travel Inspiration
            </Link>
            <Link href="#" prefetch={false}>
              FAQs
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <Link href="#" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" prefetch={false}>
              Cookie Policy
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Contact</h3>
            <Link href="#" prefetch={false}>
              Support
            </Link>
            <Link href="#" prefetch={false}>
              Partnerships
            </Link>
            <Link href="#" prefetch={false}>
              Media Inquiries
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
