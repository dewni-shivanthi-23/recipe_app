import React, { useEffect, useState } from "react";
//import heroImg from "../assets/images/wall2.jpg"; // your uploaded hero image
import { useParams } from "react-router-dom";
import axios from "axios";

function RecipeDetails() {
  const { id } = useParams(); // get recipe ID from URL
  const [recipe, setRecipe] = useState(null);

  const downloadPDF = (id) => {
    window.open(`http://localhost:5000/api/recipes/download/${id}`, "_blank");
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
      setRecipe(res.data);
    } catch (err) {
      console.error("Failed to load recipe:", err);
    }
  };

  if (!recipe) return <p className="text-center mt-20">Loading...</p>;
  return (
    <div className="w-full">
      {/* ==================== HERO SECTION ==================== */}
      <div
        className="w-full h-[675px] bg-cover bg-no-repeat bg-center relative -mt-[50px]"
        style={{
          backgroundImage: `url(${
            recipe.image ? `http://localhost:5000${recipe.image}` : heroImg
          })`,
        }}
      >
        <div className="absolute inset-0"></div>

        <div className="relative z-20 flex flex-col justify-center h-full pl-10 md:pl-24">
          <h1 className="text-white text-5xl font-bold leading-tight">
            {recipe.title}
            <br />
            {/* <span className="text-amber-500">Noodles</span> */}
          </h1>
        </div>
      </div>

      {/* ==================== RECIPE DETAILS ==================== */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Top Details */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center mb-10 -ml-22">
          <div>
            <p className="text-gray-500 text-sm">Cuisine</p>
            <p className="font-semibold">{recipe.category || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Servings</p>
            <p className="font-semibold">4 Persons</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Prep Time</p>
            <p className="font-semibold">10 Minutes</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Cook Time</p>
            <p className="font-semibold">15 Minutes</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Difficulty</p>
            <p className="font-semibold">Easy</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-4">
          {/* Experience the comforting flavors of Italy with this classic Italian
          Noodles recipe — perfectly cooked pasta tossed in a rich tomato and
          herb sauce, topped with parmesan cheese and a dash of love. */}
          {recipe.description}
        </p>

        {/* Tags */}
        <p className="text-gray-500">
          <strong>Tags:</strong> Italian, Noodles, spicy, cheese
        </p>

        {/* Download Button */}
        <div className="mt-4">
          <button
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
            onClick={() => downloadPDF(recipe._id)}
          >
            Download Recipe PDF
          </button>
        </div>

        {/* ==================== INGREDIENTS CARD ==================== */}
        <div
          className="mt-10 bg-white border rounded-xl p-6 shadow-sm transform transition-all duration-300 ease-out
             hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02]
             cursor-pointer z-10"
        >
          <h2 className="text-xl font-bold mb-4 text-amber-500">Ingredients</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            {/* <p>200g Italian noodles (spaghetti or fettuccine)</p>
            <p>1 tbsp oregano</p>
            <p>2 tbsp olive oil</p>
            <p>1 tsp salt</p>
            <p>2 garlic cloves (minced)</p>
            <p>Fresh basil leaves (for garnish)</p>
            <p>1 cup tomato puree</p>
            <p>Grated parmesan cheese (optional)</p> */}
            {recipe.ingredients?.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>

        {/* ==================== COOKING INSTRUCTIONS ==================== */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-amber-500 mb-4">
            Cooking Instructions
          </h2>

          <div className="space-y-3">
            {/* {[
              "Boil noodles in salted water until tender. Drain and drizzle with olive oil.",
              "In a pan, heat olive oil and sauté garlic until golden.",
              "Add tomato puree, chili flakes, and oregano. Simmer for 5–7 minutes.",
              "Toss the noodles into the sauce until well coated.",
              "Garnish with basil and parmesan, then serve warm.",
            ].map((step, i) => ( */}
            {recipe.instructions?.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 bg-white border rounded-lg shadow-sm transform transition-all duration-300 ease-out
             hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02]
             cursor-pointer z-10"
              >
                <div className="bg-amber-500 text-white font-bold w-10 h-10 flex items-center justify-center rounded-lg">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import heroImg from "../assets/images/wall2.jpg";
// import axios from "axios";

// function RecipeDetails() {
//   const { id } = useParams(); // get recipe ID from URL
//   const [recipe, setRecipe] = useState(null);

//   useEffect(() => {
//     fetchRecipe();
//   }, []);

//   const fetchRecipe = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
//       setRecipe(res.data);
//     } catch (err) {
//       console.error("Failed to load recipe:", err);
//     }
//   };

//   if (!recipe) return <p className="text-center mt-20">Loading...</p>;

//   return (
//     <div className="w-full">
//       {/* ================= HERO ================= */}
//       <div
//         className="w-full h-[675px] bg-cover bg-no-repeat bg-center relative -mt-[50px]"
//         style={{ backgroundImage: `url(${heroImg})` }}
//       >
//         <div className="relative z-20 flex flex-col justify-center h-full pl-10 md:pl-24">
//           <h1 className="text-white text-5xl font-bold leading-tight">
//             {recipe.title}
//           </h1>
//         </div>
//       </div>

//       {/* ================= RECIPE DETAILS ================= */}
//       <div className="max-w-6xl mx-auto px-4 py-10">
//         {/* Cuisine/Servings/Time etc can be made dynamic */}
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center mb-10">
//           <div>
//             <p className="text-gray-500 text-sm">Cuisine</p>
//             <p className="font-semibold">{recipe.category || "N/A"}</p>
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Servings</p>
//             <p className="font-semibold">4 Persons</p>
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Prep Time</p>
//             <p className="font-semibold">10 Minutes</p>
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Cook Time</p>
//             <p className="font-semibold">15 Minutes</p>
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Difficulty</p>
//             <p className="font-semibold">Easy</p>
//           </div>
//         </div>

//         {/* Description */}
//         <p className="text-gray-600 leading-relaxed mb-4">
//           {recipe.description}
//         </p>

//         {/* Ingredients */}
//         <div className="mt-10 bg-white border rounded-xl p-6 shadow-sm">
//           <h2 className="text-xl font-bold mb-4 text-amber-500">Ingredients</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
//             {recipe.ingredients?.map((item, index) => (
//               <p key={index}>{item}</p>
//             ))}
//           </div>
//         </div>

//         {/* Instructions */}
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold text-amber-500 mb-4">
//             Cooking Instructions
//           </h2>

//           <div className="space-y-3">
//             {recipe.instructions?.map((step, i) => (
//               <div
//                 key={i}
//                 className="flex items-start gap-4 p-4 bg-white border rounded-lg shadow-sm"
//               >
//                 <div className="bg-amber-500 text-white font-bold w-10 h-10 flex items-center justify-center rounded-lg">
//                   {String(i + 1).padStart(2, "0")}
//                 </div>
//                 <p className="text-gray-700">{step}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RecipeDetails;
