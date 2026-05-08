import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaSearch, FaClock, FaHeart } from "react-icons/fa";

// sample images (replace with your real recipe images)
import recipe1 from "../assets/images/R1.png";
import recipe2 from "../assets/images/R2.png";
import recipe3 from "../assets/images/R3.png";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("myRecipes");

  const recipes = [
    { title: "Russian Salad", time: "40 min", img: recipe1 },
    { title: "Russian Salad", time: "40 min", img: recipe2 },
    { title: "Russian Salad", time: "40 min", img: recipe3 },
  ];

  return (
    <div className="pt-20 -mt-[100px]">
      {/* TOP ORANGE HEADER */}
      <div className="bg-amber-500 h-40 flex items-center px-35 pb-8">
        <h1 className="text-3xl font-bold text-white">User Profile</h1>
      </div>

      {/* USER SECTION */}
      <div className="flex px-10 mt-[-50px]">
        {/* LEFT USER DETAILS */}
        <div className="w-1/4 flex flex-col items-center">
          {/* Avatar circle */}
          <div className="w-40 h-40 bg-white rounded-full border-2 shadow-md flex items-center justify-center text-6xl text-amber-500">
            <FaUser />
          </div>

          <p className="mt-4 text-gray-700 font-medium">User@gmail.com</p>

          <button className="bg-amber-500 text-white px-6 py-2 rounded-md mt-4 hover:bg-amber-600 transition">
            Edit Profile
          </button>
        </div>

        {/* RIGHT CONTENT SECTION */}
        <div className="w-3/4 pl-10">
          {/* TABS */}
          <div className="flex space-x-10 pb-2">
            <button
              onClick={() => setActiveTab("myRecipes")}
              className={`pb-2 font-medium ${
                activeTab === "myRecipes"
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-gray-600"
              }`}
            >
              My Recipes
            </button>

            <button
              onClick={() => setActiveTab("favourites")}
              className={`pb-2 font-medium ${
                activeTab === "favourites"
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-gray-600"
              }`}
            >
              Favourites
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`pb-2 font-medium ${
                activeTab === "settings"
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-gray-600"
              }`}
            >
              Setting
            </button>
          </div>

          {/* SEARCH + FILTER + ADD BUTTON */}
          {/* <div className="flex justify-between items-center mt-6"> */}
          {/* Left: category + search */}
          {/* <div className="flex items-center space-x-3">
              <select className="border px-3 py-2 rounded-md text-gray-600">
                <option>All Categories</option>
                <option>Italian</option>
                <option>Indian</option>
                <option>Chinese</option>
              </select>

              <div className="flex items-center border px-3 py-2 rounded-md">
                <input
                  type="text"
                  placeholder="Search for recipes..."
                  className="focus:outline-none text-sm"
                />
                <FaSearch className="ml-2 text-gray-600" />
              </div>
            </div> */}

          {/* Add Recipe Button */}
          {/* <Link
              to="/add-recipe"
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
            >
              + Add Recipe
            </Link>
          </div> */}

          <div className="flex justify-end items-center mt-6">
            {/* Add Recipe Button */}
            <Link
              to="/add-recipe"
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
            >
              + Add Recipe
            </Link>
          </div>

          {/* Recipes Grid */}
          <div className="grid grid-cols-3 gap-6 mt-8 mb-10">
            {recipes.map((recipe, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden border"
              >
                <img
                  src={recipe.img}
                  alt={recipe.title}
                  className="w-full h-40 object-cover"
                />

                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">
                    {recipe.title}
                  </h3>

                  {/* <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <FaClock /> {recipe.time}
                    </span>
                    <span className="flex items-center gap-1 cursor-pointer">
                      <FaRegHeart />
                    </span>
                  </div> */}
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <FaClock /> {recipe.time}
                    </span>
                    <span className="flex items-center gap-1 cursor-pointer">
                      <FaHeart />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
