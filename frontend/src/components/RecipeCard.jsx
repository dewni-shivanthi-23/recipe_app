// import React from "react";

// const RecipeCard = ({ name, time, img }) => {
//   return (
//     <div className="border rounded-lg shadow-sm hover:shadow-md transition">
//       <img
//         src={img}
//         alt={name}
//         className="w-full h-44 object-cover rounded-t-lg"
//       />

//       <div className="p-4">
//         <h3 className="font-semibold text-lg">{name}</h3>
//         <p className="text-red-400 font-bold text-sm mt-1">{time}</p>
//       </div>
//     </div>
//   );
// };

// export default RecipeCard;

import React from "react";

const RecipeCard = ({ name, time, img }) => {
  return (
    <div
      className="border rounded-lg shadow-md transform transition-all duration-300 ease-out 
             hover:shadow-xl hover:-translate-y-2 hover:scale-[1.05] 
             cursor-pointer z-10"
    >
      <img
        src={img}
        alt={name}
        className="w-full h-44 object-cover rounded-t-lg transform transition-transform duration-300 hover:scale-110"
      />
      <div className="p-4">
        {/* Recipe Name */}
        <h3 className="font-semibold text-lg">{name}</h3>

        {/* Time */}
        <p className="text-sm text-gray-500">{time}</p>

        {/* Optional: Star Rating (if you want to match the design) */}
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">★</span>
          <span className="ml-1 text-yellow-500">4.5</span>{" "}
          {/* Example rating */}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
