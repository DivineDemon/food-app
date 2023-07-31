import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import CategoryButton from "./CategoryButton";
import { fetchCategories } from "../store/slices/categorySlice";

const CategoryList = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.category.error);
  const loading = useSelector((state) => state.category.loading);
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error}</div>;
  } else {
    return (
      <div className="w-full flex flex-row items-center justify-center space-x-10 p-5">
        {categories.map((category) => (
          <CategoryButton key={category.id} name={category.name} />
        ))}
      </div>
    );
  }
};

export default CategoryList;
