import React from "react";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { BiUserCircle } from "react-icons/bi";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <nav className="fixed top-0 z-50 bg-white w-full flex flex-row items-center justify-between shadow-xl px-10 py-5">
      {/* Logo */}
      <span className="text-2xl font-semibold cursor-pointer">Food App</span>
      {/* Nav List */}
      <div className="flex flex-row items-center justify-center space-x-10">
        <div className="relative">
          <BsCart4 className="w-8 h-8 cursor-pointer" />
          <span className="absolute top-[-5px] right-[-5px] rounded-full bg-red-500 w-5 h-5 text-xs text-white flex items-center justify-center">
            4
          </span>
        </div>
        {user ? (
          <div className="flex flex-row items-center justify-center space-x-3">
            <img
              src={user.image}
              alt="profile"
              className="w-12 h-12 rounded-full border"
            />
            <div className="flex flex-col items-start justify-start">
              <span className="font-semibold text-lg">{user.username}</span>
              <span className="font-semibold text-xs text-gray-400">
                {user.email}
              </span>
            </div>
          </div>
        ) : (
          <BiUserCircle className="w-8 h-8 cursor-pointer" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
