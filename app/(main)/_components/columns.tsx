"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Tasks = {
  title: string
}

export const columns: ColumnDef<Tasks>[] = [
  {
    accessorKey: "title",
    header: "Task Title",
  }
]
