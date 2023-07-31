import React from "react";

const CategoryButton = ({ category }) => {
  return (
    <button className="bg-yellow-500 shadow-lg rounded-full px-5 py-3">
      {category}
    </button>
  );
};

export default CategoryButton;
