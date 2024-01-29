"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { toast } from "sonner";

interface DeleteTaskProps {
  taskId: Id<"tasks">;
}

const DeleteTaskButton: React.FC<DeleteTaskProps> = ({
  taskId,
}) => {
  const deleteTask = useMutation(api.tasks.deleteTask);

  const handleDelete = async () => {
    try {
      await deleteTask({ id: taskId });
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Im sorry, failed to delete task");
      console.error(error);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteTaskButton;
