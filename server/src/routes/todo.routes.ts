import { Hono } from 'hono';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controller/todo.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const todoRoutes = new Hono();



todoRoutes.use('/todos', authMiddleware);
todoRoutes.post('/todos', createTodo);
todoRoutes.get('/todos', getTodos);
todoRoutes.put('/todos/:id', updateTodo);
todoRoutes.delete('/todos/:id', deleteTodo);

export default todoRoutes;