import React from "react";
import { useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";

import Logo from "../assets/logo.jpg";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <nav className="fixed top-0 z-50 bg-white w-screen px-10 py-3 flex flex-row items-center justify-between shadow-lg">
      {/* Logo */}
      <img src={Logo} alt="logo" className="w-12 h-12 rounded-full" />
      {/* Items */}
      <ul className="flex flex-row items-center justify-center space-x-10">
        <li>
          <AiOutlineSearch className="w-8 h-8" />
        </li>
        <li>
          {user ? (
            <div className="flex flex-row items-center justify-center space-x-2">
              <img
                src={user.image}
                alt="profile"
                className="w-10 h-10 rounded-full border-2 border-gray-300"
              />
              <div className="flex flex-col items-start justify-between text-sm text-gray-500 font-semibold">
                <span>{user.username}</span>
                <span>{user.email}</span>
              </div>
            </div>
          ) : (
            <FaUserCircle className="w-8 h-8" />
          )}
        </li>
        <li>
          <div className="relative">
            <FaShoppingCart className="w-8 h-8" />
            <span className="absolute top-[-10px] right-[-10px] rounded-full w-6 h-6 bg-red-500 text-white text-xs font-semibold flex items-center justify-center">
              3
            </span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
