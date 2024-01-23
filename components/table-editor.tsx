"use client";

import TaskCreate from "@/app/(main)/_components/task-create";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { Button } from "./ui/button";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

const TableEditor = ({onChange, initialContent, editable} : EditorProps ) => {

  const params = useParams<{ documentId?: Id<"documents"> }>();
  const taskList = useQuery(api.tasks.getTaskList, {
    parentDocument: params.documentId
  });

  const onClick = () => {
    console.log(taskList);
  }

  return (
    <div className="ml-[54px]">
      <TaskCreate />
      <div>
        <Button onClick={onClick}>
        </Button>
      </div>
    </div>
  );
};

export default TableEditor;
