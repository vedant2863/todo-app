import mongoose, { MongoClient } from "mongoose";
import { z } from "zod";

const MongodbEnv = z.object({
  MongoDB_URI: z.string().url(),
});
const ProcessEnv = MongodbEnv.parse(process.env);

export async function connectDB(): Promise<MongoClient> {
  try {
    const client = await MongoClient.connect(ProcessEnv.MongoDB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Re-throw to handle in your application
  }
}
