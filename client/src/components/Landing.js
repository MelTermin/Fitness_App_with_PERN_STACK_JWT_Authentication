import React ,{useRef,useEffect}from 'react'
import { init } from 'ityped'
import { Link } from "react-router-dom";

function Landing() {
  const textRef = useRef();

  useEffect(() => {
    init(textRef.current, {
      showCursor: true,
      backDelay: 1500,
      backSpeed:60,
      strings: ["Sign In and start your exercise"]
    });
  }, []);
  return (
    <div className="landing-container">
      <div className="landing-text">
          <h1>Welcome to Your Fitness App</h1>
          <br></br>
          <h2 className="text-ref"><span ref= {textRef}></span></h2>
          <div className="links">
              <Link to="/login" className="login-btn">
                Login
              </Link>
              <Link to="/register" className="login-btn">
                Register
              </Link>
          </div>
    </div>
  </div>
  )
}

export default Landing

