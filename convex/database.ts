import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: { userId: v.string(), email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db.insert("users", {
      userId: args.userId,
      email: args.email,
      coins: 0,
      subscription: false,
    });
    return user;
  },
});

export const createPodcast = mutation({
  args: { userId: v.string(), title: v.string(), description: v.string(), hostVoice: v.string(), guestVoice: v.string(), prompt: v.string() },
  handler: async (ctx, args) => {
    const podcast = await ctx.db.insert("podcasts", {
      userId: args.userId,
      title: args.title,
      description: args.description,
      hostVoice: args.hostVoice,
      guestVoice: args.guestVoice,
      prompt: args.prompt
    });
    return podcast;
  },
});

export const getPodcasts = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const podcasts = await ctx.db.query("podcasts").filter((q) => q.eq(q.field("userId"), args.userId)).collect();
    return podcasts;
  },
});