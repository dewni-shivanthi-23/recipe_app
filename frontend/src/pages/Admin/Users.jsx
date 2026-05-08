import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getUsers, getRecipes } from "../../services/api";
import axios from "axios";

const AdminUsers = () => {
  // const users = [
  //   { id: "001", name: "Dewni", email: "dewni@gmail.com", recipes: 10 },
  //   { id: "001", name: "Dewni", email: "dewni@gmail.com", recipes: 10 },
  //   { id: "001", name: "Dewni", email: "dewni@gmail.com", recipes: 10 },
  //   { id: "001", name: "Dewni", email: "dewni@gmail.com", recipes: 10 },
  // ];

  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // what user types
  const [searchQuery, setSearchQuery] = useState(""); // applied search
  const [filter, setFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Generate user-friendly ID like U001
  const formatUserId = (index) => `U${(index + 1).toString().padStart(3, "0")}`;

  // Fetch users & recipes
  const fetchData = async () => {
    try {
      const usersRes = await axios.get("http://localhost:5000/api/users");
      const recipesRes = await axios.get("http://localhost:5000/api/recipes");

      setUsers(usersRes.data);
      setRecipes(recipesRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${deleteId}`);
      setUsers(users.filter((u) => u._id !== deleteId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  // Filtered and sorted users
  let displayedUsers = [...users];

  // Apply search filter
  if (searchQuery.trim() !== "") {
    displayedUsers = displayedUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Apply sorting filter
  if (filter === "top") {
    displayedUsers.sort(
      (a, b) =>
        recipes.filter((r) => r.userId === b._id).length -
        recipes.filter((r) => r.userId === a._id).length
    );
  } else if (filter === "new") {
    displayedUsers.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }
  // let displayedUsers = [...users];

  // // Search by name or email
  // if (search.trim() !== "") {
  //   displayedUsers = displayedUsers.filter(
  //     (u) =>
  //       u.name.toLowerCase().includes(search.toLowerCase()) ||
  //       u.email.toLowerCase().includes(search.toLowerCase())
  //   );
  // }

  // // Sorting
  // if (filter === "top") {
  //   displayedUsers.sort(
  //     (a, b) =>
  //       recipes.filter((r) => r.userId === b._id).length -
  //       recipes.filter((r) => r.userId === a._id).length
  //   );
  // } else if (filter === "new") {
  //   displayedUsers.sort(
  //     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  //   );
  // }

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
          <p className="bg-gray-700 px-6 py-2 cursor-pointer">Users</p>
          <p className="px-6 py-2 hover:bg-gray-700 cursor-pointer">Recipes</p>
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
          Registered <span className="text-amber-500">Users</span>
        </h2>

        {/* Search Section */}
        <div className="flex justify-end mt-4">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <select
              className="bg-gray-100 px-3 py-2 outline-none text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Users</option>
              <option value="top">Top Creators</option>
              <option value="new">New Users</option>
            </select>

            <input
              type="text"
              placeholder="Search for users..."
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
            <p>User ID</p>
            <p>Name</p>
            <p>Email</p>
            <p>Recipes</p>
            <p className="pl-8">Action</p>
          </div>

          {/* Table Rows */}
          {displayedUsers.map((user, index) => (
            <div
              key={user._id}
              className="grid grid-cols-5 py-3 text-gray-700 border-b"
            >
              <p>{formatUserId(index)}</p>
              <p>{user.name}</p>
              <p className="truncate w-40">{user.email}</p>
              <p>{recipes.filter((r) => r.userId === user._id).length}</p>

              {/* <button className="bg-red-500 text-white px-1 py-1 rounded-md text-sm hover:bg-red-600"> */}
              <button
                className="bg-red-500 w-32 text-white px-5 py-2 rounded-md hover:bg-red-500 transition"
                // onClick={() => handleDelete(user._id)}
                onClick={() => {
                  setDeleteId(user._id);
                  setShowDeleteModal(true);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div> */}
          {/* Optional slight blur behind the modal */}
          <div className="absolute inset-0 backdrop-blur-sm pointer-events-none"></div>

          <div className="bg-white rounded-lg shadow-2xl p-6 w-80 z-50 border-2 border-red-600 animate-scaleUp">
            <h2 className="text-lg font-bold text-gray-800">Delete User?</h2>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to delete this user? This action cannot be
              undone.
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
  );
};

export default AdminUsers;
