import React from "react";

const ItemBox = ({ item }) => {
  return (
    <div className="w-[350px] rounded-lg border border-yellow-500 flex flex-col items-center justify-center">
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
        <p>
          Rs. <span className="font-bold">{item.price}/-</span>
        </p>
      </div>
    </div>
  );
};

export default ItemBox;
