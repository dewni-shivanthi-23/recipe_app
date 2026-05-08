// import React from "react";

// function Home() {
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">Home</h1>
//     </div>
//   );
// }

// export default Home;

import React from "react";
import heroImg from "../assets/images/hero.jpg"; // <-- Add your own hero image
import burgerImg from "../assets/images/burger.jpg";
import pastryImg from "../assets/images/pastry.jpg";
import noodlesImg from "../assets/images/noodles.jpg";
import riceImg from "../assets/images/rice.jpg";

import r1 from "../assets/images/Ind1.jpg";
import r2 from "../assets/images/Ind2.jpg";
import r3 from "../assets/images/Ind3.jpg";
import r4 from "../assets/images/Ind4.jpg";

import r5 from "../assets/images/naan bread2.jpg";
import r6 from "../assets/images/chicken.jpg";
import r20 from "../assets/images/r20.jpg";
import r7 from "../assets/images/biriyani.jpg";
import r8 from "../assets/images/Beef Burrito.jpg";

import r9 from "../assets/images/Th1.jpg";
import r10 from "../assets/images/Th2.jpg";
import r11 from "../assets/images/Th3.jpg";
import r12 from "../assets/images/Th4.jpg";

import r13 from "../assets/images/s1.jpg";
import r14 from "../assets/images/s2.jpg";
import r15 from "../assets/images/s3.jpg";
import r16 from "../assets/images/s4.jpg";

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
    { name: "Lebanese Markook", time: "40 min", img: r5 },
    { name: "Chicken Kottu", time: "10 min", img: r20 },
    { name: "Sri Lankan Pot Biriyani", time: "30 min", img: r7 },
    { name: "Indian Shawarma", time: "20 min", img: r8 },
  ];

  const recommended2 = [
    { name: "Cane's Chicken Fingers", time: "1h 10 min", img: r1 },
    { name: "Masala Dosa", time: "40 min", img: r2 },
    { name: "Spicy Idlis", time: "1h 20 min", img: r3 },
    { name: "Chilli Paneer", time: "30 min", img: r4 },
  ];

  const recommended3 = [
    { name: "Tom Yum Goong", time: "1h 10 min", img: r9 },
    { name: "Thai Dumplings", time: "40 min", img: r10 },
    { name: "Sweet and Sour Pork Recipe", time: "1h 20 min", img: r11 },
    { name: "Som Tam", time: "30 min", img: r12 },
  ];

  const recommended4 = [
    { name: "Egg hoppers", time: "40 min", img: r13 },
    { name: "Sri Lankan Rice and Curry", time: "1h 40 min", img: r14 },
    { name: "Kiribath", time: "20 min", img: r15 },
    { name: "String Hoppers", time: "30 min", img: r16 },
  ];

  return (
    <div className="">
      {/* ================= HERO SECTION ================= */}

      {/* ================= RECOMMENDED RECIPES ================= */}
      {/* <section className="max-w-7xl mx-auto px-6 pb-12">
        <h2 className="text-2xl font-bold mb-6">
          Recommended <span className="text-amber-500"> Recipes</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recommended.map((rec, i) => (
            <RecipeCard key={i} name={rec.name} time={rec.time} img={rec.img} />
          ))}
        </div> */}

      {/* Load More Button */}
      {/* <div className="flex justify-center mt-8">
          <button className="bg-amber-500 text-white px-6 py-3 rounded-md shadow hover:bg-amber-600 transition">
            Load More
          </button>
        </div>
      </section> */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <h2 className="text-2xl font-bold mb-6">
          Famous <span className="text-amber-500">Recipes</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recommended.map((rec, i) => (
            <RecipeCard key={i} name={rec.name} time={rec.time} img={rec.img} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <h2 className="text-2xl font-bold mb-6">
          Indian <span className="text-amber-500">Recipes</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recommended2.map((rec, i) => (
            <RecipeCard key={i} name={rec.name} time={rec.time} img={rec.img} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <h2 className="text-2xl font-bold mb-6">
          Thailand <span className="text-amber-500">Recipes</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recommended3.map((rec, i) => (
            <RecipeCard key={i} name={rec.name} time={rec.time} img={rec.img} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <h2 className="text-2xl font-bold mb-6">
          Sri Lankan <span className="text-amber-500">Recipes</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recommended4.map((rec, i) => (
            <RecipeCard key={i} name={rec.name} time={rec.time} img={rec.img} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
