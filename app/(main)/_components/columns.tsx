"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
  task_id: string
  title: string
  assigned: string
  status: "pending" | "processing" | "success" | "failed"
  due: number
  link: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "title",
    header: "Task Title",
  },
  {
    accessorKey: "assigned",
    header: "Assigned Personnel",
  },
  {
    accessorKey: "due",
    header: "Due Date",
  },
  {
    accessorKey: "link",
    header: "Complementary Link"
  }
]
