import Loading from "../Loading";
import NotFound from "../NotFound";
import ItemBox from "../Items/ItemBox";
import { useFetchItemsQuery } from "../../store/slices/apiSlice";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ItemList = () => {
  const [finalItems, setFinalItems] = useState([]);
  const { data: items, isLoading, isError } = useFetchItemsQuery();
  const { items: allItems } = useSelector((state) => state.item);

  useEffect(() => {
    if (allItems.length !== 0) {
      setFinalItems(allItems);
    } else {
      if (items) {
        setFinalItems(items);
      }
    }
  }, [items, allItems]);

  if (isError || isLoading) {
    return (
      <div className="w-full flex items-center justify-center p-5">
        {isError ? <NotFound message="Items not Found!" /> : null}
        {isLoading ? <Loading /> : null}
      </div>
    );
  }

  if (finalItems.length !== 0) {
    return (
      <div className="p-5 flex flex-row items-center justify-center space-x-5">
        {finalItems.map((item) => (
          <ItemBox key={item.ID} item={item} />
        ))}
      </div>
    );
  }
};

export default ItemList;
