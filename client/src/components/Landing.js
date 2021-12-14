import React from 'react'
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing-container">
    <h1>Welcome to Your Fitness App</h1>
    <p>Sign In and start your exercise</p>
    <Link to="/login" className="login-btn">
      Login
    </Link>
    <Link to="/register" className="register-btn">
      Register
    </Link>
  </div>
  )
}

export default Landing

