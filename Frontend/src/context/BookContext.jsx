import React, { createContext } from "react";
import all_books from "../components/assets/Assets/Frontend_Assets/all_product";

export const BookContext = createContext(null);

//create book context provider
const BookContextProvider = (props) => {
  const contextValue = { all_books };

  return (
    <BookContext.Provider value={contextValue}>
      {props.children}
    </BookContext.Provider>
  );
};
export default BookContextProvider;