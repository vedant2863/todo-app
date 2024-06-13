import mongoose, { Schema, model, Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  status: string;
  dueDate: Date;
  userId: mongoose.Schema.Types.ObjectId;
}

export const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dueDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Todo = model<ITodo>("Todo", todoSchema);

export default Todo;
