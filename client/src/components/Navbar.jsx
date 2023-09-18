import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";

import Logo from "../assets/logo.jpg";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 bg-white w-screen px-10 py-3 flex flex-row items-center justify-between shadow-lg">
      {/* Delivery Location */}
      <span className="font-semibold text-xl">Deliver to: </span>
      {/* Logo */}
      <img src={Logo} alt="logo" className="w-12 h-12 rounded-full" />
      {/* Items */}
      <ul className="flex flex-row items-center justify-center space-x-10">
        <li>
          <AiOutlineSearch className="w-8 h-8" />
        </li>
        <li>
          <FaUserCircle className="w-8 h-8" />
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
