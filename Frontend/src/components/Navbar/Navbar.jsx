import React, { useState } from 'react'
import './Navbar.css'
import logo from '../assets/Assets/Frontend_Assets/fibely1.jpeg'
import cart_icon from '../assets/Assets/Frontend_Assets/cart_logo.jpeg'

const Navbar = () => {
    const [menu,setMenu] = useState("shop");
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt='' />
            <p>SHOPPER</p>
        </div>
        <ul className='nav-menu'>
            <li onClick={()=>{setMenu("shop")}}> <link to='/'>Shop</link>{menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("fictions")}}><link  to='/fiction'>Fiction</link> {menu==="fictions"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Non-fictions")}}> <link to='/Non-Fiction'>Non-fiction</link> {menu==="Non-fictions"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("others")}}><link to='/others'>Others</link> {menu==="others"?<hr/>:<></>}</li>
        </ul>
        <div className='nav-login-cart'>
            <link to='/login'><button>Login</button></link>
            <link to='/cart'><img src={cart_icon} alt=''/></link>
            <div className='nav-cart-count'>0</div>
        </div>
    </div>
  )
}

export default Navbar
