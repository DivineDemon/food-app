import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import CategoryList from "../components/Categories/CategoryList";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <CategoryList />
    </>
  );
};

export default Home;
