import React,{useState} from 'react'
import { Link} from "react-router-dom";
import { FaFacebook,FaYoutube } from 'react-icons/fa';
import {SiInstagram} from 'react-icons/si';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
toast.configure();

function Login({setAuth}) {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  

  const { email, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {
      e.preventDefault();
      try {
        const body = { email, password };
        const response = await fetch(
          "https://fitnessappmelissa.herokuapp.com/auth/login",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(body)
          }
        );
  
        const parseRes = await response.json();
  
      
          localStorage.setItem("token", parseRes.jwtToken);
          toast.success("Logged in Successfully");
          setAuth(true);
         
      } catch (err) {
        console.error(err.message);
      }
    };

  return (
    <div className="login-container">
      <div className="picture">

      </div>
      <div className="form-container">
          <h1 style={{textAlign:"center"}}>Login</h1>
          <br/>
          <br/>
          <form onSubmit={onSubmitForm}>
            <label>Email:</label>
            <br/>
            <br/>
            <input type="email" name="email" placeholder="Please type your email address" value={email}
              onChange={e => onChange(e)}></input>
            <br/>
            <br/>
            <label>Password:</label>
            <br/>
            <br/>
            
            <input type="password" name="password" placeholder="Please type your password" value={password}
              onChange={e => onChange(e)}></input>
              <br/>
              <br/>
            <button className="btn">Submit</button>
            <br/>
            <br/>
          </form>
          <div className="register-container">
            <p>Do not have an account yet ?</p>
            <Link style={{textDecoration:"none", color:"black"}} to="/register">Register</Link>
          </div>

          <div className="social-media">
              <FaFacebook size={32}></FaFacebook>
              <SiInstagram size={32}></SiInstagram>
              <FaYoutube size={32}></FaYoutube>
          </div>
       
      
      </div>
      
    </div>
  )
}

export default Login
