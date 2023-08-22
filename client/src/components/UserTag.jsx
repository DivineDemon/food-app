import React, { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import Dropdown from "./Dropdown";

const UserTag = ({ user }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      {user ? (
        <div
          className="relative cursor-pointer"
          onClick={() => setToggle((prevState) => !prevState)}
        >
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

          <Dropdown
            items={["Profile", "Order History", "Logout"]}
            toggle={toggle}
          />
        </div>
      ) : (
        <div className="relative cursor-pointer">
          <BiUserCircle className="w-8 h-8 cursor-pointer" />
          <Dropdown items={["Login"]} toggle={toggle} />
        </div>
      )}
    </>
  );
};

export default UserTag;
