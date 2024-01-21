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
import { FormControl } from "./ui/form";
import * as z from "zod";
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
  due: z.date().min(new Date("2023-01-01")),
  assigned: z.string().min(2).max(50),
  delegator: z.string().min(2).max(50),
  reminder: z.date().min(new Date("2023-01-01")),
  subject: z.string().min(2).max(50),
  e_body: z.string(),
});

const TableEditor = () => {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

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
                <div className="flex items-center">
                  <PersonStanding className="mr-2" />
                  <Label htmlFor="task" className="text-left">
                    Title:
                  </Label>

                  <Input className="ml-4" type="task-title" placeholder="Task Title" />
                </div>

                <div className="flex items-center justify-start">
                  <CalendarCheck className="mr-2" />
                  <Label htmlFor="event_name" className="text-left">
                    Due:
                  </Label>

                  <div className="ml-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-[320px] pl-3 text-left font-normal"
                        >
                          Pick a date
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          onSelect={() => {}}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="flex items-center">
                  <PersonStanding className="mr-2" />
                  <Label htmlFor="event_name" className="text-left">
                    Assigned:
                  </Label>

                  <Input className="ml-4" type="assigned_by" placeholder="Delegator Name" />
                </div>

                <div className="flex items-center">
                  <Link className="mr-2" />
                  <Label htmlFor="event_name" className="text-left">
                    Links:
                  </Label>
                  <Input className="ml-4 w-full" type="links" placeholder="Complementary Links" />
                </div>

                <div className="flex items-center">
                  <Clock className="mr-2" />
                  <Label htmlFor="event_name" className="text-left">
                    Reminder:
                  </Label>

                  <div className="ml-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-[280px] pl-3 text-left font-normal"
                        >
                          Pick a date
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          onSelect={() => {}}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="flex items-center">
                  <Pencil className="mr-2" />
                  <Label htmlFor="event_name" className="text-left">
                    Subject:
                  </Label>

                  <Input className="ml-4" type="subject" placeholder="Subject" />
                </div>

                <div className="flex items-center">
                  <Mail className="mr-2" />
                  <Label htmlFor="event_name" className="text-left">
                    Email Composition:
                  </Label>
                </div>

                <Textarea className="resize-none" placeholder="Enter email body here" />
              </div>
            </div>

            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="button" variant="default">
                Finalize
              </Button>
            </DialogFooter>
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
