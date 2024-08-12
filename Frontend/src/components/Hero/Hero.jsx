import React from 'react'
import './Hero.css'
import hand_icon from '../assets/Assets/Frontend_Assets/hand_icon.png'
import arrow_icon from '../assets/Assets/Frontend_Assets/arrow.png'
import hero_image from '../assets/Assets/Frontend_Assets/hero_image.jpeg'

const Hero = () => {
  return (
    <div className='hero'>
      <div className='hero-left'>
      <h2>NEW ARIVALS ONLY</h2>
        <div>
            <div className='hand-icon'>
                <p>New</p>
                <img src={hand_icon} alt=''/>
            </div>
            <p>collections</p>
            <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">
            <div>Latest collections</div>
            <img src={arrow_icon} alt=''/>
        </div>
      </div>
      <div className="hero-right">
            <img src={hero_image} alt=""/>
        </div>
    </div>
  )
}

export default Hero
