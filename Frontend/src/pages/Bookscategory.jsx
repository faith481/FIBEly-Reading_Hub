import React, { useContext } from "react";
import "./CSS/BookCategory.css";
import { BookContext } from "../context/BookContext";
import dropdown_icon from "../components/assets/Assets/Frontend_Assets/dropdown_icon.png";
import Items from "../components/items/Items";
//import all_books from "../components/assets/Assets/Frontend_Assets/all_product";

const Bookscategory = (props) => {
  const { all_books } = useContext(BookContext);
  return (
    <div className="book-category">
      <img src={props.banner} alt="" />
      <div className="bookcategory-indexsort">
        <p>
          <span>Showing 1-12</span> out of 36 books
        </p>
        <div className="bookcategory-sort">
          sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="bookcategory-products">
        {all_books.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Items
                key={i}
                id={item.id}
                title={item.title}
                author={item.author}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default Bookscategory;
