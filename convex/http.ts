import { httpRouter } from "convex/server";
import { webhook } from "./webhook";

const http = httpRouter();

http.route({
  method: "POST",
  path: "/webhook",
  handler: webhook,
});

export default http;
