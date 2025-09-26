import { connectDB } from "./database/connectDB.js";
import app from "./server.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`✅ Backend live on port ${PORT}`);
  });
};

startServer();
