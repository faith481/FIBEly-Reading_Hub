import React from 'react'
//import './Navbar.css'
import logo from '../assets/Assets/Frontend_Assets/fibely1.jpeg'
import cart_icon from '../assets/Assets/Frontend_Assets/cart_logo.jpeg'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt='' />
            <p>SHOPPER</p>
        </div>
        <ul className='nav-menu'>
            <li>Shop</li>
            <li>Fiction</li>
            <li>Non Fiction</li>
            <li>Others</li>
        </ul>
        <div className='nav-login-cart'>
            <button>Login</button>
            <img src={cart_icon} alt=''/>
        </div>
    </div>
  )
}

export default Navbar
