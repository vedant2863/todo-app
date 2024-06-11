import { Hono } from "hono";
import Todo from "../models/todoModel";
import { COOKIE_NAME } from "../utils/constants";
import { getCookie, getSignedCookie } from "hono/cookie";

export const todoRoutes = new Hono()
  .get("/", async (c) => {
    try {
      console.log("getting all todos");
      const todos = await Todo.find();
      console.log(todos);
      if (!todos) return c.json({ message: "No Todos" }, { status: 200 });

      return c.json({ message: "All todo is fetched" }, { status: 200 });
    } catch (error: any) {
      console.log("error", error.message);
      return c.json({ error: error.message }, { status: 500 });
    }
  })
  .post("/", async (c) => {
    try {
      console.log("creating a new todo");

      const { title, date } = await c.req.json();
      console.log(title);

      const exampleCookie = getCookie(c, COOKIE_NAME);
      if (exampleCookie) {
        return c.text(`Cookie value: ${exampleCookie}`);
      } else {
        return c.text("Cookie not found");
      }

      //   const cookieValue =  getCookie(c, COOKIE_NAME);
      //   console.log(cookieValue);

      //   const parsedValue = JSON.parse(cookieValue!);
      //   console.log(parsedValue);

      //   if (parsedValue && parsedValue.id) {
      //     console.log(parsedValue._id);

      //     return parsedValue.id;
      //   }
      //   console.log(parsedValue._id);

      const newTodo = new Todo({
        title,
        status: "pending",
        dueDate: new Date() || date,
        // userId: c.req.user?.id,
      });
      await newTodo.save();
      console.log(newTodo);

      return c.json({ message: "Todo created" }, { status: 201 });
    } catch (error: any) {
      console.log("error", error.message);
      return c.json({ error: error.message }, { status: 500 });
    }
  })
  .patch("/:id{[0-9]+}", async (c) => {
    try {
      console.log("updating a todo");
      const id = Number.parseInt(c.req.param("id"));
      const { title, status } = await c.req.json();
      console.log(title);
      const todo = await Todo.findByIdAndUpdate(id, { title, status });
      console.log(todo);
      if (!todo) return c.json({ message: "Todo not found" }, { status: 404 });
      return c.json({ message: "Todo updated" }, { status: 200 });
    } catch (error: any) {
      console.log("error", error.message);
      return c.json({ error: error.message }, { status: 500 });
    }
  })
  .delete("/:id{[0-9]+}", async (c) => {
    try {
      console.log("deleting a todo");
      const id = Number.parseInt(c.req.param("id"));
      const todo = await Todo.findByIdAndDelete(id);
      console.log(todo);
      if (!todo) return c.json({ message: "Todo not found" }, { status: 404 });
      return c.json({ message: "Todo deleted" }, { status: 200 });
    } catch (error: any) {
      console.log("error", error.message);
      return c.json({ error: error.message }, { status: 500 });
    }
  });
