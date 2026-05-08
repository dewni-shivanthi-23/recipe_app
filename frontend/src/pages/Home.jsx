import React from "react";
import heroImg from "../assets/images/hero.jpg"; // <-- Add your own hero image
import burgerImg from "../assets/images/burger.jpg";
import pastryImg from "../assets/images/pastry.jpg";
import noodlesImg from "../assets/images/noodles.jpg";
import riceImg from "../assets/images/rice.jpg";

import r1 from "../assets/images/R1.png";
import r2 from "../assets/images/R2.png";
import r3 from "../assets/images/R3.png";
import r4 from "../assets/images/R4.png";

import r9 from "../assets/images/Th1.jpg";
import r10 from "../assets/images/Th2.jpg";
import r11 from "../assets/images/Th3.jpg";
import r12 from "../assets/images/Th4.jpg";

import r5 from "../assets/images/naan bread2.jpg";
import r20 from "../assets/images/r20.jpg";
import r7 from "../assets/images/biriyani.jpg";
import r8 from "../assets/images/Beef Burrito.jpg";

import chef1 from "../assets/images/chef1.jpg";
import chef2 from "../assets/images/chef2.jpg";
import chef3 from "../assets/images/chef3.jpg";

import RecipeCard from "../components/RecipeCard";

function Home() {
  const categories = [
    { name: "Burgers", time: "40 min", img: burgerImg },
    { name: "Pastries", time: "40 min", img: pastryImg },
    { name: "Noodles", time: "45 min", img: noodlesImg },
    { name: "Fried Rice", time: "45 min", img: riceImg },
  ];

  const recommended = [
    { name: "Thailand Noodles", time: "40 min", img: r1 },
    { name: "Russian Potatoes", time: "20 min", img: r2 },
    { name: "Indian Salad", time: "10 min", img: r3 },
    { name: "Korean Pasta", time: "30 min", img: r4 },
  ];

  const recommended2 = [
    { name: "Lebanese Markook", time: "40 min", img: r5 },
    { name: "Chicken Kottu", time: "20 min", img: r20 },
    { name: "Sri Lankan Pot Biriyani", time: "10 min", img: r7 },
    { name: "Indian Shawarma", time: "30 min", img: r8 },
  ];

  const recommended3 = [
    { name: "Tom Yum Goong", time: "1h 10 min", img: r9 },
    { name: "Thai Dumplings", time: "40 min", img: r10 },
    { name: "Sweet and Sour Pork Recipe", time: "1h 20 min", img: r11 },
    { name: "Som Tam", time: "30 min", img: r12 },
  ];

  return (
    <div className="">
      {/* ================= HERO SECTION ================= */}
      <section
        className="relative w-full h-[710px] bg-cover bg-center -mt-[90px]"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0"></div>

        <div className="relative h-full flex flex-col justify-center pl-225">
          <h1 className="text-6xl font-bold text-white leading-tight">
            Adventure of{" "}
            <span className="text-amber-500">
              <br />
              Delicious
            </span>
          </h1>
          <p className="text-gray-200 mt-4">
            Unlock a world of amazing recipes with simple
            <br /> instructions and awesome taste!
          </p>
          <br />

          <button className="bg-amber-500 text-white px-9 py-2 rounded-md shadow hover:bg-amber-600 transition w-fit ">
            Explore
          </button>
        </div>
      </section>

      {/* ================= TOP CATEGORIES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl mb-6 font-bold">
          Top <span className="text-amber-500">Categories</span>{" "}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            // <div
            //   key={i}
            //   className="flex flex-col items-center p-4 rounded-lg hover:shadow transition"
            // >
            //   <img
            //     src={cat.img}
            //     className="w-40 h-40 mb-3 rounded-full"
            //     alt=""
            //   />
            //   <p className="font-semibold">{cat.name}</p>
            //   <p className="text-sm font-bold text-red-400">{cat.time}</p>
            // </div>
            <div
              key={i}
              className="flex flex-col items-center p-4 rounded-lg bg-white 
             transform transition-all duration-300 ease-out 
             hover:shadow-xl hover:-translate-y-2 hover:scale-[1.09] 
             cursor-pointer z-10"
            >
              <img
                src={cat.img}
                className="w-40 h-40 mb-3 rounded-full object-cover 
               transform transition-transform duration-300 hover:scale-150"
                alt={cat.name}
              />
              <p className="font-semibold">{cat.name}</p>
              <p className="text-sm font-bold text-red-400">{cat.time}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= RECOMMENDED RECIPES ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <h2 className="text-2xl font-bold mb-6">
          Recommended <span className="text-amber-500">Recipes</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recommended3.map((rec, i) => (
            <RecipeCard key={i} name={rec.name} time={rec.time} img={rec.img} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-6">
          {recommended2.map((rec, i) => (
            <RecipeCard key={i} name={rec.name} time={rec.time} img={rec.img} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-8">
          <button className="bg-amber-500 text-white px-6 py-3 rounded-md shadow hover:bg-amber-600 transition">
            Load More
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <h2 className="text-2xl font-bold mb-6">
          RecipeVault <span className="text-amber-500">Chefs</span>
        </h2>

        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: "Chef Antonio", role: "Master Chef", img: chef1 },
            { name: "Chef Emilia", role: "Pastry Specialist", img: chef2 },
            { name: "Chef Liam", role: "Asian Cuisine Expert", img: chef3 },
          ].map((chef, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform transition-all duration-300 ease-out 
             hover:shadow-xl hover:-translate-y-2 hover:scale-[1.05] 
             cursor-pointer z-10"
              //className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform transition-transform duration-300 hover:scale-105"
              //   className="flex flex-col items-center p-4 rounded-lg bg-white
              //  transform transition-all duration-300 ease-out
              //  hover:shadow-xl hover:-translate-y-2 hover:scale-[1.01]
              //  cursor-pointer z-10"
            >
              {/* Image takes full top area */}
              <img
                src={chef.img}
                alt={chef.name}
                className="w-full h-100 object-cover transform
                transition-transform
                duration-300
                hover:scale-110"
              />

              {/* Text below image */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{chef.name}</h3>
                <p className="text-sm text-gray-500">{chef.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
