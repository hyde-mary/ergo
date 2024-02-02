import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    documents: defineTable({
        title: v.string(),
        userId: v.string(),
        isArchived: v.boolean(),
        parentDocument: v.optional(v.id("documents")),
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.boolean(),
        isTable: v.optional(v.boolean()),
    })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),
    tasks: defineTable({
        parentDocument: v.optional(v.id("documents")),
        userId: v.string(),
        title: v.string(),
        dueDate: v.optional(v.string()),
        assigned: v.optional(v.string()),
        link: v.optional(v.string()),
        reminder: v.optional(v.string()),
        subject: v.optional(v.string()),
        emailBody: v.optional(v.string()),
        assignedBy: v.optional(v.string()),
        done: v.optional(v.boolean()),
    })
    .index("by_user", ["userId"])
    .index("by_document_id", ["parentDocument"])
})