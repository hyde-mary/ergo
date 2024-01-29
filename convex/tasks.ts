import { convexToJson, v } from "convex/values";
import { mutation ,query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const create = mutation({
    args: {
        title: v.string(),
        parentDocument: v.optional(v.id("documents")),
        assigned: v.optional(v.string()),
        dueDate: v.optional(v.string()),
        link: v.optional(v.string()),
        reminder: v.optional(v.string()),
        subject: v.optional(v.string()),
        emailBody: v.optional(v.string())
    }, 
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity){
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const task = await ctx.db.insert("tasks", {
            parentDocument: args.parentDocument,
            userId,
            title: args.title,
            dueDate: args.dueDate,
            assigned: args.assigned,
            link: args.link,
            reminder: args.reminder,
            subject: args.subject,
            emailBody: args.emailBody,
        });

        return task;
    }
})

export const getTaskList = query({
    args:{
        parentDocument: v.optional(v.id("documents")),
    }, handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity){
            throw new Error("Not authenticated");
        }

        const taskList = ctx.db.query("tasks")
        .filter((q) => q.eq(q.field("parentDocument"), args.parentDocument))
        .collect()
        
        return taskList;
    },
})

export const deleteTask = mutation({
    args: {
        id: v.id("tasks") 
    },
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated!");
        }

        const userId = identity.subject;

        const existingTask = await ctx.db.get(args.id);

        if (!existingTask){
            throw new Error("Task Not Found!");
        }

        if (existingTask.userId !== userId){
            throw new Error ("Unauthorized Access");
        }

        const task = await ctx.db.delete(args.id);

        return task;
    }
})