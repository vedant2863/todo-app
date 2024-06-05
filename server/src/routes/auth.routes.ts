import { Hono } from "hono";
import { sign } from "hono/jwt";
import { connectDB } from "../utils/dbConnect";
import { User } from "../model/user.model";

const authRoutes = new Hono();

authRoutes.get("/", async (c) => {
  return c.text("hello authRoutes");
});

authRoutes.post("/sign-up", async (c) => {
  try {
    await connectDB();
    const { username, email, password } = await c.req.json();
    // Check if user exists
    const userExists = await User.findOne({ username, email });
    if (userExists)
      return c.json({ message: "User already exists", status: 400 });

    // Hash password
    const hashedPassword = await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 10,
    });
    // Create user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    const payload = {
      sub: username,
      exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
    };
    const secret = process.env.JWT_SECRET!;
    const token = await sign(payload, secret);
    return c.json({ message: "User created successfully", status: 200, token });
  } catch (error) {
    console.error(error);
    c.json({ message: "Error occurred", status: 500 });
  }
});

// authRoutes.post("/sign-in", async (c) => {
//   try {
//     await connectDB();
//     const { username, password } = await c.req.json();
//     // Check if user exists
//     const user = await User.findOne({ username });
//     if (!user) {
//       return c.json({ message: "User not found" });
//     }
//     // Hash password
//     const hash = await Bun.password.hash(password);
//     const isMatch = await Bun.password.verify(password, hash);
//     if (!isMatch) return c.json({ message: "Invalid password" });

//     const secretKey = process.env.JWT_SECRET!;
//     // const decodedPayload = await verify(tokenToVerify, secretKey)
//     // console.log(decodedPayload)

//     return c.json({ message: "Login successful", status: 200 });
//   } catch (error) {
//     console.error(error);
//     c.json({ message: "Error occurred", status: 500 });
//   }
// });

export default authRoutes;
