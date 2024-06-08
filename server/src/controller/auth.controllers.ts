import { Context } from "hono";
import { sign, verify } from "hono/jwt";
import User from "../models/user.model";
import connectDB from "../utils/connectDB";

const register = async (c: Context) => {
  try {
    const { username, password } = await c.req.json();
    const hashedPassword = Bun.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    return c.json({ message: "User registered successfully" }, 201);
  } catch (error) {
    console.error("Error registering user:", error);
    return c.json({ message: "Error registering user" }, 500);
  }
};

const login = async (c: Context) => {
  try {
    const { email, password } = await c.req.json();
    const user = await User.findOne({ email });
    if (!user || !(await verify(password, user.password))) {
      return c.json({ message: "Invalid username or password" }, 401);
    }
    const token = await sign(
      {
        id: user._id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      },
      process.env.JWT_SECRET!
    );
    return c.json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    return c.json({ message: "Error logging in user" }, 500);
  }
};

export { register, login };
