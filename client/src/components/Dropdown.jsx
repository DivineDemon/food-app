import React from "react";

const Dropdown = ({ options }) => {
  return (
    <div className="absolute top-[50px] bg-yellow-600 text-black font-semibold rounded-lg p-2">
      <ul className="flex flex-col items-start justify-start space-y-3">
        {options.map((option) => (
          <li className="p-2" key={option}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
