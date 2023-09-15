import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import axios from "axios";
import Favourite from "./components/Favourite";
import Modal from "./components/Modal";

function App() {
  const [inputtext, setinputtext] = useState("");
  const [allmeals, setallmeals] = useState([]);
  const [showmodal, setshowmodal] = useState(false);
  const [allmealsurl, setallmealurl] = useState(
    "https://www.themealdb.com/api/json/v1/1/search.php?s"
  );
  const [selectedmeal, setselectedmeal] = useState(null);

  const randommealurl = "https://www.themealdb.com/api/json/v1/1/random.php";
  const [loading, setloading] = useState(false);
  const fetchmeals = async (url) => {
    setloading(true);
    try {
      const { data } = await axios(url);
      // console.log(data.meals);
      setallmeals(data.meals);
    } catch (error) {
      console.log(error.response);
    }
    setloading(false);
  };
  const closemodal = () => {
    setshowmodal(false);
  };
  // console.log(allmeals);
  useEffect(() => {
    // async function exampleFetch() {
    //   const response = await fetch(
    //     "https://www.themealdb.com/api/json/v1/1/random.php"
    //   );
    //   const json = await response.json();
    //   console.log(json);
    // }

    // exampleFetch();
    fetchmeals(allmealsurl);
  }, [allmealsurl]);

  const getfavouritesfromlocalstorage = () => {
    let favourites = localStorage.getItem("favourite");
    if (favourites) {
      favourites = JSON.parse(localStorage.getItem("favourite"));
    } else {
      favourites = [];
    }
    return favourites;
  };

  const [favourite, setfavourite] = useState(getfavouritesfromlocalstorage());
  console.log(favourite);
  useEffect(() => {
    localStorage.setItem("favourite", JSON.stringify(favourite));
  }, [favourite]);

  const handleclick = (id) => {
    const favouritmeal = allmeals.find((meal) => meal.idMeal === id);
    //  We use .some() to check if the favouritmeal is not already in the favourite array based on the idMeal property.

    // If the favouritmeal is not found in the favourite array, we add it to the favourite array using the spread operator
    if (!favourite.some((fav) => fav.idMeal === favouritmeal.idMeal)) {
      setfavourite((prev) => [...prev, favouritmeal]);
    }
  };

  const selectedmealclick = (id) => {
    const selectmeal = allmeals.find((meal) => meal.idMeal === id);
    setselectedmeal(selectmeal);
    setshowmodal(true);
  };
  // console.log(selectedmeal);

  // console.log(favourite);
  // console.log(inputtext);
  const inputsearch = () => {
    const newallmealsurl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputtext}`;
    setallmealurl(newallmealsurl);
    setinputtext("");
  };
  const handlerandom = () => {
    setinputtext("");
    fetchmeals(randommealurl);
  };

  if (loading) {
    return (
      <section>
        <h4 className="text-lg font-semibold">Loading......</h4>
      </section>
    );
  }
  if (allmeals === null) {
    return (
      <section>
        <h4 className="text-lg font-semibold text-black">
          There is no data matching to search result
        </h4>
        <button className="text-white bg-purple-500 rounded-lg text-xl w-24 cursor-pointer h-24">
          Go back
        </button>
      </section>
    );
  }

  return (
    <div className="overflow-x-hidden">
      <div className=" sm:mt-10  md:flex h-[5rem]  items-center justify-center  w-[90vh] max-w-[1120px] ">
        <Navbar
          inputtext={inputtext}
          setinputtext={setinputtext}
          inputsearch={inputsearch}
          handlerandom={handlerandom}
        />
      </div>

      <section className={favourite.length > 0 ? "block" : "hidden"}>
        <Favourite
          favourite={favourite}
          setfavourite={setfavourite}
          selectedmealclick={selectedmealclick}
        />
      </section>

      <div className="bg-gray-100 p-[3rem] w-[90vw] m-auto grid sm:grid-cols-1 md:grid-cols-3 gap-[2rem]">
        {allmeals.map((meal) => (
          <Card
            key={meal.idMeal}
            foodname={meal.strMeal}
            sourceimg={meal.strMealThumb}
            id={meal.idMeal}
            handleclick={() => handleclick(meal.idMeal)}
            selectedmealclick={() => selectedmealclick(meal.idMeal)}
          />
        ))}
      </div>
      {showmodal && (
        <Modal
          source={selectedmeal.strMealThumb}
          recipe={selectedmeal.strInstructions}
          name={selectedmeal.strMeal}
          recipesource={selectedmeal.strSource}
          closemodal={closemodal}
        />
      )}
    </div>
  );
}

export default App;
