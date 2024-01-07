"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const scrolled = useScrollTop();
    
    return(
        <div className={cn(
            "z-50 bg-background fixed top-0 flex items-center w-full p-6 dark:bg-[#1F1F1F]",
            scrolled && "border-b shadow-md"
        )}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {isLoading && (
                    <p className="mx-4"><Spinner /></p>
                )}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="sm" className="border-b dark:border dark:shadow-md mx-1">
                                Login
                            </Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button size="sm" className="border-b dark:border dark:shadow-md mx-1">
                                Get Ergo
                            </Button>
                        </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                    <Button className="border-b dark:border dark:shadow-md" variant="ghost" size="sm" asChild>
                        <Link href="/documents">
                            Go to Documents
                        </Link>
                    </Button>
                    <div className="mx-2">
                    <UserButton 
                        afterSignOutUrl="/"
                    />
                    </div>
                    </>
                )}
                <ModeToggle/>
            </div>
        </div>
    )
}