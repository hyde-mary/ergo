"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { DataTable } from "@/app/(main)/_components/data-table";
import { columns } from "@/app/(main)/_components/columns";

const TableEditor = () => {
  const params = useParams<{ documentId?: Id<"documents"> }>();
  const taskList = useQuery(api.tasks.getTaskList, {
    parentDocument: params.documentId
  });

  if (taskList === undefined){
    return(
      <div>
        <Skeleton className="h-6 w-36 mb-10" />
        <Skeleton className="h-[50px] w-full mb-4" />
        <Skeleton className="h-[50px] w-full mb-4" />
        <Skeleton className="h-[50px] w-full mb-4" />
        <Skeleton className="h-[50px] w-full mb-4" />
        <Skeleton className="h-[50px] w-full mb-4" />
      </div>
    )
  }

  return (
    <div>
      <DataTable columns={columns} data={taskList}/>
    </div>
  );
};

export default TableEditor;
