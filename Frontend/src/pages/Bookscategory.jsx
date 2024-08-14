import React, { useContext } from 'react'
import './CSS/BookCategory.css'
import { BookContext } from '../context/BookContext'

const Bookscategory = (props) => {
  const {all_product} = useContext(BookContext)
  return (
    <div className='book-category'>
      <img src={props.banner} alt=''/>
    </div>
  )
}

export default Bookscategory