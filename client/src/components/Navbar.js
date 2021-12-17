import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import { FaTimes,FaBars } from 'react-icons/fa';

function Navbar({setAuth}) {
  const [name, setName] = useState("");
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click)

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:4000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseData = await res.json();
      setName(parseData[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
     ;
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
      <nav className="navbar">
        <div className="nav-container">
          <Link exact to="/dashboard" className="nav-logo">
          Welcome, {name}</Link>

          <ul  className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
                exact
                to="/progress"
                activeClassName="active"
                className="nav-links"
               
              >
                Progress Details
              </Link>
            </li>
           
            <li className="nav-item">
              <Link
                exact
                to="/workout"
                activeClassName="active"
                className="nav-links"
               
              >
                Workout
              </Link>
            </li>
            
            <li className="nav-item">
              <Link
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
               
              >
                Contact
              </Link>
            </li>
            
            <li className="nav-item" >
              <Link
               onClick={e => logout(e)} className="logout-btn"
                activeClassName="active"
                className="nav-links"
               
              >
                Logout 
              </Link>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {click ? <FaTimes /> :<FaBars />}
          </div>
         
        </div>
        
      </nav>
     
   
    </div>
    
  )
}

export default Navbar
