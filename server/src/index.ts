import { z } from "zod";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { poweredBy } from "hono/powered-by";
import { prettyJSON } from "hono/pretty-json";

import authRoutes from "./routes/auth.routes";
import todoRoutes from "./routes/todo.routes";
import { connect } from "mongoose";
import connectDB from "./utils/connectDB";

// app
const app = new Hono()
  .basePath("/api")
  .route("/auth", authRoutes)
  .route("/todos", todoRoutes);

app.get("/", (c) => {
  return c.text("Hello World!");
});

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

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

connectDB()
  .then(() => {
    console.log("server running on PORT: ", server.port);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
