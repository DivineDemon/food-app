import { useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DropMenu = ({ options, image, type }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleRedirect = (option) => {
    switch (option) {
      case "Login":
        navigate("/auth");
        break;
      case "Profile":
        navigate("/profile");
        break;
      case "Logout":
        navigate("/auth");
        break;
      case "Recent Orders":
        navigate("/history");
        break;
      default:
        navigate("/");
        break;
    }
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" onClick={handleButtonClick}>
      <button>
        {image !== undefined ? (
          <img
            src={image}
            alt="dropdown"
            className="w-10 h-10 rounded-full border-2 border-gray-300"
          />
        ) : null}
        {type === "no-user" ? (
          <FaUserCircle className="w-8 h-8" />
        ) : type === "menu" ? (
          <CgMenuRight className="w-5 h-5 text-black" />
        ) : null}
      </button>
      <div
        className={`absolute top-[35px] bg-yellow-600 text-black font-semibold rounded-lg p-2 ${
          isOpen ? "block" : "hidden"
        }`}>
        <ul className="flex flex-col items-start justify-start space-y-3">
          {options.map((option) => (
            <li
              className="p-2 cursor-pointer"
              key={option}
              onClick={() => {
                handleRedirect(option);
                setIsOpen(false); // Close the dropdown after clicking an option
              }}>
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropMenu;
