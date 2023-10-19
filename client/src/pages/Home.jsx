import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import ItemList from "../components/Items/ItemList";
import CategoryList from "../components/Categories/CategoryList";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  if (Object.keys(user).length === 0) {
    toast.error("Please Login to Place an Order!");
  }

  return (
    <>
      <Navbar />
      <Banner />
      <CategoryList />
      <ItemList />
    </>
  );
};

export default Home;
