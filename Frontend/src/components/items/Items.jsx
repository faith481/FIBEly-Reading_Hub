import React from "react";
import "./Items.css";

const Items = (props) => {
  return (
    <div className="item">
      <img src={props.image} alt="" />
      <p>{props.name}</p>
      <p>by {props.author}</p>
      <div className="item-prices">
        <div className="items-price-new">${props.new_price}</div>
        <div className="items-price-old">${props.old_price}</div>
      </div>
    </div>
  );
};

export default Items;
