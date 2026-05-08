import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  removeProfile,
  updateProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadProfile } from "../controllers/authController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.post(
  "/upload-profile",
  protect, // ensure user is logged in
  upload.single("profilePic"),
  uploadProfile
);
router.delete("/profile/remove", protect, removeProfile);
router.put("/profile", protect, updateProfile);

export default router;
