import PropTypes from "prop-types";

const Favourite = ({ favourite, setfavourite, selectedmealclick }) => {
  const handleremove = (id) => {
    setfavourite((prev) => prev.filter((fav) => fav.idMeal !== id));
  };
  return (
    <div className="w-full h-[30vh] bg-black text-white">
      <h1 className="text-lg p-4 font-bold">Favorites</h1>

      <section className="mx-2 flex gap-3">
        {favourite.map((item) => (
          <div key={item.idMeal} className="flex flex-col">
            <img
              src={item.strMealThumb}
              onClick={() => selectedmealclick(item.idMeal)}
              className="w-24 rounded-full border-solid border-4 border-white"
              alt=""
            />
            <h1
              className="text-lg p-4 font-bold cursor-pointer"
              onClick={() => handleremove(item.idMeal)}
            >
              remove
            </h1>
          </div>
        ))}
      </section>
    </div>
  );
};

Favourite.propTypes = {
  favourite: PropTypes.array.isRequired,
  setfavourite: PropTypes.func.isRequired,
  selectedmealclick: PropTypes.func.isRequired,
};
export default Favourite;
