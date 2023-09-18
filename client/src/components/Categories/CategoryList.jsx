import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../Loading";
import CategoryItem from "./CategoryItem";
import { fetchCategories } from "../../store/api";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { loading, categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (categories.length !== 0) {
    return (
      <div className="p-5 flex flex-row items-center justify-center space-x-5">
        {categories.map((category) => (
          <CategoryItem key={category.ID} category={category} />
        ))}
      </div>
    );
  }
};

export default CategoryList;
