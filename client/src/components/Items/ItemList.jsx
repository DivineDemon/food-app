import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../Loading";
import NotFound from "../NotFound";
import ItemBox from "../Items/ItemBox";
import { fetchItems } from "../../store/api";

const ItemList = () => {
  const dispatch = useDispatch();
  const { loading, error, items, message } = useSelector((state) => state.item);

  useEffect(() => {

    if (items.length === 0) {
      dispatch(fetchItems());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, loading]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center p-5">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center p-5">
        <NotFound message={message} />
      </div>
    );
  }

  if (items.length !== 0) {
    return (
      <div className="p-5 flex flex-row items-center justify-center space-x-5">
        {items.map((item) => (
          <ItemBox key={item.ID} item={item} />
        ))}
      </div>
    );
  }
};

export default ItemList;
