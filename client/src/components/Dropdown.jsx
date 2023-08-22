import React from "react";

const Dropdown = ({ items, toggle }) => {
  return (
    <div
      className={`bg-white border-2 shadow-lg rounded-md w-32 ${
        toggle ? "flex absolute mt-3 left-[-35px]" : "hidden"
      }`}
    >
      <ul className="w-full flex flex-col items-start justify-start font-semibold">
        {items.map((item) => (
          <li className="w-full px-2 py-3 hover:bg-gray-300 rounded-t-md">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
