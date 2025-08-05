import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

export const revenuecat_webhook = httpAction(async (ctx, request) => {
  const payload = await request.text();
  const event = JSON.parse(payload).event;

  let purchase = null;
  for (let i = 0; i < 4; i++) {
    purchase = await ctx.runQuery(
      internal.database.getPurchaseByRevenuecatId,
      { revenuecatId: event.transaction_id }
    );
    if (purchase) {
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  if (!purchase) {
    console.error(
      `Webhook Error: Could not find purchase with transaction_id: ${event.transaction_id} after multiple retries.`
    );
    return new Response("Purchase not found, but acknowledged.", {
      status: 200,
    });
  }

  if (
    event.type === "INITIAL_PURCHASE" ||
    event.type === "NON_RENEWING_PURCHASE"
  ) {
    await ctx.runMutation(internal.database.addCoins, {
      userId: purchase.userId,
      coinsToAdd: 20,
    });
  }

  return new Response(null, { status: 200 });
});