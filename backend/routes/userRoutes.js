import express from "express";
import User from "../models/User.js";
import { deleteUser } from "../controllers/authController.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.delete("/:id", deleteUser);

export default router;
