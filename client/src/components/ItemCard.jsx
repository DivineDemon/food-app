import React from "react";

const ItemCard = ({ name, price, image, description }) => {
  return (
    <div className="w-full h-full rounded-lg shadow-xl bg-white flex flex-col items-center justify-between">
      <img
        src={image}
        alt="food"
        className="w-full h-[60%] object-cover border-b"
      />
      <span className="font-semibold text-2xl">{name}</span>
      <p className="text-sm px-4 text-gray-400 text-justify">{description}</p>
      <span className="font-bold text-xl">Rs. {price}</span>
      <button className="w-full bg-green-500 text-white font-semibold rounded-b-lg px-5 py-2">
        Add to Cart
      </button>
    </div>
  );
};

export default ItemCard;
