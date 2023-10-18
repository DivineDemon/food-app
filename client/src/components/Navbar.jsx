import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import Search from "./Search";
import DropMenu from "./DropMenu";
import Logo from "../assets/logo.png";
import { toggleDrawer } from "../store/slices/orderSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const { quantity } = useSelector((state) => state.order);

  const handleToggle = () => {
    dispatch(toggleDrawer());
  };

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <nav className="fixed top-0 z-40 bg-white w-screen px-10 py-3 flex flex-row items-center justify-between shadow-lg">
      {/* Logo */}
      <img
        src={Logo}
        alt="logo"
        className="w-12 h-12 rounded-full cursor-pointer"
        onClick={handleRedirect}
      />
      {/* Items */}
      <ul className="flex flex-row items-center justify-center space-x-10">
        {location.pathname === "/" ? (
          <li>
            <Search />
          </li>
        ) : null}
        <li>
          {Object.keys(user).length !== 0 ? (
            <div className="relative flex flex-row items-center justify-center space-x-2 cursor-pointer">
              <DropMenu
                options={["Profile", "Recent Orders", "Logout"]}
                image={user.image}
              />
              <div className="flex flex-col items-start justify-between text-sm text-gray-500 font-semibold">
                <span>{user.username}</span>
                <span>{user.email}</span>
              </div>
            </div>
          ) : (
            <div className="cursor-pointer">
              <DropMenu options={["Login/Register"]} type="no-user" />
            </div>
          )}
        </li>
        <li>
          <div className="relative cursor-pointer">
            <FaShoppingCart className="w-8 h-8" onClick={handleToggle} />
            <span className="absolute top-[-10px] right-[-10px] rounded-full w-6 h-6 bg-red-500 text-white text-xs font-semibold flex items-center justify-center">
              {quantity}
            </span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
