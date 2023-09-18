import React from "react";
import { TbError404 } from "react-icons/tb";

const NotFound = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <TbError404 className="w-24 h-24" />
      <span>{message}</span>
    </div>
  );
};

export default NotFound;
