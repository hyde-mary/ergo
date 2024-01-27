"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";

const FormSchema = z.object({
  title: z.string().min(2).max(50),
  dueDate: z.date(),
  assigned: z.string().min(2).max(50),
  link: z.string(),
  reminder: z.date(),
  subject: z.string(),
  emailBody: z.string(),
});

const TaskCreate = () => {
  const createTask = useMutation(api.tasks.create);
  const params = useParams<{ documentId?: Id<"documents"> }>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      dueDate: new Date(),
      assigned: "",
      link: "",
      reminder: new Date(),
      subject: "This is an Automatically Generated Subject",
      emailBody: "This is a Automatically Generated Email Body",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { title, dueDate, assigned, link, reminder, subject, emailBody } =
      data;

    const promise = createTask({
      parentDocument: params.documentId,
      title: title,
      dueDate: dueDate.toJSON(),
      assigned: assigned,
      link: link,
      reminder: reminder.toJSON(),
      subject: subject,
      emailBody: emailBody,
    });

    form.reset();

    toast.promise(promise, {
      loading: "Creating Tasks",
      success: "Task Created!",
      error: "Failed to Create Task!",
    });
  }

  return (
    <div className="mt-4 mb-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" size="sm">
            Create Tasks
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Tasks</DialogTitle>
            <DialogDescription>
              Edit the form below to create your task
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center space-x-2 justify-end">
            <div className="grid flex-1 gap-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="max-w-md w-fullflex flex-col gap-4"
                >
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
                              placeholder="Task Title"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="assigned"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className="text-left">Assigned:</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="ml-4"
                              placeholder="Assigned Personnel"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

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
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="reminder"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className="text-left">
                            <span>Reminder</span>
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
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

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
                              placeholder="Complementary Links"
                              type="url"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className="text-left">
                            <span>Email Subject</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="ml-4"
                              placeholder="Subject"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="emailBody"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className="text-left">
                            <span>Email Composition</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              className="ml-4 resize-none"
                              placeholder="Enter email body here"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <DialogFooter className="sm:justify-end mt-2">
                    <DialogClose asChild>
                      <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button variant="outline">Save as Draft</Button>
                    <Button type="submit" variant="default">
                      Finalize
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskCreate;
