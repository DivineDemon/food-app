import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  const [key, setKey] = useState(null);
  const [active, setActive] = useState(false);

  const handleChange = (e) => {
    setKey(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActive(false);

    // API Call
    console.log(key);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={
          active
            ? "flex flex-row items-center justify-center space-x-3 border border-black rounded-lg transition"
            : "flex flex-row items-center justify-center space-x-3"
        }
      >
        <button type="submit">
          <AiOutlineSearch
            onMouseEnter={() => setActive(true)}
            className={
              active
                ? "w-8 h-8 p-1 border-r border-black bg-gray-300 rounded-l-lg cursor-pointer transition"
                : "w-8 h-8 cursor-pointer"
            }
          />
        </button>
        <input
          type="text"
          placeholder="Search"
          className={
            active
              ? "border-0 focus:border-0 focus:outline-0 w-full h-full text-sm transition"
              : "hidden"
          }
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default Search;
