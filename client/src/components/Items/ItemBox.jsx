import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../../store/slices/orderSlice";

const ItemBox = ({ item }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleOrder = () => {
    if (Object.keys(user).length === 0) {
      toast.error("Please Login to Place and Order!");
    } else {
      let tempItem = {};
      Object.assign(tempItem, item);
      tempItem.quantity = 1;
      dispatch(setOrder(tempItem));
      toast.success(`Added ${item.name} to Cart!`)
    }
  };

  return (
    <div className="w-[350px] h-[500px] rounded-lg border border-yellow-500 flex flex-col items-center justify-between">
      <img
        src={item.image}
        alt="item"
        className="w-full h-[50%] object-cover"
      />
      <div className="p-3 flex flex-col items-center justify-center text-center space-y-2">
        <p className="text-xl font-bold">{item.name}</p>
        <p className="text-sm font-semibold text-gray-400">
          {item.description}
        </p>
        <hr className="w-full border-t border-red-500" />
        <p>
          Rs. <span className="font-bold">{item.price}/-</span>
        </p>
        <button
          type="button"
          onClick={handleOrder}
          className="w-full px-5 py-3 text-white font-semibold rounded-lg bg-red-600 flex flex-row items-center justify-center space-x-3">
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ItemBox;
