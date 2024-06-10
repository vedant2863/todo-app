import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI as string);
    console.log('connected to DB');
    
    mongoose.connection.on("connected", () => {
      console.log("Connected to database successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Error in connecting to database.", err);
    });

  } catch (err) {
    console.error("Failed to connect to database.", err);
    process.exit(1);
  }
};

export default connectDB;