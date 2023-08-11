import React from "react";
import { BiErrorAlt } from "react-icons/bi";

const Error = ({ message }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-5">
      <BiErrorAlt className="w-24 h-24 text-red-500" />
      <span className="font-semibold">{message}</span>
    </div>
  );
};

export default Error;
