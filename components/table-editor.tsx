"use client";

import { useEffect, useState } from "react";
import { Payment, columns } from "@/app/(main)/_components/columns";
import { DataTable } from "@/app/(main)/_components/data-table";
import { Button } from "./ui/button";
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
import { Label } from "@/components/ui/label";
import {
  CalendarCheck,
  CalendarIcon,
  Clock,
  Link,
  Mail,
  Pencil,
  PersonStanding,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "./ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  // For demonstration purposes, I'm using a simple delay.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      task_id: "728ed52f",
      title: "First Task",
      assigned: "Andrei",
      status: "pending",
      due: 200,
      link: "Facebook.com",
    },
  ];
}

const formSchema = z.object({
  title: z.string().min(2).max(50),
  dueDate: z.date().min(new Date("2023-01-01")),
  assigned: z.string().min(2).max(50),
  link: z.string(),
  reminder: z.date().min(new Date("2023-01-01")),
  subject: z.string().min(2).max(50),
  emailBody: z.string(),
});

const TableEditor = () => {
  const [data, setData] = useState<Payment[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "This is an automatic email",
      emailBody: "This is an automatic email",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  const handleSubmit = () => {};

  return (
    <div className="ml-[54px]">
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
                    onSubmit={form.handleSubmit(handleSubmit)}
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
                      name="dueDate"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel className="text-left">
                              <span>Due Date</span>
                            </FormLabel>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className="w-[200px] ml-4 pl-3 text-left font-normal"
                                  >
                                    Pick a date
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    {...field}
                                    mode="single"
                                    onSelect={() => {}}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormControl>
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
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className="w-[200px] ml-4 pl-3 text-left font-normal"
                                  >
                                    Pick a date
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    {...field}
                                    mode="single"
                                    onSelect={() => {}}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormControl>
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
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default TableEditor;
