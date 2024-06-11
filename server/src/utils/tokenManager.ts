import { Context } from "hono";
import { setCookie } from "hono/cookie";
import { decode, sign, verify } from "hono/jwt";

import { config } from "./config";
import { COOKIE_NAME } from "./constants";
import { IUser } from "../models/user.model";

export const createToken = async (c: Context, user: IUser) => {
  const tokenData = {
    id: user._id,
    username: user.username,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + 60 * 50,
  };
  //create token
  const token = await sign(tokenData, config.JWT_SECRET!);
  const cookie = setCookie(c, COOKIE_NAME, token, {
    httpOnly: true,
    path: "/",
    maxAge: 300,
    secure: true,
  });
  console.log(cookie);
  return token;
};

export const verifyToken = async (cookie: string) => {
  const verifiedToken = await verify(cookie, config.JWT_SECRET!);
  if (!verifiedToken) {
    throw new Error("Invalid token");
  }
  console.log(verifiedToken);
  return verifiedToken;
};

export const decodedToken = async (tokenToDecode: string) => {
  const decodedToken = await decode(tokenToDecode);
  if (!decodedToken) {
    throw new Error("Invalid token");
  }
  const { header, payload } = decodedToken;
  console.log("Decoded Header:", header);
  console.log("Decoded Payload:", payload);
  return { payload, header };
};
