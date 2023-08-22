import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggedOut } from "../store/slices/userSlice";

const Dropdown = ({ items, toggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLoggedOut());
    navigate("/auth");
  };

  return (
    <div
      className={`bg-white border-2 shadow-lg rounded-md w-32 ${
        toggle ? "flex absolute mt-3 left-[-35px]" : "hidden"
      }`}
    >
      <ul className="w-full flex flex-col items-start justify-start font-semibold">
        {items.map((item) => (
          <li
            key={item}
            className="w-full px-2 py-3 hover:bg-gray-300 rounded-t-md"
            onClick={item === "Logout" ? handleLogout : undefined}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
