import React from 'react'

const loginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className="divloginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input type='text' placeholder='your Name' />
          <input type='text' placeholder='email address' />
          <input type='password' placeholder='password' />
          <input type='password' placeholder='password' />
        </div>
        <button>Continue</button>
        <p className='loginsignup-login'>Already have an account? <span>Login here</span></p>
        <div className='loginsignup-agree'>
          <input type="checkbox" name='' id='' />
          <p>By continuing, i agree to the terms of use and Piracy policy</p>
        </div>
      </div>
      
    </div>
  )
}

export default loginSignup
