import React from "react";
import { TbError404 } from "react-icons/tb";

const PageNotFound = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <TbError404 className="w-36 h-36" />
      <span>Page Not Found</span>
    </div>
  );
};

export default PageNotFound;
