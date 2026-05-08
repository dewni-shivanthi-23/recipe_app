import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import RecipeDetails from "../pages/RecipeDetails";
import AddRecipe from "../pages/AddRecipe";
import EditRecipe from "../pages/EditRecipe";
import Search from "../pages/Search";
import Profile from "../pages/Profile";
import Setting from "../pages/Setting";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Admin/Dashboard";
import Users from "../pages/Admin/Users";
import Recipes from "../pages/Admin/Recipes";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import Help from "../pages/Help";

export default function AppRouter() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
          {/* <Route path="/recipe_details" element={<RecipeDetails />} /> */}
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/users" element={<Users />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/help" element={<Help />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <UserRoute>
                <Profile />
              </UserRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
