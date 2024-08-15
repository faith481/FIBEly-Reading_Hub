import React, { createContext } from "react";
import all_product from "../components/assets/Assets/Frontend_Assets/all_product";


export const BookContext = createContext(null);

//create book context provider
const BookContextProvider = (props)=>{
    const contextValue = {all_product};

    return (
        <BookContext.Provider value={contextValue}>
            {props.children}
        </BookContext.Provider>
    )
}
export default BookContextProvider