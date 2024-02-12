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
import { add, format } from "date-fns";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";
import { useState } from "react";

import { useUser } from "@clerk/clerk-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FormSchema = z.object({
  title: z.string().min(2).max(50),
  dueDate: z.date(),
  assigned: z.string().min(2).email("This is not a valid email"),
  link: z.string(),
  reminder: z.string(),
  subject: z.string(),
  emailBody: z.string(),
  assignedBy: z.string(),
});

const TaskCreate = () => {
  const createTask = useMutation(api.tasks.create);
  const params = useParams<{ documentId?: Id<"documents"> }>();
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState("On Time");
  const { user } = useUser();

  const assignedBy = user?.firstName as string;

  const handleButtonClick = () => {
    setIsUpdateDialogOpen(true);
  };

  const handleReminderClick = (reminder: string) => {
    setSelectedReminder(reminder);
    form.setValue("reminder", reminder);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      dueDate: new Date(),
      assigned: "",
      link: "",
      reminder: "On Time",
      subject: "This is an Automatically Generated Subject",
      emailBody: "This is an Automatically Generated Email Body",
      assignedBy: assignedBy,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { title, dueDate, assigned, link, reminder, subject, emailBody } =
      data;

    let reminderDate;
      switch (reminder) {
        case "On Time":
          reminderDate = dueDate; // no reminder, same as due date
          break;
        case "5 minutes early":
          reminderDate = add(dueDate, { minutes: -5 });
          break;
        case "30 minutes early":
          reminderDate = add(dueDate, { minutes: -30 });
          break;
        case "1 hour early":
          reminderDate = add(dueDate, { hours: -1 });
          break;
        case "1 day early":
          reminderDate = add(dueDate, { days: -1 });
          break;
        default:
          reminderDate = dueDate;
      }

      const reminderUnixTime = reminderDate.getTime() / 1000;

    const promise = createTask({
      parentDocument: params.documentId,
      title: title,
      dueDate: dueDate.toJSON(),
      assigned: assigned,
      link: link,
      reminder: reminder,
      subject: subject,
      emailBody: emailBody,
      assignedBy: assignedBy,
    }).then(() => setIsUpdateDialogOpen(false));

    const fullData = {
      ...data,
      assignedBy: assignedBy,
      reminderUnixTime: reminderUnixTime,
    };

    console.log(fullData);

    toast.promise(promise, {
      loading: "Creating Tasks",
      success: "Task Created!",
      error: "Failed to Create Task!",
    });

    fetch("/api/sendEmail/route.ts", {
      method: "POST",
      body: JSON.stringify(fullData),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Email Sent!");
          form.reset();
        } else {
          toast.error("Failed to send email.");
        }
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        toast.error("An error occurred while sending email.");
      });
  }

  return (
    <div className="mt-4 mb-4">
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <Button onClick={handleButtonClick} variant="default" size="sm">
          Create Tasks
        </Button>

        <DialogContent className="sm:max-w-md md:min-w-[1000px] p-4">
          <DialogHeader>
            <DialogTitle>Create Tasks</DialogTitle>
            <DialogDescription>
              Edit the form below to create your task
            </DialogDescription>
          </DialogHeader>

          <div className="">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col md:flex-row justify-around">
                  <div className="md:w-2/5 flex flex-col md:mr-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => {
                        return (
                          <FormItem className="">
                            <FormLabel className="text-left">Title</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="ml-4 sm:mr-4"
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
                      name="dueDate"
                      render={({ field }) => {
                        return (
                          <FormItem className="mt-4">
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
                          <FormItem className="mt-4">
                            <FormLabel className="text-left">
                              <span>Reminder</span>
                            </FormLabel>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className="w-[240px] pl-3 text-left font-normal ml-4"
                                    >
                                      {selectedReminder
                                        ? selectedReminder
                                        : "On Time"}
                                    </Button>
                                </FormControl>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-56">
                              <DropdownMenuItem onClick={() => handleReminderClick("On Time")}>
                                On Time
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleReminderClick("5 minutes early")}>
                                5 minutes early
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleReminderClick("30 minutes early")}>
                                30 minutes early
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleReminderClick("1 hour early")}>
                                1 hour early
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleReminderClick("1 day early")}>
                                1 day early
                              </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="link"
                      render={({ field }) => {
                        return (
                          <FormItem className="mt-4">
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
                  </div>

                  <div className="md:w-2/5 flex flex-col">
                    <FormField
                      control={form.control}
                      name="assigned"
                      render={({ field }) => {
                        return (
                          <FormItem className="">
                            <FormLabel className="text-left">
                              Assigned:
                            </FormLabel>
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
                      name="subject"
                      render={({ field }) => {
                        return (
                          <FormItem className="mt-4">
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
                          <FormItem className="mt-4">
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
                  </div>
                </div>
                <div>
                  <DialogFooter className="sm:justify-end mt-8">
                    <DialogClose
                      asChild
                      onClick={() => {
                        form.reset();
                      }}
                    >
                      <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button variant="outline">Save as Draft</Button>
                    <Button type="submit" variant="default">
                      Finalize
                    </Button>
                  </DialogFooter>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskCreate;
