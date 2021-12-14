import React from 'react'
import { Link} from 'react-router-dom';

function WelcomePage() {
  return (
    <div style={{marginTop:"130px"}}>
           <div className="home-container-titles">
          <div><h2>PERN Stack Fitness App with JWT Authentication</h2></div>
          <br></br>
            <div>Welcome to the Weight Tracker and Fitness Workout sample project!</div>
            <br></br>
            <br></br>
            <div>Add a <Link className="link-home"  to="/progress" >
            weight measurement </Link> or find a <Link className="link-home"  to="/workout" >
            workout according to your need!</Link>
             </div>
        </div>
    </div>
  )
}

export default WelcomePage
