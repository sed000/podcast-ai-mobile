import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    userId: v.string(),
    coins: v.number(),
  }),
  podcasts: defineTable({
    sessionId: v.optional(v.string()),
    title: v.string(),
    description: v.string(),
    userId: v.string(),
    hostVoice: v.string(),
    guestVoice: v.string(),
    prompt: v.string(),
    audioUrl: v.string(),
    status: v.optional(v.union(
      v.literal("pending"),
      v.literal("generating"),
      v.literal("completed"),
      v.literal("failed")
    )),
  }),
  purchases: defineTable({
    userId: v.string(),
    revenuecatId: v.optional(v.string()),
  }),
});
