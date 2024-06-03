import { Schema, model, Document } from 'mongoose';
import { ITodo } from './todo.model';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  todos: ITodo[];
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
});

export const User = model<IUser>('User', userSchema);