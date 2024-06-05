import Image from "next/image";
import Link from "next/link";
import { SiGoogle, SiFacebook, SiApple } from "@icons-pack/react-simple-icons";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function Signup() {
  return (
    <div className="w-full h-screen  lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen">
      <div className="hidden bg-muted lg:block">
        {/* <Image
          src="/next.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
      </div>
      <div className="flex  max-lg:h-full  items-center   justify-center py-12">
        <div className="mx-auto  grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl  font-bold">Create Account</h1>
            <p className="text-balance  text-muted-foreground">
              Welcome back! Please sign in to continue
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <div className="flex gap-5">
              <Button variant="outline" className="w-full">
                <SiGoogle className="h-5" />
              </Button>
              <Button variant="outline" className="w-full">
                <SiFacebook className="h-5" />
              </Button>
              <Button variant="outline" className="w-full">
                <SiApple className="h-5" />
              </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}