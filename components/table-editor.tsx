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
  Clock,
  Flag,
  Link,
  Mail,
  Pencil,
  PersonStanding,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

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
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <div className="flex items-center">
                  <Flag className="mr-2" />
                  <Label htmlFor="event_name" className="text-left">
                    Event Name:
                  </Label>
                </div>
                <div className="flex items-center">
                  <CalendarCheck className="mr-2" />
                  <Label htmlFor="event_name" className="text-left">
                    Due Date:
                  </Label>
                  <Calendar
                    mode="single"
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </div>
                <div className="flex items-center">
                  <PersonStanding className="mr-2" />
                  <Label htmlFor="event_name" className="text-left">
                    Assigned By:
                  </Label>
                </div>
                <Input type="assigned_by" placeholder="Delegator Name" />
                <div className="flex items-center">
                  <PersonStanding className="mr-2" />
                  <Label htmlFor="event_name" className="text-left">
                    Assigned Personnel:
                  </Label>
                </div>
                <Input
                  type="assigned_personnel"
                  placeholder="Assigned Personnel"
                />
                <div className="flex items-center">
                  <Link className="mr-2" />
                  <Label htmlFor="event_name" className="text-left">
                    Complementary Links:
                  </Label>
                </div>
                <Input type="links" placeholder="Complementary Links" />
                <div className="flex items-center">
                  <Clock className="mr-2" />
                  <Label htmlFor="event_name" className="text-left">
                    Send Reminder by:
                  </Label>
                </div>
                <div className="flex items-center">
                  <Pencil className="mr-2" />
                  <Label htmlFor="event_name" className="text-left">
                    Subject:
                  </Label>
                </div>
                <Input type="subject" placeholder="Subject" />
                <div className="flex items-center">
                  <Mail className="mr-2" />
                  <Label htmlFor="event_name" className="text-left">
                    Email Composition:
                  </Label>
                </div>
                <Input type="body" placeholder="Body" />
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
