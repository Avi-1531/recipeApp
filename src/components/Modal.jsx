// import { useState } from "react";
import PropTypes from "prop-types";

const Modal = ({ source, recipe, name, recipesource, closemodal }) => {
  // console.log(selectedmeal);
  return (
    <div className="modal-overlay">
      <div className="modal-container text-lg ">
        <img src={source} className="w-[80vw] h-[25rem] " alt="" />
        <div className="modal-content p-6">
          <div className="text-4xl mb-4 font-semibold">{name}</div>
          <div className="text-2xl mb-4">Cooking Instructions</div>
          <div className="text-xl mb-4">{recipe}</div>
          {/* {recipe} */}
          <a
            href={recipesource}
            className="text-blue-800 font-semibold "
            target="_blank"
            rel="noopener noreferrer"
          >
            Original Source
          </a>
          <div>
            <button
              className="text-white bg-red-950 mt-4 w-[7rem] rounded-lg h-10 cursor-pointer"
              onClick={closemodal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  source: PropTypes.string.isRequired,
  recipe: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  recipesource: PropTypes.string.isRequired,
  closemodal: PropTypes.func.isRequired,
};
export default Modal;
