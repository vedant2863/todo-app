import { z } from "zod";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { poweredBy } from "hono/powered-by";
import { prettyJSON } from "hono/pretty-json";
import authRoutes from "./routes/auth.routes";

//app
const app = new Hono().basePath('/api')

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// routes
app.route("/auth", authRoutes);


// middleware
app.use("*", logger(), prettyJSON(), poweredBy());

// Custom Not Found Message
app.notFound((c) => {
  return c.text("Custom 404 Not Found", 404);
});

// Error handling
app.onError((err, c) => {
  console.error(`${err}`);
  return c.text("Custom Error Message 500", 500);
});



//server || Port setup
const ServeEnv = z.object({
  PORT: z
    .string()
    .regex(/^\d+$/, "Port must be a numeric string")
    .default("3000")
    .transform(Number),
});
const ProcessEnv = ServeEnv.parse(process.env);


const server = Bun.serve({
  port: ProcessEnv.PORT,
  hostname: "0.0.0.0",
  fetch: app.fetch,
});



console.log("server running", server.port);
