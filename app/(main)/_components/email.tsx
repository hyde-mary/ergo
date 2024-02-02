"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { Check, Copy, Globe, Mail, Plus } from "lucide-react";

import { Doc, Id } from "@/convex/_generated/dataModel";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUser } from "@clerk/clerk-react";
import { useOrigin } from "@/hooks/use-origin";

const FormSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Email must be valid.",
    })
    .email(),
});

interface SendEmailProps {
  documentId: Id<"documents">;
};

export const SendEmail = ({ documentId } : SendEmailProps) => {
  const params = useParams();
  const path = usePathname();
  const { user } = useUser();
  const origin = useOrigin();

  const assignedBy = user?.firstName as string;
  const url = `${origin}/preview/${documentId}`;

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    
    const fullData = {
      assignedBy,
      url,
      ...data
    };

    fetch("/api/emailPublish/route.ts", {
      method: "POST",
      body: JSON.stringify(fullData),
    })
    .then(response => {
        if (response.ok) {
          toast.success("Email Sent!");
        } else {
          toast.error("Failed to send email.");
        }
      })
      .catch(error => {
        console.error("Error sending email:", error);
        toast.error("An error occurred while sending email.");
      });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          Email
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        <div className="space-y-4">
          <div className="flex items-center gap-x-2">
            <Mail className="h-4 w-4" />
            <p className="text-xs font-medium">
              Email this document to someone
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                disabled={document?.isPublished === false}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient:</FormLabel>
                    <FormControl>
                      <Input placeholder="Recipient's Email" {...field} />
                    </FormControl>
                    <FormDescription>
                      This will email it to the recipient.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col items-center justify-center">
                {document?.isPublished ? (
                  <Button
                    className="w-full text-xs mt-2"
                    size="sm"
                    type="submit"
                  >
                    Email Document
                  </Button>
                ) : (
                  <>
                    <p className="text-xs mb-2">
                      You must first publish the document so the recipient would
                      be able to view it!
                    </p>
                    <Button className="w-full text-xs" size="sm" disabled>
                      Email Document
                    </Button>
                  </>
                )}
              </div>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
};
