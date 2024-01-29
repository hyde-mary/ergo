"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, PencilIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";

interface UpdateTaskProps {
  taskId: Id<"tasks">;
  title?: string;
  assigned?: string;
  dueDate: string;
  link?: string;
}

const FormSchema = z.object({
  title: z.string().min(2).max(50),
  dueDate: z.date(),
  assigned: z.string().min(2).max(50),
  link: z.string(),
});

const UpdateTaskButton: React.FC<UpdateTaskProps> = ({
  taskId,
  title,
  assigned,
  dueDate,
  link,
}) => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const updateTask = useMutation(api.tasks.update);
  const dateObject = new Date(dueDate);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: title,
      dueDate: dateObject,
      assigned: assigned,
      link: link,
    },
  });

  const handleButtonClick = () => {
    setIsUpdateDialogOpen(true);
  };

  function onSubmit(data: z.infer<typeof FormSchema>){
    const { title, dueDate, assigned, link } = data;

    const promise = updateTask({
      id: taskId,
      title: title,
      dueDate: dueDate.toJSON(),
      assigned: assigned,
      link: link,
    }).then(()=> setIsUpdateDialogOpen(false));

    toast.promise(promise, {
      loading: "Updating Values",
      success: "Values Updated!",
      error: "Failed to Update Value!",
    })
    
  }

  return (
    <>
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Edit the form below to Edit your task
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center space-x-2 justify-end">
            <div className="grid flex-1 gap-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="max-w-md w-fullflex flex-col gap-4"
                >
                  <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className="text-left">Title</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="ml-4"
                              placeholder={title}
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  </div>

                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="assigned"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel className="text-left">
                              Assigned:
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="ml-4"
                                placeholder={assigned}
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>

                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="dueDate"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel className="text-left">
                              <span>Due Date</span>
                            </FormLabel>

                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-[240px] pl-3 text-left font-normal ml-4",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormItem>
                        );
                      }}
                    />
                  </div>

                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="link"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel className="text-left">
                              <span>Complementary Links</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="ml-4"
                                placeholder={link}
                                type="url"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>

                  <DialogFooter className="sm:justify-end mt-6">
                    <DialogClose asChild>
                      <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" variant="default">
                      Update
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <button onClick={handleButtonClick} className="w-full h-full">
        <PencilIcon className="h-4 w-4" />
      </button>
    </>
  );
};

export default UpdateTaskButton;
