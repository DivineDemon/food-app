import ItemCard from "./ItemCard";
import DropMenu from "../DropMenu";
import Logo from "../../assets/logo.jpg";
import { useSelector } from "react-redux";

const OrderCard = ({ order }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full flex flex-col items-center justify-between bg-gray-200 shadow-lg rounded-lg">
      {/* User */}
      <div className="w-full flex flex-row items-center justify-between p-3 space-x-2 shadow-lg">
        <div className="flex-1 flex flex-row items-center justify-center space-x-2">
          {/* User Image */}
          <img src={Logo} alt="profile" className="w-10 h-full rounded-full" />
          {/* User Details */}
          <div className="w-full h-full flex flex-col items-start justify-around">
            <span className="text-sm font-semibold text-black">
              {user.username}
            </span>
            <span className="text-sm font-semibold text-black">
              Order Placed on {order.created_at}
            </span>
          </div>
        </div>
        <DropMenu options={["Download"]} type="menu" />
      </div>
      {/* Order Items */}
      <div className="w-full h-full p-3 flex flex-col items-center justify-start space-y-3">
        {order.order_items.map((item) => (
          <ItemCard key={item.item_id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
