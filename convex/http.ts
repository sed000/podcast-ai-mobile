import { httpRouter } from "convex/server";
import { webhook } from "./webhook";
import { revenuecat_webhook } from "./revenuecat_webhook";

const http = httpRouter();

http.route({
  method: "POST",
  path: "/webhook",
  handler: webhook,
});

http.route({
  method: "POST",
  path: "/revenuecat-webhook",
  handler: revenuecat_webhook,
});

export default http;
