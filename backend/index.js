import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/recipes", recipeRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
