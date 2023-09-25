import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../Loading";
import NotFound from "../NotFound";
import CategoryItem from "./CategoryItem";
import { fetchCategories, fetchItems } from "../../store/api";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { loading, error, categories, message } = useSelector(
    (state) => state.category
  );

  const handleAll = () => {
    dispatch(fetchItems());
  };

  useEffect(() => {
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const all = {
    ID: 0,
    name: "All",
    creator_id: 1,
  };

  if (categories.length !== 0) {
    return (
      <div className="p-5 flex flex-row items-center justify-center space-x-5">
        <CategoryItem category={all} onClick={handleAll} />
        {categories.map((category) => (
          <CategoryItem key={category.ID} category={category} />
        ))}
      </div>
    );
  }
};

export default CategoryList;
