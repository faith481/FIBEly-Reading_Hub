import React from "react";
import "./popular.css";
import data_product from "../assets/Assets/Frontend_Assets/data";
import Items from "../items/Items";

const Popular = () => {
  return (
    <div className="popular">
      <div className="popular-header">
        <h1>POPULAR IN FICTION</h1>
        <hr />
      </div>
      <div className="popular-items">
        {data_product.map((item, i) => {
          return (
            <div className="popular-item" key={i}>
              <Items
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
