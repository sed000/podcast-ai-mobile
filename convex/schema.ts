import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    userId: v.string(),
    coins: v.number(),
    subscription: v.boolean(),
    subscriptionStart: v.optional(v.number()),
    subscriptionEnd: v.optional(v.number()),
  }),
  podcasts: defineTable({
    title: v.string(),
    description: v.string(),
    userId: v.string(),
    hostVoice: v.string(),
    guestVoice: v.string(),
    prompt: v.string(),
    // TODO: Listen
    status: v.optional(v.union(
      v.literal("pending"),
      v.literal("generating"),
      v.literal("completed"),
      v.literal("failed")
    )),
  }),
});
