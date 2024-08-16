import React from 'react'
import './Items.css'
import { Link } from 'react-router-dom'

const Items = (props) => {
  return (
    <div className='item'>
      <Link to={`/Books/${props.id}`}><img src={props.image} alt=''/></Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="items-price-new">
            ${props.new_price}
        </div>
        <div className='items-price-old'>
            ${props.old_price}
        </div>
      </div>
    </div>
  )
}

export default Items
