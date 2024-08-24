import React from "react";
//import Hero from "../components/Hero/Hero";
import Popular from "../components/Popular/Popular";
//import Offers from "../components/Offers/Offers";
import NewCollections from "../components/NewCollections/NewCollections";
//import NewsLetter from "../components/NewsLetter/NewsLetter";
import Latest from "../components/latest/latest";

const Shop = () => {
  return (
    <div>
      <Latest />
      <Popular />
      <NewCollections />
    </div>
  );
};

export default Shop;
