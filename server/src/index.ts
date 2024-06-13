import { Context, Hono, Next } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { poweredBy } from "hono/powered-by";
import { cors } from "hono/cors";
import { bearerAuth } from "hono/bearer-auth";

import { config } from "./utils/config";
import connectDB from "./utils/connectDB";
import { authRoutes } from "./routes/auth.routes";
import { todoRoutes } from "./routes/todo.routes";
import { authMiddleware } from "./middleware/auth.middleware";

//app
const app = new Hono()
  .basePath("/api")
  .route("/auth", authRoutes)
  .route("/todo", todoRoutes);

// middleware
app.use("*", logger(), prettyJSON(), poweredBy());
app.use("/api/*", cors());
app.get("/todo*", authMiddleware);

// todo middleware setup
const privilegedMethods = ['POST', 'PUT', 'PATCH', 'DELETE']
app.on(privilegedMethods,'/todo*',authMiddleware)

// Custom Not Found Message
app.notFound((c) => {
  return c.text("Custom 404 Not Found", 404);
});

// Error handling
app.onError((err, c) => {
  console.error(`${err}`);
  return c.text("Custom Error Message 500", 500);
});

app.get("/", (c) => c.text("Hello Bun!"));

//index

const server = Bun.serve({
  port: config.PORT || 3000,
  hostname: "0.0.0.0",
  fetch: app.fetch,
});

connectDB()
  .then(() => {
    console.log("⚙️ Server is running at port : ", server.port);
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
