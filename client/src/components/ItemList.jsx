import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ItemCard from "./ItemCard";
import { fetchItems } from "../store/slices/itemSlice";

const ItemList = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.item.error);
  const items = useSelector((state) => state.item.items);
  const loading = useSelector((state) => state.item.loading);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error}</div>;
  } else {
    return (
      <div className="w-full flex items-center justify-center">
        <div className="w-[75%] grid grid-cols-4 items-center justify-center gap-3 my-20">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default ItemList;