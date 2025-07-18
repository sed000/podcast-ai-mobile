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

export const deleteUser = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    
    if (!user) {
      throw new Error("User not found");
    }
    
    await ctx.db.delete(user._id);
    return user._id;
  },
});

export const getUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    return user;
  },
});


export const createPodcast = mutation({
  args: {
    userId: v.string(),
    title: v.string(),
    description: v.string(),
    hostVoice: v.string(),
    guestVoice: v.string(),
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    const podcast = await ctx.db.insert("podcasts", {
      userId: args.userId,
      title: args.title,
      description: args.description,
      hostVoice: args.hostVoice,
      guestVoice: args.guestVoice,
      prompt: args.prompt,
    });
    return podcast;
  },
});

export const getPodcasts = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const podcasts = await ctx.db
      .query("podcasts")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
    return podcasts;
  },
});

export const deletePodcast = mutation({
  args: { podcastId: v.string() },
  handler: async (ctx, args) => {
    const podcast = await ctx.db
      .query("podcasts")
      .filter((q) => q.eq(q.field("_id"), args.podcastId))
      .first();
    
    if (!podcast) {
      throw new Error("Podcast not found");
    }
    
    await ctx.db.delete(podcast._id);
    return podcast;
  },
});