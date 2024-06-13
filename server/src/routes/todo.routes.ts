import { Hono } from "hono";
import { getCookie } from "hono/cookie";

import Todo from "../models/todo.model";
import { COOKIE_NAME } from "../utils/constants";
import { verifyToken } from "../utils/tokenManager";

export const todoRoutes = new Hono()
  .get("/", async (c) => {
    try {
      console.log("getting all todos for user");
      const userCookie = getCookie(c, COOKIE_NAME);
      console.log("userCookie: ", userCookie);
      if (!userCookie)
        return c.json({ message: "User not logged in", status: 401 });
      const userVerifiedToken = await verifyToken(userCookie);
      //get all todos for user
      const todos = await Todo.find({ userId: userVerifiedToken.id }); 
      console.log(todos);
      if (!todos) return c.json({ message: "No Todos" }, { status: 200 });



      return c.json({ message: "All todo is fetched", status: 200 });
    } catch (error: any) {
      console.log("error", error.message);
      return c.json({ error: error.message }, { status: 500 });
    }
  })
  .post("/:userId", async (c) => {
    try {
      console.log("creating a new todo");
      const userId = c.req.param("userId");
      const todos = await Todo.find({ userId });
      console.log(todos);
      const { title, date } = await c.req.json();
      const userCookie = getCookie(c, COOKIE_NAME);
      console.log("userCookie: ", userCookie);
      if (!userCookie)
        return c.json({ message: "User not logged in", status: 401 });
      const userVerifiedToken = await verifyToken(userCookie);
      console.log("userVerifiedToken: ", userVerifiedToken);
      console.log(title);
      const newTodo = new Todo({
        title,
        status: "pending",
        dueDate: new Date() || date,
        userId: userId || userVerifiedToken.id,
      });
      await newTodo.save();
      console.log(newTodo.userId);
      console.log(newTodo.userId);
      return c.json({ message: "Todo created" }, { status: 201 });
    } catch (error: any) {
      console.log("error", error.message);
      return c.json({ error: error.message }, { status: 500 });
    }
  })
  .patch("/:id", async (c) => {
    try {
      console.log("updating a todo");
      const id = c.req.param("id");
      const { title, status } = await c.req.json();
      console.log(title);
      const todo = await Todo.findByIdAndUpdate(id);
      if (!todo) return c.json({ message: "Todo not found", status: 404 });
      console.log(todo);
      if (title) todo.title = title;
      if (status) todo.status = status;
      await todo.save();
      return c.json({ message: "Todo updated" }, { status: 200 });
    } catch (error: any) {
      console.log("error", error.message);
      return c.json({ error: error.message }, { status: 500 });
    }
  })
  .delete("/:id", async (c) => {
    try {
      console.log("deleting a todo");
      const id = c.req.param("id");
      const todo = await Todo.findByIdAndDelete(id);
      console.log(todo);
      if (!todo) return c.json({ message: "Todo not found" }, { status: 404 });
      return c.json({ message: "Todo deleted" }, { status: 200 });
    } catch (error: any) {
      console.log("error", error.message);
      return c.json({ error: error.message }, { status: 500 });
    }
  });
