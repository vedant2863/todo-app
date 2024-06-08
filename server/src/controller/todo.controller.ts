import { Context } from 'hono';
import Todo from '../models/todoModel';

export const createTodo = async (c: Context) => {
  const { title, description } = await c.req.json();
  const userId = c.req.header('userId');

  const todo = new Todo({
    userId,
    title,
    description,
    completed: false,
  });

  await todo.save();
  return c.json(todo, 201);
};

export const getTodos = async (c: Context) => {
  const userId = c.req.header('userId');
  const todos = await Todo.find({ userId });
  return c.json(todos);
};

export const updateTodo = async (c: Context) => {
  const { id } = c.req.param();
  const { title, description, completed } = await c.req.json();

  const todo = await Todo.findByIdAndUpdate(id, { title, description, completed }, { new: true });
  if (!todo) return c.json({ message: 'Todo not found' }, 404);

  return c.json(todo);
};

export const deleteTodo = async (c: Context) => {
  const { id } = c.req.param();
  await Todo.findByIdAndDelete(id);
  return c.json({ message: 'Todo deleted successfully' });
};
