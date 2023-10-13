const CategoryItem = ({ category }) => {
  return (
    <div className="px-3 py-1 rounded-full text-black font-semibold bg-yellow-500 cursor-pointer">
      {category.name}
    </div>
  );
};

export default CategoryItem;
