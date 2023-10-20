import { useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { BiMinus, BiPlus } from "react-icons/bi";
import {
  decrement,
  increment,
  deleteItem,
  setItemQuantity,
} from "../../store/slices/orderSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(deleteItem(item));
  };

  const handleIncrement = () => {
    dispatch(increment(item));
  };

  const handleDecrement = () => {
    dispatch(decrement(item));
  };

  const handleQuantity = (quantity) => {
    const payload = {
      ID: item.ID,
      price: item.price,
      quantity: quantity === "" ? 1 : quantity,
    };
    
    dispatch(setItemQuantity(payload));
  };

  return (
    <div className="relative w-full flex flex-row items-center justify-between space-x-5 backdrop-blur-sm bg-white/30 p-3 rounded-lg">
      <AiOutlineClose
        className="w-6 h-6 absolute top-3 left-3 text-white cursor-pointer"
        onClick={handleRemove}
      />
      {/* Image */}
      <img src={item.image} alt="item" className="w-24 h-24 rounded-full" />
      {/* Text */}
      <div className="w-full h-full flex flex-col items-start justify-center space-y-3">
        <div className="w-full h-[35%] flex flex-row items-center justify-between">
          <span>{item.name}</span>
          <span>
            <span className="font-bold">Rs.</span> {item.price}
          </span>
        </div>
        {/* Quantity Control */}
        <div className="w-full h-[35%] flex flex-row items-center justify-center rounded-lg text-md">
          <div
            onClick={handleDecrement}
            className="w-full h-full flex items-center justify-center bg-black text-white rounded-l-lg cursor-pointer">
            <BiMinus />
          </div>
          <div className="w-full h-full font-semibold p-1 text-center bg-white">
            <input
              onChange={(e) => handleQuantity(e.target.value)}
              type="text"
              value={item.quantity}
              className="text-center w-full h-full text-black"
            />
          </div>
          <div
            onClick={handleIncrement}
            className="w-full h-full flex items-center justify-center bg-black text-white rounded-r-lg cursor-pointer">
            <BiPlus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
