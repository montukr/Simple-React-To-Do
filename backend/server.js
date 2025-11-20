import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { logger } from "./middleware/logger.js";
import todoRoutes from "./routes/todoRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () =>
    console.log("Server started on " + process.env.PORT)
  );
});
