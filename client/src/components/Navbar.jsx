import React from "react";
import { BsCart4 } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";

const Navbar = () => {
  return (
    <nav className="w-screen flex flex-row items-center justify-between shadow-xl px-10 py-5">
      {/* Logo */}
      <span className="text-2xl font-semibold">Food App</span>
      {/* Nav List */}
      <div className="flex flex-row items-center justify-center space-x-10">
        <div className="relative">
          <BsCart4 className="w-8 h-8" />
          <span className="absolute top-[-5px] right-[-5px] rounded-full bg-red-500 w-5 h-5 text-xs text-white flex items-center justify-center">
            4
          </span>
        </div>
        <BiUserCircle className="w-8 h-8" />
      </div>
    </nav>
  );
};

export default Navbar;
