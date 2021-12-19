import {Switch,Route,Redirect} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Landing from "./components/Landing";
import React, {useState,useEffect} from 'react'
import './App.css';

function App() {
  const [isAuthenticated,setIsAuthenticated]=useState(false)
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  const checkAuthenticated= async () =>  {
    try {

      const response= await fetch("https://fitnessappmelissa.herokuapp.com/auth/verify", {
        method: "POST",
        headers: { token: localStorage.token }
      });
      const parseRes=await response.json()

      parseRes === true ? setIsAuthenticated(true): setIsAuthenticated(false)
      
    } catch(err) {
      console.log(err.message)

    }
  }

  useEffect(() => {
    checkAuthenticated();
  }, []);

  return (
    <div >
     
        <Switch>
          <div>
          <Route
              exact
              path="/"
              render={props =>
                !isAuthenticated ? (
                  <Landing {...props} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
          <Route exact path="/login"   render={props =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }/>
          <Route exact path="/register" render={props =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }/>
          <Route exact path="/dashboard" render={props =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }/>
              </div>
        </Switch>
      
      
    </div>
  );
}

export default App;
