import { Document, Schema, model } from "mongoose";

export interface ITodo extends Document {
  userId: string;
  text: string;
  title: string;
  completed: boolean;
}

const todoSchema = new Schema<ITodo>(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

export const Todo = model<ITodo>("Todo", todoSchema);
