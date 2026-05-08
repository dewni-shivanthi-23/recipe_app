// import React from "react";
// import bgImg from "../../assets/images/login.jpg";
// import { Link } from "react-router-dom";

// const Register = () => {
//   return (
//     <div
//       className="w-full h-screen bg-cover bg-center flex justify-center items-center px-6 -mt-[90px]"
//       style={{ backgroundImage: `url(${bgImg})` }}
//     >
//       {/* Form Box */}
//       <div className="bg-white/85 backdrop-blur-md p-10 rounded-xl shadow-xl w-full max-w-md mt-30">
//         <h1 className="text-3xl font-semibold text-center mb-8">
//           Create <span className="text-orange-500">Account</span>
//         </h1>

//         <div className="space-y-4">
//           <input
//             type="text"
//             placeholder="Username"
//             className="w-full border border-orange-300 p-3 rounded-lg focus:outline-none"
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full border border-orange-300 p-3 rounded-lg focus:outline-none"
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full border border-orange-300 p-3 rounded-lg focus:outline-none"
//           />

//           <button className="w-full bg-orange-400 text-white p-3 rounded-lg mt-4 hover:bg-orange-500 transition">
//             Sign up
//           </button>
//         </div>

//         <p className="mt-4 text-sm text-center">
//           Already have an Account?{" "}
//           {/* <span className="text-orange-500 cursor-pointer">Sign In</span> */}
//           <Link
//             to="/login"
//             className="text-amber-500 cursor-pointer hover:underline"
//           >
//             Sign In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

// import React, { useState } from "react";
// import bgImg from "../../assets/images/login.jpg";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/register", // your backend endpoint
//         formData
//       );

//       console.log(response.data); // you can store token in localStorage if needed
//       navigate("/login"); // redirect after successful registration
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="w-full h-screen bg-cover bg-center flex justify-center items-center px-6 -mt-[90px]"
//       style={{ backgroundImage: `url(${bgImg})` }}
//     >
//       {/* Form Box */}
//       <div className="bg-white/85 backdrop-blur-md p-10 rounded-xl shadow-xl w-full max-w-md mt-30">
//         <h1 className="text-3xl font-semibold text-center mb-8">
//           Create <span className="text-orange-500">Account</span>
//         </h1>

//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Username"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border border-orange-300 p-3 rounded-lg focus:outline-none"
//             required
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border border-orange-300 p-3 rounded-lg focus:outline-none"
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full border border-orange-300 p-3 rounded-lg focus:outline-none"
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-orange-400 text-white p-3 rounded-lg mt-4 hover:bg-orange-500 transition"
//             disabled={loading}
//           >
//             {loading ? "Signing up..." : "Sign up"}
//           </button>
//         </form>

//         <p className="mt-4 text-sm text-center">
//           Already have an Account?{" "}
//           <Link
//             to="/login"
//             className="text-amber-500 cursor-pointer hover:underline"
//           >
//             Sign In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import bgImg from "../../assets/images/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      setSuccess(response.data.message); // show success message
      setFormData({ name: "", email: "", password: "" });

      // Optional: redirect after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex justify-center items-center px-6 -mt-[90px]"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Form Box */}
      <div className="bg-white/85 backdrop-blur-md p-10 rounded-xl shadow-xl w-full max-w-md mt-30">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Create <span className="text-orange-500">Account</span>
        </h1>

        {/* Success Alert */}
        {success && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-green-100 border border-green-400 text-green-700">
            {success}
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-100 border border-red-400 text-red-700">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-orange-300 p-3 rounded-lg focus:outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-orange-300 p-3 rounded-lg focus:outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-orange-300 p-3 rounded-lg focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-400 text-white p-3 rounded-lg mt-4 hover:bg-orange-500 transition"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an Account?{" "}
          <Link
            to="/login"
            className="text-amber-500 cursor-pointer hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
