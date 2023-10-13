import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useFetchSearchItemsMutation } from "../store/slices/apiSlice";

const Search = () => {
  const [key, setKey] = useState(null);
  const [active, setActive] = useState(false);
  const [data] = useFetchSearchItemsMutation();

  const handleChange = (e) => {
    setKey(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActive(false);
    await data(key);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={
          active
            ? "flex flex-row items-center justify-center space-x-3 border border-black rounded-lg delay-150 ease-in"
            : "flex flex-row items-center justify-center space-x-3"
        }>
        <button type="submit">
          <AiOutlineSearch
            onMouseEnter={() => setActive(true)}
            className={
              active
                ? "w-8 h-8 p-1 border-r border-black bg-gray-300 rounded-l-lg cursor-pointer delay-150 ease-in"
                : "w-8 h-8 cursor-pointer"
            }
          />
        </button>
        <input
          type="text"
          placeholder="Search"
          className={
            active
              ? "border-0 focus:border-0 focus:outline-0 w-full h-full text-sm delay-150 ease-in"
              : "hidden"
          }
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default Search;
