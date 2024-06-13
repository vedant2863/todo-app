import { getCookie } from "hono/cookie";
import { Context, Next } from "hono";
import { createMiddleware } from "hono/factory";
import { Bindings } from "hono/types";

import { COOKIE_NAME } from "../utils/constants";
import { verifyToken } from "../utils/tokenManager";

export const authMiddleware = createMiddleware<{ Bindings: Bindings }>(
  async (c: Context) => {
    console.log("auth middleware start");

    const userCookie = getCookie(c, COOKIE_NAME);
    try {
      console.log(userCookie);

      if (!userCookie)
        return c.json({
          message: "UnAuthenticated you need to login",
          status: 401,
        });
      const userVerifiedToken = await verifyToken(userCookie);
      console.log("userVerifiedToken: ", userVerifiedToken);
      console.log(`[${c.req.method}] ${c.req.url}`)

      return c.json({ message: "Authenticated" });
    } catch (error) {
      return c.json({ message: "Error in auth middleware", error: error });
    } finally {
      console.log("auth middleware end");
    }
  }
);
