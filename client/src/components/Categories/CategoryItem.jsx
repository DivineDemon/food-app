import React from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../../store/slices/categorySlice";

const CategoryItem = ({ category }) => {
  const dispatch = useDispatch();

  const handleClick = (name) => {
    dispatch(setCategory(name));
  };

  return (
    <div
      onClick={() => handleClick(category.name)}
      className="px-3 py-1 rounded-full text-black font-semibold bg-yellow-500 cursor-pointer"
    >
      {category.name}
    </div>
  );
};

export default CategoryItem;
