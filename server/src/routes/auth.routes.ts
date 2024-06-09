import { Hono } from "hono";
import { register, login ,logout} from "../controller/auth.controllers";

const authRoutes = new Hono();
authRoutes.get("/", (c) => {
  return c.text("Hello authroutes!");
});

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);


export default authRoutes;
