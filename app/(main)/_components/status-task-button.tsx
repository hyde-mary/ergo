"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { CheckCircle , Circle } from "lucide-react";
import { toast } from "sonner";

interface StatusTaskProps {
  taskId: Id<"tasks">;
  done: boolean;
}

const StatusTaskButton: React.FC<StatusTaskProps> = ({ taskId, done }) => {
  const setDoneStatus = useMutation(api.tasks.setDoneStatus);

  console.log(done);

  const handleDoneTask = async () => {
    try {
      await setDoneStatus({ id: taskId , isDone: true});
      //toast.success("Task marked as done successfully!");
    } catch (error) {
      toast.error("Im sorry, failed to mark task as done");
      console.error(error);
    }
  };

  const handleUndoneTask = async () => {
    try {
      await setDoneStatus({ id: taskId , isDone: false});
      //toast.success("Task marked as undone!")
    }catch (error) {
      toast.error("Im sorry, failed to undone task!");
      console.error(error);
    }
  };

  return done ? (
    <button onClick={handleUndoneTask} className="w-full h-full">
      <CheckCircle className="h-4 w-4" />
    </button>
  ) : (
    <button onClick={handleDoneTask} className="w-full h-full">
      <Circle className="h-4 w-4" />
    </button>
  );
};

export default StatusTaskButton;
