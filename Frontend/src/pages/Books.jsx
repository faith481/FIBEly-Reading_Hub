import React, { useContext } from 'react'
import { BookContext } from '../context/BookContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../components/Breadcrums/Breadcrum';

const Books = () => {
  const {all_product} = useContext(BookContext);
  const {bookId} = useParams();
  const book = all_product.find((e)=> e.id === Number(bookId))
  return (
    <div>
      <Breadcrum book={book}/>
    </div>
  )
}

export default Books