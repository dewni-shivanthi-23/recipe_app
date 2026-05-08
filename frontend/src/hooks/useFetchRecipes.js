// import { useEffect, useState } from "react";
// import api from "../api";

// const useFetchRecipes = () => {
//   const [recipes, setRecipes] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await api.get("/recipes");
//       setRecipes(res.data);
//     };

//     fetchData();
//   }, []);

//   return recipes;
// };

// export default useFetchRecipes;

import { useEffect, useState } from "react";
import { getRecipes } from "../services/api";

const useFetchRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes()
      .then((res) => setRecipes(res.data))
      .catch((err) => console.log(err));
  }, []);

  return recipes;
};

export default useFetchRecipes;
