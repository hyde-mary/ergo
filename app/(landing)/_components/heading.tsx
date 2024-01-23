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
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Where Tasks align and Schedules shine.{" "}
        <span className="underline">Ergo</span>
      </h1>
      <h4 className="text-base sm:text-xl md:text-2xl font-medium">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </h4>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="icon" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Ergo
            <ArrowRightCircle className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Join Ergo Free
            <ArrowRightCircle className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};
