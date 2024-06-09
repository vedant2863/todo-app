import { Schema, model,Document } from 'mongoose';

interface ITodo extends Document{
  userId: string | undefined;
  title: string;
  description: string;
  completed: boolean;
}

const todoSchema = new Schema<ITodo>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false }
});

const Todo = model<ITodo>('Todo', todoSchema);

export default Todo;
