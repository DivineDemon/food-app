import React from "react";

import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import ItemList from "../components/ItemList";
import CategoryList from "../components/CategoryList";

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
