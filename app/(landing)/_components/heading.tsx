"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";

export const Heading = () => {
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. <span className="underline">Ergo</span>
            </h1>
            <h4 className="text-base sm:text-xl md:text-2xl font-medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h4>
            <Button>
                Enter Ergo
                <ArrowRightCircle className="h-4 w-4 ml-2"/>
            </Button>
        </div>
    )
}