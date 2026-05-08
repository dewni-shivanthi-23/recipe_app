import Recipe from "../models/Recipe.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
//import axios from "axios";

// CREATE RECIPE
export const addRecipe = async (req, res) => {
  try {
    const { title, category, description, ingredients, instructions } =
      req.body;

    const recipe = await Recipe.create({
      // title,
      // ingredients: ingredients.split(","), // convert to array
      // instructions,
      // image: req.file.filename,
      //uploadedBy: req.user._id,
      userId: req.user.id,
      uploadedBy: req.user.id,
      title,
      category,
      description,
      // ingredients,
      // instructions,
      ingredients:
        typeof ingredients === "string"
          ? ingredients.split(",").map((item) => item.trim())
          : ingredients,
      instructions:
        typeof instructions === "string"
          ? instructions.split(",").map((item) => item.trim())
          : instructions,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    res.status(201).json(recipe);
  } catch (error) {
    console.error("ADD RECIPE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

//GET ALL RECIPES
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("uploadedBy", "name email");
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downloadRecipePDF = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send("Recipe not found");

    // PDF settings
    const doc = new PDFDocument();
    const filePath = path.join("uploads", `${recipe.title}.pdf`);
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    // Title
    doc.fontSize(22).text(recipe.title, { underline: true });

    // Description
    doc.moveDown();
    doc.fontSize(15).text("Description:");
    doc.fontSize(12).text(recipe.description);

    // Ingredients
    doc.moveDown();
    doc.fontSize(15).text("Ingredients:");
    doc.fontSize(12);
    recipe.ingredients.forEach((item) => doc.text("- " + item));

    // Instructions
    doc.moveDown();
    doc.fontSize(15).text("Instructions:");
    doc.fontSize(12);
    recipe.instructions.forEach((step, i) => doc.text(`${i + 1}. ${step}`));

    doc.end();

    stream.on("finish", () => {
      res.download(filePath, `${recipe.title}.pdf`, () => {
        fs.unlinkSync(filePath); // remove after download
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating PDF");
  }
};

// export const downloadRecipePDF = async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.params.id);
//     if (!recipe) return res.status(404).send("Recipe not found");

//     const doc = new PDFDocument({ margin: 50 });
//     const filePath = path.join("uploads", `${recipe.title}.pdf`);
//     const stream = fs.createWriteStream(filePath);

//     doc.pipe(stream);

//     // ===== Add Recipe Image =====
//     if (recipe.image) {
//       const imagePath = path.join("uploads", path.basename(recipe.image));

//       if (fs.existsSync(imagePath)) {
//         doc.image(imagePath, {
//           fit: [500, 300],
//           align: "center",
//           valign: "top",
//         });
//         doc.moveDown(1);
//       }
//     }

//     // ===== Title =====
//     doc.fontSize(22).text(recipe.title, { underline: true, align: "center" });
//     doc.moveDown();

//     // ===== Description =====
//     doc.fontSize(15).text("Description:", { underline: true });
//     doc.fontSize(12).text(recipe.description);
//     doc.moveDown();

//     // ===== Ingredients =====
//     doc.fontSize(15).text("Ingredients:", { underline: true });
//     recipe.ingredients.forEach((item) => doc.text("- " + item));
//     doc.moveDown();

//     // ===== Instructions =====
//     doc.fontSize(15).text("Instructions:", { underline: true });
//     recipe.instructions.forEach((step, i) => doc.text(`${i + 1}. ${step}`));

//     doc.end();

//     stream.on("finish", () => {
//       res.download(filePath, `${recipe.title}.pdf`, () => {
//         fs.unlinkSync(filePath); // remove after download
//       });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error generating PDF");
//   }
// };

export const getMyRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE RECIPE
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE RECIPE
// export const updateRecipe = async (req, res) => {
//   try {
//     const updatedData = req.body;

//     if (req.file) {
//       updatedData.image = req.file.filename;
//     }

//     const recipe = await Recipe.findByIdAndUpdate(req.params.id, updatedData, {
//       new: true,
//     });

//     res.json(recipe);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const updateRecipe = async (req, res) => {
  try {
    const updatedData = req.body;

    // ⭐ Convert ingredients to array if needed
    if (
      updatedData.ingredients &&
      typeof updatedData.ingredients === "string"
    ) {
      updatedData.ingredients = updatedData.ingredients
        .split(",")
        .map((item) => item.trim());
    }

    // ⭐ Convert instructions to array if needed
    if (
      updatedData.instructions &&
      typeof updatedData.instructions === "string"
    ) {
      updatedData.instructions = updatedData.instructions
        .split(",")
        .map((item) => item.trim());
    }

    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    const recipe = await Recipe.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE RECIPE
// export const deleteRecipe = async (req, res) => {
//   try {
//     await Recipe.findByIdAndDelete(req.params.id);
//     res.json({ message: "Recipe deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Optional: check if the user owns the recipe
    if (recipe.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
