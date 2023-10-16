import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { CgMenuRight } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/userSlice";

const DropMenu = ({ options, image, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRedirect = (option) => {
    switch (option) {
      case "Login/Register":
        navigate("/auth");
        break;
      case "Profile":
        navigate("/profile");
        break;
      case "Logout":
        dispatch(logout());
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
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="ghost" className="rounded-full">
          {image !== undefined ? (
            <img
              src={image}
              alt="dropdown"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : null}
          {type === "no-user" ? (
            <FaUserCircle className="w-8 h-8" />
          ) : type === "menu" ? (
            <CgMenuRight className="w-5 h-5 text-black" />
          ) : null}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="dropdown-options"
        onAction={(key) => handleRedirect(key)}>
        {options.map((option) => (
          <DropdownItem key={option}>{option}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropMenu;
