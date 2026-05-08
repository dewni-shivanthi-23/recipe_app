// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api", // your backend URL
//   withCredentials: false,
// });

// export default api;

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// // ================= AUTH ==================

// export const registerUser = (data) => API.post("/auth/register", data);
// export const loginUser = (data) => API.post("/auth/login", data);

// // ================= RECIPES ==================

// export const getRecipes = () => API.get("/recipes");
// export const addRecipe = (data) =>
//   API.post("/recipes", data, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });

// export const updateRecipe = (id, data) =>
//   API.put(`/recipes/${id}`, data, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });

// export const deleteRecipe = (id) => API.delete(`/recipes/${id}`);

// export default API;

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const API_URL = "http://localhost:5000/api";
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
//export const getMyRecipes = () => API.get("/recipes/my-recipes");

// export const addRecipe = (formData) =>
//   API.post("/recipes", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });

// Add Recipe
export const addRecipe = (data) => API.post("/recipes/add", data);

// Get recipes of logged-in user
export const getMyRecipes = () => API.get("/recipes/my-recipes");

// Get single recipe
export const getRecipeById = (id) => API.get(`/recipes/${id}`);

// Delete recipe by id
// export const deleteRecipe = (id) =>
//   axios.delete(`http://localhost:5000/api/recipes/${id}`);

export const deleteRecipe = (id) => API.delete(`/recipes/${id}`);

// Update recipe by ID
export const updateRecipe = (id, formData) =>
  API.put(`/recipes/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// // Users
// export const getUsers = async () => {
//   const res = await axios.get(`${API_URL}/users`);
//   return res.data;
// };

// // Recipes
// export const getRecipes = async () => {
//   const res = await axios.get(`${API_URL}/recipes`);
//   return res.data;
// };

// change to your backend URL

export const getUsers = async () => {
  const res = await axios.get(`${API_URL}/users`);
  return res.data; // <-- MUST return array
};

export const getRecipes = async () => {
  const res = await axios.get(`${API_URL}/recipes`);
  return res.data;
};

// // PROFILE PICTURE UPLOAD API
// export const uploadProfilePicture = (formData) => {
//   return API.post("/api/users/upload-profile", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

export const uploadProfilePicture = (formData) =>
  API.post("/auth/upload-profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const removeProfilePicture = () => API.delete("/auth/profile/remove");

export const updateUserProfile = (data) => {
  return API.put("/auth/profile", data); // Make sure this route exists in your backend
};

export default API;
