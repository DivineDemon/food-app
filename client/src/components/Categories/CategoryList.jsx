import Loading from "../Loading";
import NotFound from "../NotFound";
import CategoryItem from "./CategoryItem";
import {
  useFetchCategoriesQuery,
  useFetchCategoryItemsMutation,
} from "../../store/slices/apiSlice";

const CategoryList = () => {
  const [data] = useFetchCategoryItemsMutation();
  const { data: categories, isLoading, isError } = useFetchCategoriesQuery();

  const filterItems = async (id) => {
    await data(id);
  };

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

  if (categories.length !== 0) {
    return (
      <div className="p-5 flex flex-row items-center justify-center space-x-5">
        <button onClick={() => filterItems(all.ID)}>
          <CategoryItem category={all} />
        </button>
        {categories.map((category) => (
          <button
            type="button"
            key={category.ID}
            onClick={() => filterItems(category.ID)}>
            <CategoryItem category={category} />
          </button>
        ))}
      </div>
    );
  }
};

export default CategoryList;
