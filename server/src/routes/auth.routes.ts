import { Hono } from "hono";
import { deleteCookie, getSignedCookie, setCookie } from "hono/cookie";

import User from "../models/user.model";
import { COOKIE_NAME } from "../utils/constants";
import { createToken } from "../utils/tokenManager";

export const authRoutes = new Hono()
  .post("/signup", async (c) => {
    try {
      const { username, email, password } = await c.req.json();
      const existingUser = await User.findOne({ email });
      console.log(existingUser);
      if (existingUser)
        return c.json({ message: "User already registered" }, { status: 400 });
      const hashedPassword = await Bun.password.hash(password);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      // delete cookie if it exists
      deleteCookie(c, COOKIE_NAME);
      const token = await createToken(c, user);
      console.log(token);
      const cookie = setCookie(c, COOKIE_NAME, token);
      console.log(cookie);
      return c.json({ message: "Signup success" }, { status: 201 });
    } catch (error: any) {
      console.log("signup error: ", error.message);
      c.json({ error: error.message }, { status: 500 });
    }
  })
  .post("/login", async (c) => {
    try {
      console.log("/login");
      const { email, password } = await c.req.json();
      //check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return c.json({ error: "User not registered" }, { status: 400 });
      }
      //check if password is correct
      const isMatch = await Bun.password.verify(password, user.password);
      if (!isMatch) {
        return c.json({ message: "Incorrect Password" }, { status: 401 });
      }
      //delete cookie if it exists
      deleteCookie(c, COOKIE_NAME);
      //create token
      const token = await createToken(c, user);
      setCookie(c, COOKIE_NAME, token);
      return c.json({ message: "Login success" }, { status: 200 });
    } catch (error: any) {
      console.log("login error: ", error.message);
      c.json({ error: error.message }, { status: 500 });
    }
  })
  .get("/logout", async (c) => {
    try {
      const deletecookie = deleteCookie(c, COOKIE_NAME);
      console.log(deletecookie);
      return c.json(
        { message: "Logout success", success: true },
        { status: 500 }
      );
    } catch (error: any) {
      console.error("Logout error", error.message);
      c.json({ error: error.message }, { status: 500 });
    }
  });
