import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";
import { User } from "lucide-react-native";

export const webhook = httpAction(async (ctx, request) => {
  const body = await request.json();
  const eventType = body.type;
  if (eventType == "user.created") {
    const user = body.data;
    await ctx.runMutation(api.database.createUser, {
      userId: user.id,
      email: user.email_addresses[0]?.email_address,
    });
  }

  if (eventType == "user.deleted") {
    const user = body.data;
    await ctx.runMutation(api.database.deleteUser, {
      userId: user.id,
    });
  }

  return new Response("OK", { status: 200 });
});
