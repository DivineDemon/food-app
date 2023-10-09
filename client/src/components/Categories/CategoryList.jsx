import Loading from "../Loading";
import NotFound from "../NotFound";
import CategoryItem from "./CategoryItem";
import { useFetchCategoriesQuery } from "../../store/slices/apiSlice";

const CategoryList = () => {
  const { data: categories, isLoading, isError } = useFetchCategoriesQuery();

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
        <NotFound message="Categories not Found!" />
      </div>
    );
  }

  const all = {
    ID: 0,
    name: "All",
    creator_id: 1,
  };

  if (categories.data.length !== 0) {
    return (
      <div className="p-5 flex flex-row items-center justify-center space-x-5">
        <CategoryItem category={all} />
        {categories.data.map((category) => (
          <CategoryItem key={category.ID} category={category} />
        ))}
      </div>
    );
  }
};

export default CategoryList;
