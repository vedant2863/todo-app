import mongoose from "mongoose";
import { DbName, url } from "./constants";

const connectDB = async () => {
  try {

    await mongoose.connect( `${url}/${DbName}`);
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