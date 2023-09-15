// import React from 'react'

const Navbar = ({ inputtext, setinputtext, inputsearch, handlerandom }) => {
  return (
    <div className="sm:grid grid-cols-1 grid gap-2 h-[3rem]  p-1 md:flex space-x-6 flex-wrap">
      <input
        type="text"
        placeholder="type favourite meal"
        value={inputtext}
        onChange={(e) => setinputtext(e.target.value)}
        className=" border-solid border-2 border-purple-400 rounded-md indent-2 w-48 "
      />
      <div className="flex gap-3">
        <button
          className="border-solid border-2 border-blue-600 rounded-md w-24 text-white bg-blue-800 hover:bg-blue-900"
          onClick={inputsearch}
        >
          Search
        </button>
        <button
          className="border-solid border-2 border-blue-600 rounded-md w-24 text-white bg-blue-400 hover:bg-blue-500"
          onClick={handlerandom}
        >
          Surpise me!
        </button>
      </div>
    </div>
  );
};

export default Navbar;
