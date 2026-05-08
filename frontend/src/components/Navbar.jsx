import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import chefLogo from "../assets/images/logo.jpg"; // adjust path if needed
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // clear user context
    localStorage.removeItem("user"); // if you store user in localStorage
    navigate("/login"); // redirect to login page
  };

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={chefLogo} alt="Chef Hat" className="w-9 h-9" />
          <Link to="/" className="text-xl font-semibold text-gray-800">
            Recipe<span className="text-amber-500">Vault</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 overflow-hidden shadow-sm">
          <select className="text-sm text-gray-700 bg-gray-50 px-3 py-2 focus:outline-none">
            <option>All Categories</option>
            <option>Italian</option>
            <option>Indian</option>
            <option>Chinese</option>
            <option>Mexican</option>
          </select>

          {/* Search Input + Icon */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search for recipes..."
              className="px-3 py-2 w-64 bg-gray-50 text-sm text-gray-600 focus:outline-none"
            />
            {/* <button className="px-3 py-2 text-amber-500 hover:text-amber-600 transition">
              <FaSearch />
            </button> */}
            <button className="bg-amber-500 px-4 py-2 text-white hover:bg-amber-600 transition">
              <FaSearch className="text-lg" />
            </button>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-amber-600 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/search" className="hover:text-amber-600 transition">
              Explore
            </Link>
          </li>
          <li>
            <Link to="/help" className="hover:text-amber-600 transition">
              Help
            </Link>
          </li>
          {/* <li>
            <Link
              to="/login"
              className="bg-amber-500 text-white px-5 py-2 rounded-md hover:bg-amber-600 transition"
            >
              Login
            </Link>
          </li> */}
          <li>
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-amber-600 text-white px-5 py-2 rounded-md hover:bg-amber-600 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-amber-500 text-white px-5 py-2 rounded-md hover:bg-amber-600 transition"
              >
                Login
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-gray-700"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-white border-t shadow-md space-y-3 py-4 text-center text-gray-700 font-medium">
          <li>
            <Link onClick={() => setIsOpen(false)} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link onClick={() => setIsOpen(false)} to="/explore">
              Explore
            </Link>
          </li>
          <li>
            <Link onClick={() => setIsOpen(false)} to="/help">
              Help
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setIsOpen(false)}
              to="/login"
              className="bg-amber-500 text-white px-4 py-2 rounded-md inline-block"
            >
              Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
