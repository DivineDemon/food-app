import { TbError404 } from "react-icons/tb";

const PageNotFound = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center space-y-5">
      <TbError404 className="w-44 h-44 text-red-500 border-4 border-black rounded-full p-3" />
      <span className="text-3xl font-semibold text-red-500">
        Page Not Found!
      </span>
    </div>
  );
};

export default PageNotFound;
