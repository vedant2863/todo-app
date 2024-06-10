import { Hono } from "hono";
import { sign } from "hono/jwt";
import { setCookie } from "hono/cookie";

import User from "../models/user.model";
import { config } from "../utils/config";

export const authRoutes = new Hono()
  .post("/signup", async (c) => {
    try {
      const { username, email, password } = await c.req.json();
      console.log(username, email, password);
      const existUser = await User.findOne({ username });
      console.log(existUser);
      
      if (existUser) {
        return c.json({ message: "Username already exist" });
      }
      const hashedPassword = await Bun.password.hash(password);
      console.log(hashedPassword);
      
      const user = new User({ username, email, password: hashedPassword });
      console.log(user);
      
      await user.save();

      return c.json({ message: "Signup success" }, { status: 201 });
    } catch (error: any) {
      console.log("signup error: ", error.message);
    }
  })
  .post("/login", async (c) => {
    try {
      const { email, password } = await c.req.json();

      //check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return c.json({ error: "User does not exist" }, { status: 400 });
      }
      console.log("user exists");

      const isMatch = await Bun.password.verify(password, user.password);
      if (!isMatch) {
        return c.json({ message: "Password is not match" }, { status: 401 });
      }
      console.log(user);

      //create token data
      const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 50,
      };

      //create token
      const token = await sign(tokenData, config.JWT_SECRET!);

     const cookie = setCookie(c, "authToken", token, {
        httpOnly: true,
        path: "/",
        maxAge: 300,
      });

    console.log(cookie);
    

      return c.json({ message: "Login success" }, { status: 200 });
    } catch (error: any) {
      console.log("login error: ", error.message);
    }
  });
