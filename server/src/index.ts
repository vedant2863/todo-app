import { config } from "./utils/config";
import connectDB from "./utils/connectDB";






connectDB()
  .then(() => {
    console.log("⚙️ Server is running at port : ", config.PORT);
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
