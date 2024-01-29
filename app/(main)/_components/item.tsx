"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useMutation } from "convex/react";
import { CalendarPlus, ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, PlusCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";

interface ItemProps{
    id?: Id<"documents">;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
    label: string;
    onClick?: () => void;
    icon: LucideIcon;
};

export const Item = ({ 
    id,
    label, 
    onClick, 
    icon: Icon, 
    active,
    documentIcon,
    isSearch,
    level = 0,
    onExpand,
    expanded,
}: ItemProps) => {

    const { user } = useUser();
    const create = useMutation(api.documents.create);
    const archive = useMutation(api.documents.archive);

    const createTable = useMutation(api.documents.createTable);
    const router = useRouter();

    const onArchive = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        if (!id) return;
        const promise = archive({ id })
        .then(()=>router.push("/documents"))

        toast.promise(promise, {
            loading: "Deleting...",
            success: "Moved to trash!",
            error: "Failed to archive :("
        })
    }

    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onExpand?.();
    }

    const ChevronIcon = expanded ? ChevronDown : ChevronRight

    const onCreate = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        if (!id) return;
        const promise = create({title: "Untitled", parentDocument: id})
        .then((documentId)=>{
            if (!expanded){
                onExpand?.();
            }
            router.push(`/documents/${documentId}`);
        });

        toast.promise(promise, {
            loading: "Creating a new task...",
            success: "New note task!",
            error: "Failed to create new task :("
        });
    };

    const onCreateTable = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        if (!id) return;

        const promise = createTable({
            title: "Untitled", 
            parentDocument: id,
            isTable: true,
        }).then((documentId) => {
            if (!expanded){
                onExpand?.();
            }
            router.push(`/documents/${documentId}`);
        })

        toast.promise(promise, {
            loading: "Creating a New Task Table...",
            success: "New Task Table Created!",
            error: "Failed to create new task table :("
        });
    };

    return(
        <div
            onClick={onClick}
            role="button"
            style={{ 
                paddingLeft: level ? `${level * 12 + 12}px` : "12px"
            }}
            className={cn(
                "group in-h-[27] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
                active && "bg-primary/5 text-primary"
                )}
            >
                {!!id && (
                    <div
                    role="button"
                    className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
                    onClick={handleExpand}
                    >
                        <ChevronIcon
                        className="h-4 w-4 shrink-0 text-muted-foreground/50"
                        />
                    </div>
                )}

                {documentIcon ? (
                    <div className="shrink-0 mr-2 text-[18px]">
                        {documentIcon}
                    </div>
                ):(
                    <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground"/>
                )}
            <span className="truncate">
                {label}
            </span>
            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">ctrl/⌘ </span>K
                </kbd>
            )}
            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
                            <div 
                            role="button"
                            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
                                <MoreHorizontal className="h-5 w-5 text-muted-foreground"/>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                        className="w-60"
                        align="start"
                        side="right"
                        forceMount
                        >
                            <DropdownMenuItem onClick={onArchive}>
                                <Trash2 className="h-4 w-4 mr-2"/>
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                                <div className="text-xs text-muted-foreground p-2">
                                    Last edited by: {user?.fullName} 
                                </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div
                    role="button"
                    onClick={onCreateTable}
                    className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
                        <CalendarPlus className="h-4 w-4 text-muted-foreground"/>
                    </div>
                    <div 
                    role="button"
                    onClick={onCreate}
                    className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
                        <PlusCircle className="h-4 w-4 text-muted-foreground"/>
                    </div>
                </div>
            )}
        </div>
    )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number}){
    return (
        <div style={{
                paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
            }}
            className="flex gap-x-2 py-[3px]"
        >
            <Skeleton className="h-4 w-4"/>
            <Skeleton className="h-4 w-[30%]"/>
        </div>
    )
}