import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminRecipes = () => {
  // const recipes = [
  //   { id: "R001", title: "Italian", category: "Italian", uploaded: "Dewni" },
  //   { id: "R001", title: "Italian", category: "Italian", uploaded: "Dewni" },
  //   { id: "R001", title: "Italian", category: "Italian", uploaded: "Dewni" },
  //   { id: "R001", title: "Italian", category: "Italian", uploaded: "Dewni" },
  // ];

  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Generate recipe-friendly ID like R001
  const formatRecipeId = (index) =>
    `R${(index + 1).toString().padStart(3, "0")}`;

  // Fetch recipes & users
  const fetchData = async () => {
    try {
      const recipesRes = await axios.get("http://localhost:5000/api/recipes");
      const usersRes = await axios.get("http://localhost:5000/api/users");

      setRecipes(recipesRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete recipe
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/${deleteId}`);
      setRecipes(recipes.filter((r) => r._id !== deleteId));
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Failed to delete recipe:", err);
    }
  };

  // Search handler
  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  // Filtered & sorted recipes
  let displayedRecipes = [...recipes];

  // Apply search filter
  if (searchQuery.trim() !== "") {
    displayedRecipes = displayedRecipes.filter(
      (r) =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Apply filter
  if (filter === "top") {
    displayedRecipes.sort((a, b) => b.likes - a.likes); // assuming you have a likes field
  } else if (filter === "new") {
    displayedRecipes.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  // Get uploader name from users list
  const getUploaderName = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.name : "Unknown";
  };

  return (
    <div className="flex w-full h-screen bg-white -mt-[20px]">
      {/* =============== SIDEBAR =============== */}
      {/* <div className="w-64 bg-[#1E1E1E] text-gray-300 flex flex-col py-6">
        <h1 className="text-2xl font-semibold text-white px-6 mb-10">
          Recipe<span className="text-amber-500">Vault</span>
        </h1>

        <div className="space-y-2">
          <p className="px-6 py-2 hover:bg-gray-700 cursor-pointer">
            Dashboard
          </p>
          <p className=" hover:bg-gray-700 px-6 py-2 cursor-pointer">Users</p>
          <p className="bg-gray-700 px-6 py-2 ursor-pointer">Recipes</p>
          <p className="px-6 py-2 hover:bg-gray-700 cursor-pointer">Settings</p>
        </div>
      </div> */}

      <div className="w-64 bg-[#1E1E1E] text-gray-300 flex flex-col py-6">
        <h1 className="text-2xl font-semibold text-white px-6 mb-10">
          Recipe<span className="text-amber-500">Vault</span>
        </h1>

        <div className="space-y-6">
          <Link
            to="/dashboard"
            className="block px-6 py-2 hover:bg-gray-700 cursor-pointer"
          >
            Dashboard
          </Link>

          <Link
            to="/users"
            // className="block bg-gray-700 px-6 py-2 cursor-pointer"
            className="block px-6 py-2 hover:bg-gray-700 cursor-pointer"
          >
            Users
          </Link>

          <Link
            to="/recipes"
            className="block px-6 py-2 hover:bg-gray-700 cursor-pointer"
          >
            Recipes
          </Link>

          <Link
            to="/settings"
            className="block px-6 py-2 hover:bg-gray-700 cursor-pointer"
          >
            Settings
          </Link>
        </div>
      </div>

      {/* =============== MAIN CONTENT =============== */}
      <div className="flex-1 p-10">
        {/* Title */}
        <h2 className="text-3xl font-semibold">
          All <span className="text-amber-500">Recipes</span>
        </h2>

        {/* Search Section */}
        <div className="flex justify-end mt-6">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <select
              className="bg-gray-100 px-3 py-2 outline-none text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Recipes</option>
              <option value="top">Top Recipes</option>
              <option value="new">New Recipes</option>
            </select>

            <input
              type="text"
              placeholder="Search for Recipes..."
              className="px-3 py-2 text-sm outline-none"
              value={searchInput || ""}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <button className="bg-amber-500 p-2" onClick={handleSearch}>
              <FiSearch className="text-white" size={18} />
            </button>
          </div>
        </div>

        {/* =============== USERS TABLE =============== */}
        <div className="mt-10">
          {/* Table Header */}
          <div className="grid grid-cols-5 font-semibold text-gray-600 py-2 border-b">
            <p>Recipe ID</p>
            <p>Title</p>
            <p>Category</p>
            <p>Uploaded By</p>
            <p className="pl-8">Action</p>
          </div>

          {/* Table Rows */}
          {displayedRecipes.map((recipes, index) => (
            <div
              key={recipes._id}
              className="grid grid-cols-5 py-3 text-gray-700 border-b"
            >
              <p>{formatRecipeId(index)}</p>
              <p>{recipes.title}</p>
              <p className="truncate w-40">{recipes.category}</p>
              <p>{getUploaderName(recipes.userId)}</p>

              <button
                className="bg-red-500 w-32 text-white px-5 py-2 rounded-md hover:bg-red-500 transition"
                onClick={() => {
                  setDeleteId(recipe._id);
                  setShowDeleteModal(true);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        {/* DELETE MODAL */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 backdrop-blur-sm pointer-events-none"></div>

            <div className="bg-white rounded-lg shadow-2xl p-6 w-80 z-50 border-2 border-red-600 animate-scaleUp">
              <h2 className="text-lg font-bold text-gray-800">
                Delete Recipe?
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Are you sure you want to delete this recipe? This action cannot
                be undone.
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRecipes;
