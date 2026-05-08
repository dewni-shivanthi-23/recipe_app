import React, { useEffect, useState } from "react";
import { getUsers, getRecipes } from "../../services/api";
import { Link } from "react-router-dom";
import headerImg from "../../assets/images/dash4.jpg";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

/**
 * Dashboard.jsx
 * Single-file dashboard with:
 * - Top stat cards
 * - Recipe Categories pie chart
 * - Recipes added per month bar chart
 * - Registered users table
 * - Top 5 recipes table
 *
 * NOTE: This uses the uploaded image path directly. Your environment will
 * need to serve that path or you can replace headerImg with a relative import:
 * import headerImg from "../assets/images/your-image.png"
 */
// const headerImg = "../../assets/images/hero.jpg";

/* Data used to render charts/tables — adjust as needed */
// const stats = [
//   { title: "Total Users", value: 150, to: "/users" },
//   { title: "Total Recipes", value: 320, to: "/recipes" },
//   { title: "Total Reports", value: 85, to: "/reports" },
//   { title: "Categories", value: 10, to: "/categories" },
// ];

// const pieData = [
//   { name: "Sri Lankan", value: 40 },
//   { name: "Italian", value: 25 },
//   { name: "Traditional", value: 20 },
//   { name: "Indian", value: 15 },
// ];

// const pieColors = ["#F59E0B", "#3B82F6", "#F97316", "#10B981"];

// const monthlyData = [
//   { month: "Jan", recipes: 12 },
//   { month: "Feb", recipes: 18 },
//   { month: "Mar", recipes: 25 },
//   { month: "Apr", recipes: 22 },
//   { month: "May", recipes: 28 },
//   { month: "Jun", recipes: 30 },
//   { month: "Jul", recipes: 26 },
//   { month: "Aug", recipes: 31 },
//   { month: "Sep", recipes: 29 },
//   { month: "Oct", recipes: 34 },
//   { month: "Nov", recipes: 38 },
//   { month: "Dec", recipes: 40 },
// ];

// const registeredUsers = [
//   { id: "001", name: "Dewni", email: "dewni@gmail.com", recipes: 10 },
//   { id: "002", name: "Amandi", email: "amandi@gmail.com", recipes: 12 },
//   { id: "003", name: "Kamal", email: "kamal@example.com", recipes: 7 },
// ];

// const topRecipes = [
//   { id: "R001", title: "Italian", category: "Italian", uploadedBy: "Dewni" },
//   {
//     id: "R002",
//     title: "Sri Lankan",
//     category: "Sri Lankan",
//     uploadedBy: "Amandi",
//   },
//   {
//     id: "R003",
//     title: "Fried Rice",
//     category: "Traditional",
//     uploadedBy: "Kamal",
//   },
//   { id: "R004", title: "Noodles", category: "Asian", uploadedBy: "Nisha" },
//   {
//     id: "R005",
//     title: "Pastry Delight",
//     category: "Bakery",
//     uploadedBy: "Emili",
//   },
// ];

// const StatCard = ({ title, value }) => (
//   <div className="bg-white rounded-xl shadow p-5 flex-1 min-w-[160px]">
//     <p className="text-m text-500">{title}</p>
//     <p className="text-3xl font-bold mt-2 text-amber-500">{value}</p>
//   </div>
// );

// const StatCard = ({ title, value }) => (
//   <div className="bg-white border border-amber-500 rounded-xl shadow p-7 flex flex-col items-center justify-center flex-1 min-w-[160px] text-center">
//     <p className="text-m text-500">{title}</p>
//     <p className="text-3xl font-bold mt-1 text-amber-500">{value}</p>
//   </div>
// );

const StatCard = ({ title, value, to }) => (
  <Link
    to={to}
    className="bg-white border border-amber-500 rounded-xl shadow p-7
               flex flex-col items-center justify-center flex-1 min-w-[160px]
               text-center cursor-pointer transform transition-all duration-300 ease-out 
             hover:shadow-xl hover:-translate-y-2 hover:scale-[1.06] 
             cursor-pointer z-10"
  >
    <p className="text-m text-500">{title}</p>
    <p className="text-3xl font-bold mt-1 text-amber-500">{value}</p>
  </Link>
);

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        const recipesData = await getRecipes();

        setUsers(usersData);
        setRecipes(recipesData);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  // Pie chart: count recipes by category
  const pieData = Object.entries(
    recipes.reduce((acc, r) => {
      acc[r.category] = (acc[r.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const pieColors = [
    "#F59E0B",
    "#3B82F6",
    "#F97316",
    "#10B981",
    "#8B5CF6",
    "#EC4899",
  ];

  // Bar chart: recipes added per month
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(0, i).toLocaleString("default", { month: "short" });
    const count = recipes.filter(
      (r) => new Date(r.createdAt).getMonth() === i
    ).length;
    return { month, recipes: count };
  });

  // Top 5 recipes
  const topRecipes = recipes.slice(0, 5);

  const stats = [
    { title: "Total Users", value: users.length, to: "/users" },
    { title: "Total Recipes", value: recipes.length, to: "/recipes" },
    {
      title: "Categories",
      value: new Set(recipes.map((r) => r.category)).size,
      to: "/categories",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER / HERO */}
      <div
        className="w-full h-56 md:h-64 lg:h-125 bg-cover bg-center rounded-b-xl -mt-[20px]"
        style={{
          backgroundImage: `url(${headerImg})`,
        }}
      >
        <div className="w-full h-full rounded-b-xl flex items-center">
          <div className="max-w-7xl mx-auto px-6">
            {/* <div className="flex items-center justify-between py-6">
              <div className="flex items-center gap-3">
                <div className="bg-white/30 p-2 rounded-full">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M3 12h18" stroke="#fff" strokeWidth="1.5" />
                    <path
                      d="M3 6h18"
                      stroke="#fff"
                      strokeWidth="1.5"
                      opacity="0.6"
                    />
                    <path
                      d="M3 18h18"
                      stroke="#fff"
                      strokeWidth="1.5"
                      opacity="0.6"
                    />
                  </svg>
                </div>
                <h1 className="text-white text-xl md:text-2xl font-semibold">
                  RecipeVault
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <input
                  className="hidden md:block px-3 py-2 rounded-md border bg-white/90 text-sm w-72"
                  placeholder="Search recipes..."
                />
                <button className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-md text-sm">
                  Search
                </button>
              </div>
            </div>*/}

            <div className="mt-5 ml-100 text-white">
              <h2 className="text-3xl md:text-5xl font-bold">Let's Get Into</h2>
              <br />
              <p className="text-amber-500 text-3xl md:text-6xl font-extrabold">
                Cooking!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* STATS ROW */}
        {/* <div className="flex flex-col md:flex-row gap-4">
          {stats.map((s, i) => (
            <StatCard key={i} title={s.title} value={s.value} />
          ))}
        </div> */}
        <div className="flex flex-col md:flex-row gap-4">
          {stats.map((s, i) => (
            <StatCard key={i} title={s.title} value={s.value} to={s.to} />
          ))}
        </div>

        {/* Charts + Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          {/* Left: Pie (categories) */}
          <div className="bg-white rounded-xl pt-8  pl-10 pb-6 shadow  border border-amber-500 ">
            <h3 className="text-2xl font-semibold mb-4">
              Recipe <span className="text-amber-500">Categories</span>
            </h3>
            <br />
            <div className="flex items-center gap-6">
              <div style={{ width: 220, height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={80}
                      innerRadius={40}
                      paddingAngle={3}
                      label={(entry) => `${entry.name}`}
                    >
                      {pieData.map((entry, idx) => (
                        <Cell
                          key={`cell-${idx}`}
                          fill={pieColors[idx % pieColors.length]}
                        />
                      ))}
                    </Pie>
                    <ReTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex-1">
                <ul className="space-y-3">
                  {pieData.map((p, idx) => (
                    <li key={p.name} className="flex items-center gap-3">
                      <span
                        className="w-3 h-3 rounded"
                        style={{
                          background: pieColors[idx % pieColors.length],
                        }}
                      />
                      <div>
                        <div className="text-sm font-medium">{p.name}</div>
                        <div className="text-xs text-gray-500">
                          {p.value} recipes
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Middle: Bar chart */}
          <div className="lg:col-span-2 bg-white rounded-xl pt-8  pl-7 pb-6 shadow  border border-amber-500 ">
            <h3 className="text-2xl font-semibold mb-4 ">
              Recipes Added <span className="text-amber-500">per Month</span>
            </h3>
            <br />
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="recipes" radius={[6, 6, 0, 0]} fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* TABLES ROW */}
        <div className="grid grid-cols-1 gap-6 ">
          {/* Registered Users */}
          <div className="bg-white rounded-xl pt-8  pl-10 pb-6 shadow border border-amber-500 ">
            <h3 className="text-2xl font-semibold mb-4">
              Registered <span className="text-amber-500">Users</span>
            </h3>
            <br />
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-m text-gray-500">
                    <th className="pb-3">User ID</th>
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Recipes</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={u._id} className="border-t">
                      <td className="py-3 text-m">{`U${String(i + 1).padStart(
                        3,
                        "0"
                      )}`}</td>
                      <td className="py-3 text-m font-medium">{u.name}</td>
                      <td className="py-3 text-m text-gray-600">{u.email}</td>
                      <td className="py-3 text-m">
                        {recipes.filter((r) => r.userId === u._id).length}
                      </td>
                      {/* <td className="py-3 text-m">{u.recipes}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top 5 Recipes */}
          <div className="bg-white rounded-xl pt-8  pl-10 pb-6 shadow border border-amber-500 ">
            <h3 className="text-2xl font-semibold mb-4">
              Top 5 <span className="text-amber-500">Recipes</span>
            </h3>
            <br />
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-m text-gray-500">
                    <th className="pb-3">Recipe ID</th>
                    <th className="pb-3">Title</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Uploaded By</th>
                  </tr>
                </thead>
                <tbody>
                  {recipes.map((r, i) => (
                    <tr key={r._id} className="border-t">
                      <td className="py-3 text-m">{`R${String(i + 1).padStart(
                        3,
                        "0"
                      )}`}</td>
                      <td className="py-3 text-m font-medium">{r.title}</td>
                      <td className="py-3 text-m text-gray-600">
                        {r.category}
                      </td>
                      {/* <td className="py-3 text-m">{r.uploadedBy}</td> */}
                      <td className="py-3 text-m">
                        {users.find((u) => u._id === r.userId)?.name || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* LOAD MORE / FOOTER-LIKE ACTION */}
        <div className="flex justify-center">
          <button className="bg-amber-500 rounded-md px-6 py-2 text-sm hover:shadow text-white">
            View full report
          </button>
        </div>
      </div>
    </div>
  );
}
