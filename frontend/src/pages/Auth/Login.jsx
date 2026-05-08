// import React from "react";
// import bgImg from "../../assets/images/reg3.jpeg";
// import { Link } from "react-router-dom";

// const Login = () => {
//   return (
//     <div
//       className="w-full h-screen bg-cover bg-center flex justify-center items-center px-6 -mt-[90px]"
//       style={{ backgroundImage: `url(${bgImg})` }}
//     >
//       {/* Form Box */}
//       <div className="bg-white/85 backdrop-blur-md p-10 rounded-xl shadow-xl w-full max-w-md mt-30 -ml-7">
//         <h1 className="text-3xl font-semibold text-center mb-8">
//           Welcome <span className="text-amber-500">Back !</span>
//         </h1>

//         <div className="space-y-4">
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
//             Login
//           </button>
//         </div>

//         <p className="mt-4 text-sm text-center">
//           Haven't any Account?{" "}
//           {/* <span className="text-orange-500 cursor-pointer">Register</span> */}
//           <Link
//             to="/register"
//             className="text-orange-500 cursor-pointer hover:underline"
//           >
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import bgImg from "../../assets/images/reg3.jpeg";
// import { loginUser } from "../../services/api";
// import { AuthContext } from "../../context/AuthContext";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await loginUser({ email, password });

//       login(res.data.user, res.data.token); // save token + user in context

//       alert("Login successful!");
//       navigate("/profile"); // redirect home
//     } catch (error) {
//       alert(error.response?.data?.message || "Something went wrong!");
//     }
//   };

//   return (
//     <div
//       className="w-full h-screen bg-cover bg-center flex justify-center items-center px-6 -mt-[90px]"
//       style={{ backgroundImage: `url(${bgImg})` }}
//     >
//       <div className="bg-white/85 backdrop-blur-md p-10 rounded-xl shadow-xl w-full max-w-md mt-30 -ml-7">
//         <h1 className="text-3xl font-semibold text-center mb-8">
//           Welcome <span className="text-amber-500">Back!</span>
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full border border-orange-300 p-3 rounded-lg"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full border border-orange-300 p-3 rounded-lg"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
//             type="submit"
//             className="w-full bg-orange-400 text-white p-3 rounded-lg mt-4 hover:bg-orange-500"
//           >
//             Login
//           </button>
//         </form>

//         <p className="mt-4 text-sm text-center">
//           Haven't any account?{" "}
//           <Link to="/register" className="text-orange-500 hover:underline">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImg from "../../assets/images/reg3.jpeg";
import { loginUser } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await loginUser({ email, password });

      login(res.data.user, res.data.token); // save token + user in context

      if (res.data.user.role === "admin") {
        setSuccess("Admin Login successful!");
        setEmail("");
        setPassword("");
        navigate("/dashboard");
      } else {
        setSuccess("Login successful!");
        setEmail("");
        setPassword("");
        navigate("/profile");
      }
      // redirect after 1.5s
      // setTimeout(() => {
      //   navigate("/profile");
      // }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await loginUser({ email, password });

  //     login(res.data.user, res.data.token);

  //     if (res.data.user.role === "admin") {
  //       alert("Admin Login Successful");
  //       navigate("/admin/dashboard"); // 👈 redirect admin
  //     } else {
  //       alert("User Login Successful");
  //       navigate("/profile"); // 👈 redirect normal user
  //     }
  //   } catch (error) {
  //     alert(error.response?.data?.message || "Login failed");
  //   }
  // };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex justify-center items-center px-6 -mt-[90px]"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="bg-white/85 backdrop-blur-md p-10 rounded-xl shadow-xl w-full max-w-md mt-30 -ml-7">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Welcome <span className="text-amber-500">Back!</span>
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-orange-300 p-3 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-orange-300 p-3 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-400 text-white p-3 rounded-lg mt-4 hover:bg-orange-500"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Haven't any account?{" "}
          <Link to="/register" className="text-orange-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
