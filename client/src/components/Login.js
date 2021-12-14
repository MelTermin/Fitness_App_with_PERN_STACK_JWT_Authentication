import React,{useState} from 'react'
import { toast } from "react-toastify";
import { Link} from "react-router-dom";

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
          "http://localhost:4000/auth/login",
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
          setAuth(true);
         
      } catch (err) {
        console.error(err.message);
      }
    };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={onSubmitForm}>
        <input type="email" name="email" placeholder="email" value={email}
          onChange={e => onChange(e)}></input>
        <input type="password" name="password" placeholder="password" value={password}
          onChange={e => onChange(e)}></input>
        <button>Submit</button>
      </form>
      <Link to="/register">Register</Link>
      
    </div>
  )
}

export default Login
