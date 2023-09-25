import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import CartList from "../components/Cart/CartList";
import ItemList from "../components/Items/ItemList";
import CategoryList from "../components/Categories/CategoryList";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <CategoryList />
      <ItemList />
      <CartList />
    </>
  );
};

export default Home;
