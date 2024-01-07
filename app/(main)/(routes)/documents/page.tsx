"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusSquareIcon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api"
import { toast } from "sonner";

const DocumentsPage = () => {
  const { user } = useUser();

  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" })
  
    toast.promise(promise, {
      loading: "Creating a new task...",
      success: "New task created!",
      error: "Failed to create a new note :("
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        height="300"
        width="300"
        alt="empty"
        className="opacity-75 dark:opacity-100"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Tasks
      </h2>
      <Button onClick={onCreate}>Create a task<PlusSquareIcon className="h-4 w-4 ml-2"/></Button>
    </div>
  );
};

export default DocumentsPage;
