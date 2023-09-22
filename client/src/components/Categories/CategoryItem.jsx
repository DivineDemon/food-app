import React from "react";
import { useDispatch } from "react-redux";

import { fetchCategoryItems } from "../../store/api";

const CategoryItem = ({ category }) => {
  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(fetchCategoryItems(id));
  };

  return (
    <div
      onClick={() => handleClick(category.ID)}
      className="px-3 py-1 rounded-full text-black font-semibold bg-yellow-500 cursor-pointer"
    >
      {category.name}
    </div>
  );
};

export default CategoryItem;
