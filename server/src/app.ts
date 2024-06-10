import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { poweredBy } from "hono/powered-by";
import { cors } from "hono/cors";

import { config } from "./utils/config";
import authRoutes from "./routes/auth.routes";
import todoRoutes from "./routes/todo.routes";

const app = new Hono()
  .basePath("/api")
  .route("/auth", authRoutes)
  .route("/todos", todoRoutes);

app.get("/", (c) => c.text("Hello Bun!"));

// middleware
app.use("*", logger(), prettyJSON(), poweredBy());
app.use("/api/*", cors());

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

export default {
  port: config.PORT || 3000,
  fetch: app.fetch,
  app,
};
