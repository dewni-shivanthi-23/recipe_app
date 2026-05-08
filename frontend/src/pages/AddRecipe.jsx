// import React from "react";
// import { useState } from "react";
// import { addRecipe } from "../services/api";
// import chefImg from "../assets/images/chef5.jpg"; // <-- Use your uploaded chef image
// import { useNavigate } from "react-router-dom";

// const AddRecipe = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [ingredients, setIngredients] = useState("");
//   const [instructions, setInstructions] = useState("");
//   const [image, setImage] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();

//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("ingredients", ingredients);
//     formData.append("instructions", instructions);
//     if (image) formData.append("image", image);

//     const res = await addRecipe(formData);

//     alert("Recipe added!");

//     navigate("/profile");
//   };

//   return (
//     <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 -mt-[20px]">
//       {/* ================= LEFT SECTION (FORM) ================= */}
//       <div className="bg-white px-35 py-12">
//         <h1 className="text-2xl font-bold text-black mb-6">
//           <span className="text-amber-500">Add New</span> Recipe
//         </h1>
//         <br></br>

//         <form className="space-y-5" onSubmit={handleSubmit}>
//           {/* Recipe Title */}
//           <div>
//             <label className=" text-sm font-medium">Recipe Title</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full border border-amber-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="text-sm font-medium">Description</label>
//             <textarea
//               rows="2"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full border border-amber-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
//             ></textarea>
//           </div>

//           {/* Ingredients */}
//           <div>
//             <label className="text-sm font-medium">Ingredients</label>
//             <textarea
//               rows="2"
//               value={ingredients}
//               onChange={(e) => setIngredients(e.target.value)}
//               className="w-full border border-amber-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
//             ></textarea>
//           </div>

//           {/* Instructions */}
//           <div>
//             <label className="text-sm font-medium">Instructions</label>
//             <textarea
//               rows="2"
//               value={instructions}
//               onChange={(e) => setInstructions(e.target.value)}
//               className="w-full border border-amber-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
//             ></textarea>
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label className="text-sm font-medium">Image</label>
//             <input
//               type="file"
//               onChange={(e) => setImage(e.target.files[0])}
//               className="w-full border border-amber-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-4 pt-4">
//             <button className="bg-amber-500 w-32 text-white px-5 py-2 rounded-md hover:bg-amber-600 transition">
//               Add Recipe
//             </button>
//             <button className="bg-red-500 w-32 text-white px-5 py-2 rounded-md hover:bg-red-500 transition">
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* ================= RIGHT SECTION (IMAGE) ================= */}
//       <div className="hidden md:block">
//         <img
//           src={chefImg}
//           alt="chef"
//           className="w-full h-160% object-cover -mt-[10px]"
//         />
//       </div>
//     </div>
//   );
// };

// export default AddRecipe;

import React, { useState } from "react";
import { addRecipe } from "../services/api";
import chefImg from "../assets/images/chef5.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("ingredients", ingredients);
      formData.append("instructions", instructions);

      if (image) formData.append("image", image);

      formData.append("uploadedBy", user._id);

      await addRecipe(formData);

      setSuccess("Recipe added successfully!");

      // Clear fields
      setTitle("");
      setCategory("");
      setDescription("");
      setIngredients("");
      setInstructions("");
      setImage(null);

      // Redirect after 1.5 seconds
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err) {
      setError("Failed to add recipe. Try again!");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 -mt-[20px]">
      {/* LEFT SECTION */}
      <div className="bg-white px-35 py-12">
        <h1 className="text-2xl font-bold text-black mb-6">
          <span className="text-amber-500">Add New</span> Recipe
        </h1>

        {/* SUCCESS ALERT */}
        {success && (
          <div className="mb-4 p-4 rounded-md bg-green-100 border border-green-400 text-green-700">
            {success}
          </div>
        )}

        {/* ERROR ALERT */}
        {error && (
          <div className="mb-4 p-4 rounded-md bg-red-100 border border-red-400 text-red-700">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Recipe Title */}
          <div>
            <label className="text-sm font-medium">Recipe Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-amber-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-amber-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              rows="2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-amber-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            ></textarea>
          </div>

          {/* Ingredients */}
          <div>
            <label className="text-sm font-medium">Ingredients</label>
            <textarea
              rows="2"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full border border-amber-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            ></textarea>
          </div>

          {/* Instructions */}
          <div>
            <label className="text-sm font-medium">Instructions</label>
            <textarea
              rows="2"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full border border-amber-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium">Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border border-amber-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button className="bg-amber-500 w-32 text-white px-5 py-2 rounded-md hover:bg-amber-600 transition">
              Add Recipe
            </button>
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="bg-red-500 w-32 text-white px-5 py-2 rounded-md hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT IMAGE SECTION */}
      <div className="hidden md:block">
        <img
          src={chefImg}
          alt="chef"
          className="w-full h-full object-cover -mt-[10px]"
        />
      </div>
    </div>
  );
};

export default AddRecipe;
