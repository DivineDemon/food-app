import React from "react";

const CategoryButton = ({ name }) => {
  return (
    <button className="bg-yellow-500 shadow-lg rounded-full px-5 py-2 text-black font-semibold">
      {name}
    </button>
  );
};

export default CategoryButton;
