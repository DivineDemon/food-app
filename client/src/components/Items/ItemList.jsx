import Loading from "../Loading";
import NotFound from "../NotFound";
import ItemBox from "../Items/ItemBox";
import { useFetchItemsQuery } from "../../store/slices/apiSlice";

const ItemList = () => {
  const { data: items, isLoading, isError } = useFetchItemsQuery();

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center p-5">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full flex items-center justify-center p-5">
        <NotFound message="Items not Found!" />
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
