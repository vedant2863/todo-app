import { z } from "zod";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { poweredBy } from "hono/powered-by";
import { prettyJSON } from "hono/pretty-json";

import authRoutes from "./routes/auth.routes";
import todoRoutes from "./routes/todo.routes";
import connectDB from "./utils/connectDB";

// app
const app = new Hono()
  .basePath("/api")
  .route("/auth", authRoutes)
  .route("/todos", todoRoutes);



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

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

//index
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

// console.log(server);



connectDB()
  .then(() => {
    console.log("⚙️ Server is running at port : ", server.port);
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
