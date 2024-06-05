import mongoose from "mongoose";
import { z } from "zod";

const MongodbEnv = z.object({
  MongoDB_URI: z.string().url(),
});
const ProcessEnv = MongodbEnv.parse(process.env);

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export async function connectDB(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }
  try {
    const db = await mongoose.connect(ProcessEnv.MongoDB_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
