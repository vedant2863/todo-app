import { Schema, model, Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  status: string;
  dueDate: Date;
}

const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

const Todo = model<ITodo>("Todo", todoSchema);

export default Todo;