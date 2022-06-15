import React, { useState } from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import SearchBar from "../components/SearchBar.js";
import Cart from '../components/Cart';

const Home = () => {
  return (
    <div className="container">
      <SearchBar />
      <CategoryMenu/>
      <ProductList/>
      <Cart />
    </div>

  );
};

export default Home;
