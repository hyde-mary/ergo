"use client";

import React, { useState } from "react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { Check, Copy, Globe, Mail, Plus } from "lucide-react";

import { Doc } from "@/convex/_generated/dataModel";
import {
  PopoverTrigger,
  Popover,
  PopoverContent
} from "@/components/ui/popover"
import { useOrigin } from "@/hooks/use-origin";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";

interface SendEmailProps {
    initialData: Doc<"documents">
};

interface Member {
    email: string;
}

export const SendEmail = ({ initialData }: SendEmailProps ) => {

    const [email, setEmail] = useState('');
    const [members, setMembers] = useState<Member[]>([]);

    const onAddMember = () => {
        if (email.trim() !== '') {
          setMembers([...members, { email: email }]);
          setEmail(''); // Clear the email input after adding to members
        }
      };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="sm" variant="ghost">
                    Email
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-72"
                align="end"
                alignOffset={8}
                forceMount
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-x-2">
                        <Mail className="h-4 w-4"/>
                        <p className="text-xs font-medium">
                            Send this email to your members
                        </p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-xs font-medium">
                            Members:
                        </p>
                    </div>
                    {members.length > 0 && (
                        <div className="flex items-start">
                        <ul className="ml-2">
                            {members.map((member, index) => (
                                <li key={index} className="text-xs py-1">
                                    {member.email}
                                </li>
                            ))}
                        </ul>
                        </div>
                    )}
                    <div className="flex items-center">
                        <input
                            value={email}
                            onChange = {e => setEmail(e.target.value)}
                            onKeyDown = {(e) => {
                                if (e.key === "Enter") onAddMember();
                            }
                            }
                            className="flex-1 px-2 text-xs border rounded-1-md h-8 bg-muted"
                        />
                        <Button
                        size="sm"
                        variant="ghost"
                        onClick={onAddMember}
                        >
                            <Plus className="h-4 w-4"/>
                        </Button>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Button
                            className="w-full text-xs"
                            size="sm"
                        >
                            Email Document
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}