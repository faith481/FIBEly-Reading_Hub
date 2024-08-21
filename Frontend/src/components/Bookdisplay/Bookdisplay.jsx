import React from 'react'
import './Bookdisplay.css'
import star_icon from '../assets/Assets/Frontend_Assets/star_icon.png'
import star_dull_icon from '../assets/Assets/Frontend_Assets/star_dull_icon.png'

const Bookdisplay = (props) => {
    const {book} = props;
  return (
    <div className='bookdisplay'>
      <div className="bookdisplay-left">
        <div className="bookdisply-img-list">
            <img src={book.image} alt=""/>
            <img src={book.image} alt=""/>
            <img src={book.image} alt=""/>
            <img src={book.image} alt=""/>
        </div>
        <div className="bookdisplay-img">
            <img className='bookdisplay-main-img' src={book.image} alt=""/>
        </div>
      </div>
      <div className="bookdisplay-right">
        <h1>{book.name}</h1>
        <div className="bookdisplay-right-star">
            <img src={star_icon} alt='' />
            <img src={star_icon} alt='' />
            <img src={star_icon} alt='' />
            <img src={star_icon} alt='' />
            <img src={star_dull_icon} alt='' />
            <p>(122)</p>
        </div>
      </div>
    </div>
  )
}

export default Bookdisplay
