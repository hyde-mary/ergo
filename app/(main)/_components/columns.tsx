"use client";

import { Id } from "@/convex/_generated/dataModel";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";
import DeleteTaskButton from "./delete-task-button";
import UpdateTaskButton from "./update-task-button";

export type Tasks = {
  _id: string;
  _creationTime: number;
  parentDocument?: string;
  dueDate?: string;
  assigned?: string;
  emailBody?: string;
  link?: string;
  reminder?: string;
  subject?: string;
  title?: string;
  userId: string;
};

export const columns: ColumnDef<Tasks>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "assigned",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Assignd Personnel
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("dueDate"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "link",
    header: "Complementary Links",
    cell: ({ row }) => {
      const link = row.getValue("link") as string | undefined;

      if (link) {
        return (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline block overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[180px]"
          >
            {link}
          </a>
        );
      }

      return "";
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const task = row.original;

      return (
        <div className="flex items-start gap-4">
        <div className="flex">
        <UpdateTaskButton 
                taskId={task._id as Id<"tasks">}
                title={task.title}
                assigned={task.assigned}
                dueDate={task.dueDate as string}
                link={task.link}
        />
        </div>
        <div className="flex">
        <DeleteTaskButton taskId={task._id as Id<"tasks">}/>
        </div>
        </div>
      );
    },
    enableHiding: false,
  },
];
