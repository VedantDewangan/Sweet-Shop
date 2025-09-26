import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { AuthRoute } from "./routes/AuthRoute.js";
import { SweetRoute } from "./routes/SweetRoute.js";
import cors from "cors";

dotenv.config();

const app = express();

// --- Middleware Setup ---
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// --- Routes ---
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is live",
  });
});

app.use("/api/auth", AuthRoute);
app.use("/api", SweetRoute);

export default app;
