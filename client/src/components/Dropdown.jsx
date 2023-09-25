import { useNavigate } from "react-router-dom";

const Dropdown = ({ options }) => {
  const navigate = useNavigate();

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

  return (
    <div className="absolute top-[50px] bg-yellow-600 text-black font-semibold rounded-lg p-2">
      <ul className="flex flex-col items-start justify-start space-y-3">
        {options.map((option) => (
          <li
            className="p-2"
            key={option}
            onClick={() => handleRedirect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
