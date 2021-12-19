import React,{useState} from 'react'
import { Link } from "react-router-dom";



function Register({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  });

  const { email, password, name } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch(
        "https://fitnessappmelissa.herokuapp.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();
      //console.log(parseRes)//token

      
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        
      

     
    } catch (err) {
      console.error(err.message);
    }
  };
  
  return (
    <div style={{backgroundColor:"#34495e", height:"100vh", display:"flex"}}>
    <div className="register-wrapper">
      <h1 style={{textAlign:"center",marginTop:"20px"}}>Register</h1>
      <form  onSubmit={onSubmitForm}>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Please type your email"
          onChange={e => onChange(e)}
          
        />
        <label>Name:</label>
         <input
          type="text"
          name="name"
          value={name}
          placeholder="Please type your name"
          onChange={e => onChange(e)}
         
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Please type your password"
          onChange={e => onChange(e)}
          
        />
       <br/>
       <br/>
        <button className="btn-register">Submit</button>
        <div className="register-container" style={{marginTop:"20px"}}>
          <p>Already registered ?</p>
          <Link style={{textDecoration:"none", color:"black"}} to="/login">Login</Link>
      </div>
      </form>
      
    </div>
    </div>
  )
}

export default Register

