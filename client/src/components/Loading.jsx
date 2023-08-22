import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-2 p-5">
      <AiOutlineLoading3Quarters className="w-24 h-24 text-blue-500 animate-spin" />
      <span className="font-semibold">Loading</span>
    </div>
  );
};

export default Loading;
