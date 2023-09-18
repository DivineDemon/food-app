import React from "react";

const ItemBox = ({ item }) => {
  return (
    <div className="w-[350px] text-center rounded-lg border border-yellow-500 flex flex-col items-center justify-center space-y-2">
      <img
        src={item.image}
        alt="item"
        className="w-full h-[50%] object-cover"
      />
      <p className="text-xl font-bold">{item.name}</p>
      <p className="text-sm font-semibold text-gray-400">{item.description}</p>
      <p>
        Rs. <span className="font-bold">{item.price}/-</span>
      </p>
    </div>
  );
};

export default ItemBox;
