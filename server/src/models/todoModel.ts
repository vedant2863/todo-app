import mongoose, { Schema, model, Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  status: string;
  dueDate: Date;
  userId: mongoose.Schema.Types.ObjectId;
}

const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    dueDate: { type: Date , default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Todo = model<ITodo>("Todo", todoSchema);

export default Todo;
