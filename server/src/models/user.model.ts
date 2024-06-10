import { Schema, model,Document } from 'mongoose';
import { ITodo } from './todoModel';


interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  todos: ITodo[];
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
});

const User = model<IUser>("User", userSchema);

export default User;
