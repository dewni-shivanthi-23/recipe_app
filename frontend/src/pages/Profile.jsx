import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  getMyRecipes,
  deleteRecipe,
  uploadProfilePicture,
  removeProfilePicture,
  updateUserProfile,
} from "../services/api";
// import { FaUser, FaSearch, FaClock, FaRegHeart } from "react-icons/fa";
import {
  FaUser,
  FaSearch,
  FaClock,
  FaRegHeart,
  FaHeart,
  FaTrashAlt,
  FaEdit,
  FaCamera,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

// sample images (replace with your real recipe images)
import recipe1 from "../assets/images/R1.png";
import recipe2 from "../assets/images/R2.png";
import recipe3 from "../assets/images/R3.png";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  //const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("myRecipes");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const [recipes, setRecipes] = useState([]);
  const location = useLocation();

  const [profilePic, setProfilePic] = useState(user?.profilePic || null);
  const fileInputRef = useRef(null);

  const [settingsData, setSettingsData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
  });

  // const recipes = [
  //   { title: "Russian Salad", time: "40 min", img: recipe1 },
  //   { title: "Russian Salad", time: "40 min", img: recipe2 },
  //   { title: "Russian Salad", time: "40 min", img: recipe3 },
  // ];

  const handleSettingsChange = (e) => {
    setSettingsData({ ...settingsData, [e.target.name]: e.target.value });
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call your API to update user profile
      const res = await updateUserProfile(settingsData); // import this function
      setUser(res.data.user); // update context
      //alert("Profile updated successfully!");
      setAlert({
        show: true,
        message: "Profile updated successfully!",
        type: "success",
      });

      // hide alert after 3 seconds
      setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
    } catch (err) {
      console.error("Failed to update profile:", err);
      //alert("Failed to update profile.");

      // show error alert
      setAlert({
        show: true,
        message: "Failed to update profile.",
        type: "error",
      });
      setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
    }
  };

  // Toggle favourite
  const toggleFavourite = (_id) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe._id === _id
          ? { ...recipe, isFavourite: !recipe.isFavourite }
          : recipe,
      ),
    );
  };

  // Filter favourites for the Favourites tab
  const displayedRecipes =
    activeTab === "favourites"
      ? recipes.filter((recipe) => recipe.isFavourite)
      : recipes;

  useEffect(() => {
    loadRecipes();
  }, [location.state]);

  const loadRecipes = async () => {
    try {
      const res = await getMyRecipes();
      setRecipes(res.data); // assume res.data is an array of recipes
    } catch (err) {
      console.error("Error fetching recipes:", err);
    }
  };

  // const handleDelete = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this recipe?")) {
  //     try {
  //       await deleteRecipe(id);
  //       // Remove deleted recipe from state so UI updates
  //       setRecipes(recipes.filter((recipe) => recipe._id !== id));
  //     } catch (err) {
  //       console.error("Failed to delete recipe:", err);
  //     }
  //   }
  // };

  // const handleDelete = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this recipe?")) {
  //     try {
  //       await deleteRecipe(id);
  //       setRecipes(recipes.filter((recipe) => recipe._id !== id)); // removes from UI
  //       alert("Recipe deleted successfully");
  //     } catch (err) {
  //       console.error("Failed to delete recipe:", err);
  //       alert("Failed to delete recipe");
  //     }
  //   }
  // };

  const handleDelete = async () => {
    try {
      await deleteRecipe(deleteId);
      setRecipes(recipes.filter((recipe) => recipe._id !== deleteId));
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Failed to delete recipe:", err);
    }
  };

  // Handle profile picture upload
  const handleProfilePicClick = () => {
    fileInputRef.current.click();
  };

  // const handleFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   // Optional: upload to backend
  //   try {
  //     const formData = new FormData();
  //     formData.append("profilePic", file);
  //     const res = await uploadProfilePicture(formData); // send file to backend
  //     setProfilePic(res.data.url); // assuming backend returns the new image URL

  //     // Update user context if needed
  //     setUser({ ...user, profilePic: res.data.url });
  //   } catch (err) {
  //     console.error("Failed to upload profile picture:", err);
  //   }
  // };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("profilePic", file);

      const res = await uploadProfilePicture(formData);

      const newUrl = res.data.url;

      setProfilePic(newUrl);
      setUser((prev) => ({ ...prev, profilePic: newUrl }));
    } catch (err) {
      console.error("Failed to upload profile picture:", err);
    }
  };

  const handleRemoveProfilePic = async () => {
    try {
      await removeProfilePicture(); // call API

      setProfilePic(null);
      setUser((prev) => ({ ...prev, profilePic: null }));
    } catch (err) {
      console.error("Failed to remove profile picture:", err);
    }
  };

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
          {/* <div
            className="w-40 h-40 bg-white rounded-full border-2 shadow-md flex items-center justify-center text-6xl text-amber-500"
            onClick={handleProfilePicClick}
          >
            {profilePic ? (
              <img
                src={
                  profilePic.startsWith("http")
                    ? profilePic
                    : `http://localhost:5000${profilePic}`
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="ml-13">
                <FaUser />
              </div>
            )} */}
          {/* Camera icon overlay */}
          {/* <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md text-gray-700 hover:bg-gray-200 transition"> */}
          {/* <div
              className="relative w-8 h-10 mt-27 ml- bg-white rounded-full shadow-md flex items-center justify-center text-6xl text-amber-500 cursor-pointer"
              onClick={handleProfilePicClick}
            >
              <FaCamera />
            </div>
          </div> */}

          <div className="relative w-40 h-40">
            {/* Avatar Circle */}
            <div
              className="absolute -bottom-2 -right-2 w-full h-full bg-white rounded-full border-2 shadow-md flex items-center justify-center cursor-pointer  text-amber-500 "
              onClick={handleProfilePicClick}
            >
              {profilePic ? (
                // <img
                //   src={
                //     profilePic.startsWith("http")
                //       ? profilePic
                //       : `http://localhost:5000${profilePic}`
                //   }
                <img
                  src={
                    profilePic.startsWith("http")
                      ? profilePic
                      : `http://localhost:5000${profilePic}`
                  }
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <FaUser className="text-amber-500 text-6xl" />
              )}
            </div>

            {/* Camera Icon OUTSIDE the circle */}
            {profilePic ? (
              // Show Trash Icon if profile picture exists
              <div
                onClick={handleRemoveProfilePic}
                className="absolute -bottom-3 -right-1 
     bg-white p-2 rounded-full shadow-lg text-red-600 
     hover:bg-red-100 transition cursor-pointer"
              >
                <FaTrashAlt className="text-xl" />
              </div>
            ) : (
              // Show Camera Icon if NO profile picture

              <div
                onClick={handleProfilePicClick}
                className="absolute -bottom-3 -right-1
               bg-white p-2 rounded-full shadow-lg text-amber-500 
               hover:bg-gray-100 transition cursor-pointer"
              >
                <FaCamera className="text-xl" />
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          <p className="mt-4 text-gray-700 font-medium">
            {" "}
            {user?.email || "No Email"}
          </p>

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
          {activeTab !== "settings" && (
            <div className="grid grid-cols-3 gap-6 mt-8 mb-10 ">
              {displayedRecipes.map((recipe) => (
                <div
                  key={recipe._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden border transform transition-all duration-300 ease-out 
             hover:shadow-xl hover:-translate-y-2 hover:scale-[1.05] 
             cursor-pointer z-10"
                >
                  <img
                    //src={recipe.image}
                    src={`http://localhost:5000${recipe.image}`}
                    alt={recipe.title}
                    className="w-full h-40 object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">
                      <Link to={`/recipe/${recipe._id}`}> {recipe.title}</Link>
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
                        <FaClock /> 40 min
                      </span>
                      {/* <span className="flex items-center gap-1 cursor-pointer">
                      <FaRegHeart />
                    </span> */}
                      <div className="flex items-center gap-4 text-lg">
                        {/* <FaRegHeart className="cursor-pointer hover:text-amber-500" /> */}
                        {/* <FaEdit className="cursor-pointer hover:text-blue-500" /> */}
                        <span
                          className="flex items-center gap-1 cursor-pointer text-amber-500"
                          onClick={() => toggleFavourite(recipe._id)}
                        >
                          {recipe.isFavourite ? <FaHeart /> : <FaRegHeart />}
                        </span>
                        <Link to={`/edit-recipe/${recipe._id}`}>
                          <FaEdit className="cursor-pointer hover:text-blue-500" />
                        </Link>
                        <FaTrashAlt
                          className="cursor-pointer hover:text-red-500"
                          // onClick={() => handleDelete(recipe._id)}
                          onClick={() => {
                            setDeleteId(recipe._id);
                            setShowDeleteModal(true);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {activeTab === "favourites" && displayedRecipes.length === 0 && (
                <p className="text-gray-500 col-span-3 text-center mt-10">
                  No favourite recipes yet.
                </p>
              )}
            </div>
          )}

          {/* Settings Form */}
          {activeTab === "settings" && (
            <div className="mt-2 ml-7 pb-6 max-w-xl mx-auto">
              {alert.show && (
                <div
                  className={`mb-4 px-6 py-3 rounded shadow-lg text-white font-medium transition-all
          ${alert.type === "success" ? "bg-green-400" : "bg-red-500"}`}
                >
                  {alert.message}
                </div>
              )}
              <form
                className="flex flex-col gap-6"
                onSubmit={handleSettingsSubmit}
              >
                {/* Username */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-500 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={settingsData.username}
                    onChange={handleSettingsChange}
                    className="border border-amber-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-500 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={settingsData.email}
                    onChange={handleSettingsChange}
                    className="border border-amber-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-500 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={settingsData.password}
                    onChange={handleSettingsChange}
                    placeholder="Enter new password"
                    className="border border-amber-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    type="submit"
                    className="bg-amber-500 text-white px-6 py-2 rounded-md hover:bg-amber-600 transition"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSettingsData({
                        username: user.username,
                        email: user.email,
                        password: "",
                      })
                    }
                    className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          {/* Optional slight blur behind the modal */}
          <div className="absolute inset-0 backdrop-blur-sm pointer-events-none"></div>

          {/* Modal box */}
          <div className="bg-white rounded-lg shadow-2xl p-6 w-80 animate-scaleUp pointer-events-auto border-2 border-red-600">
            <h2 className="text-lg font-bold text-gray-800">Delete Recipe?</h2>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to delete this recipe? This action cannot be
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
                onClick={handleDelete}
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

export default Profile;
