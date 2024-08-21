import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../assets/Assets/Frontend_Assets/breadcrum_arrow.png'


const Breadcrum = (props) => {
    const {book} = props;
  return (
    <div className='breadcrum'>
      HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt=''/> {book.category} <img src={arrow_icon} alt=''/> {book.name}
    </div>
  )
}

export default Breadcrum
