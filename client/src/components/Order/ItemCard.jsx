import Logo from "../../assets/logo.jpg";

const ItemCard = ({ item }) => {
  return (
    <div
      className="w-full flex flex-row items-center justify-center p-3 space-x-2 shadow-md hover:shadow-xl transition-all ease-in-out bg-white rounded-lg">
      {/* Item Image */}
      <img src={Logo} alt="profile" className="w-10 h-full rounded-full" />
      {/* Item Details */}
      <div className="w-full h-full flex flex-col items-start justify-around">
        <div className="w-full h-full flex flex-row items-center justify-between">
          <span className="text-sm font-semibold text-black">{item.name}</span>
          <span className="text-sm font-semibold text-black">
            Rs. {item.price}
          </span>
        </div>
        <span className="text-sm font-semibold text-black">
          {item.quantity}pc.
        </span>
      </div>
    </div>
  );
};

export default ItemCard;
