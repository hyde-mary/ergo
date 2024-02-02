"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#363636] dark:text-[#cbcbcb]">
        Where Tasks align and Schedules shine.{" "}
        <span className="underline">Ergo</span>
      </h1>
      {isLoading && (
        <div className="w-full flex items-center justify-center mt-4">
          <Spinner size={"lg"} />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <>
          <Button asChild>
            <Link href="/documents">
              Enter Ergo
              <ArrowRightCircle className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <h6>
            Welcome back! Click the button above to go to your documents.
          </h6>
        </>
      )}
      {!isAuthenticated && !isLoading && (
        <>
          <SignInButton mode="modal">
            <Button>
              Join Ergo Free
              <ArrowRightCircle className="h-4 w-4 ml-2" />
            </Button>
          </SignInButton>
          <h6>
            Already have an account?{" "}
            <SignInButton mode="modal">
              <Button variant={"link"} className="underline p-0">
                Sign in here
              </Button>
            </SignInButton>
          </h6>
        </>
      )}
    </div>
  );
};
