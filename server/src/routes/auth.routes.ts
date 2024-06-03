import { Hono } from "hono";

const authRoutes = new Hono()
  .get("/login", (c) => {
    return c.text("Login Page");
  })
  .get("/register", (c) => {
    return c.text("Register Page");
  })
  .get("/logout", (c) => {
    return c.text("Logout Page");
  })
  .get("/forgot-password", (c) => {
    return c.text("Forgot Password Page");
  })
  .get("/reset-password", (c) => {
    return c.text("Reset Password Page");
  });

export default authRoutes;
