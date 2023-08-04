import React from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../store/slices/categorySlice";

const CategoryButton = ({ name }) => {
  const dispatch = useDispatch();

  const handleClick = (name) => {
    dispatch(setCategory(name));
  };

  return (
    <button
      onClick={() => handleClick(name)}
      className="bg-yellow-500 shadow-lg rounded-full px-5 py-2 text-black font-semibold"
    >
      {name}
    </button>
  );
};

export default CategoryButton;
