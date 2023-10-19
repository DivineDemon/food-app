import ItemCard from "./ItemCard";
import DropMenu from "../DropMenu";
import { useSelector } from "react-redux";

const OrderCard = ({ order }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full flex flex-col items-center justify-between bg-gray-200 shadow-lg rounded-lg">
      {/* User */}
      <div className="w-full flex flex-row items-center justify-between p-3 space-x-2 shadow-lg">
        <div className="flex-1 flex flex-row items-center justify-center space-x-2">
          {/* User Image */}
          <img
            src={user.image}
            alt="profile"
            className="w-10 h-full rounded-full"
          />
          {/* User Details */}
          <div className="w-full h-full flex flex-col items-start justify-around">
            <span className="text-sm font-semibold text-black">
              {user.username}
            </span>
            <span className="text-sm font-semibold text-black">
              Order Placed on {new Date(order.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
        <DropMenu options={["View Invoice"]} type="menu" id={order.ID} />
      </div>
      {/* Order Items */}
      <div className="w-full h-full p-3 flex flex-col items-center justify-start space-y-3">
        {order.order_items.map((item) => (
          <ItemCard key={item.item_id} item={item} />
        ))}
        <div className="w-full flex flex-col items-center justify-center p-1">
          <div className="w-full flex flex-row items-center justify-between">
            <span className="text-sm font-bold text-black">Grand Total:</span>
            <span className="text-sm font-bold text-black">Rs.{order.total}</span>
          </div>
          <div className="w-full flex flex-row items-center justify-between">
            <span className="text-sm font-bold text-black">
              Payment Method:
            </span>
            <span className="text-sm font-bold text-black uppercase">
              {order.payment_method}
            </span>
          </div>
          <div className="w-full flex flex-row items-center justify-between">
            <span className="text-sm font-bold text-black">Status:</span>
            <span className="text-sm font-bold text-black">
              {order.status === false ? "Processing" : "Paid"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
