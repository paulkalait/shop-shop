import React, { useState } from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import SearchBar from "../components/SearchBar.js";

const Home = () => {
  return (
    <div className="container">
      <SearchBar />
      <CategoryMenu/>
      <ProductList/>
    </div>
  );
};

export default Home;
