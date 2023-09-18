import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import ItemList from "../components/Items/ItemList";
import CategoryList from "../components/Categories/CategoryList";

const Home = () => {
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
