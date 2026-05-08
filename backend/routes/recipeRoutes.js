import express from "express";
import {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getMyRecipes,
  downloadRecipePDF,
} from "../controllers/recipeController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/add", protect, upload.single("image"), addRecipe);
router.get("/my-recipes", protect, getMyRecipes);
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.put("/:id", protect, upload.single("image"), updateRecipe);
router.delete("/:id", protect, deleteRecipe);
// in routes/recipeRoutes.js
//router.put("/:id", protect, updateRecipe);
//router.put("/:id", updateRecipe);
router.get("/download/:id", downloadRecipePDF);

export default router;
