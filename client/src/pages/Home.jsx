import { useEffect } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import CartList from "../components/Cart/CartList";
import ItemList from "../components/Items/ItemList";
import CategoryList from "../components/Categories/CategoryList";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      toast.error("Please Login to Place an Order!");
    }
  }, [user]);

  return (
    <>
      <Toaster />
      <Navbar />
      <Banner />
      <CategoryList />
      <ItemList />
      <CartList />
    </>
  );
};

export default Home;
