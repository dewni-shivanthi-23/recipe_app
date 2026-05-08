import React, { useEffect, useState } from "react";
import chefImg from "../assets/images/chef5.jpg"; // <-- Use your uploaded chef image
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById, updateRecipe } from "../services/api";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipeData, setRecipeData] = useState({
    title: "",
    category: "",
    description: "",
    ingredients: "",
    instructions: "",
    image: null,
  });

  const [preview, setPreview] = useState(null); // For image preview
  const [alert, setAlert] = useState({ message: "", type: "" });

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;
      try {
        const res = await getRecipeById(id);
        setRecipeData({
          title: res.data.title,
          category: res.data.category,
          description: res.data.description,
          ingredients: res.data.ingredients,
          instructions: res.data.instructions,
          image: null,
        });
        setPreview(
          res.data.image ? `http://localhost:5000${res.data.image}` : null
        );
      } catch (err) {
        console.error("Failed to fetch recipe:", err);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setRecipeData((prev) => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setRecipeData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", recipeData.title);
      formData.append("category", recipeData.category);
      formData.append("description", recipeData.description);
      formData.append("ingredients", recipeData.ingredients);
      formData.append("instructions", recipeData.instructions);
      if (recipeData.image) {
        formData.append("image", recipeData.image);
      }

      await updateRecipe(id, formData);
      //alert("Recipe updated successfully");
      setAlert({ message: "Recipe updated successfully!", type: "success" });
      //navigate("/profile", { state: { updated: true } }); // Redirect to profile page
      setTimeout(() => {
        setAlert({ message: "", type: "" });
        navigate("/profile", { state: { updated: true } });
      }, 2000); // auto-hide after 2 sec
    } catch (err) {
      console.error("Failed to update recipe:", err);
      //alert("Failed to update recipe");
      setAlert({ message: "Failed to update recipe.", type: "error" });
      setTimeout(() => setAlert({ message: "", type: "" }), 3000);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 -mt-[20px]">
      {/* ================= LEFT SECTION (FORM) ================= */}
      <div className="bg-white px-35 py-12">
        <h1 className="text-2xl font-bold text-black mb-6">
          <span className="text-amber-500">Edit</span> Recipe
        </h1>
        <br></br>

        {alert.message && (
          <div
            className={`mb-4 px-4 py-3 rounded relative ${
              alert.type === "success"
                ? "bg-green-100 border border-green-400 text-green-700"
                : "bg-red-100 border border-red-400 text-red-700"
            }`}
            role="alert"
          >
            <span className="block sm:inline">{alert.message}</span>
            <span
              className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
              onClick={() => setAlert({ message: "", type: "" })}
            >
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
              </svg>
            </span>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Recipe Title */}
          <div>
            <label className=" text-sm font-medium">Recipe Title</label>
            <input
              type="text"
              name="title"
              value={recipeData.title}
              onChange={handleChange}
              className="w-full border border-amber-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className=" text-sm font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={recipeData.category}
              onChange={handleChange}
              className="w-full border border-amber-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              rows="2"
              value={recipeData.description}
              onChange={handleChange}
              className="w-full border border-amber-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            ></textarea>
          </div>

          {/* Ingredients */}
          <div>
            <label className="text-sm font-medium">Ingredients</label>
            <textarea
              name="ingredients"
              rows="2"
              value={recipeData.ingredients}
              onChange={handleChange}
              className="w-full border border-amber-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            ></textarea>
          </div>

          {/* Instructions */}
          <div>
            <label className="text-sm font-medium">Instructions</label>
            <textarea
              name="instructions"
              rows="2"
              value={recipeData.instructions}
              onChange={handleChange}
              className="w-full border border-amber-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full border border-amber-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-full h-40 object-cover rounded-md mt-2"
            />
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-amber-500 w-32 text-white px-5 py-2 rounded-md hover:bg-amber-600 transition"
            >
              Save Recipe
            </button>
            <button
              type="button"
              className="bg-red-500 w-32 text-white px-5 py-2 rounded-md hover:bg-red-500 transition"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* ================= RIGHT SECTION (IMAGE) ================= */}
      <div className="hidden md:block">
        <img
          src={chefImg}
          alt="chef"
          className="w-full h-160% object-cover -mt-[10px]"
        />
      </div>
    </div>
  );
};

export default EditRecipe;
