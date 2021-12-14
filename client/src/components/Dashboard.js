import React from 'react'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Navbar from './Navbar';
import Progress from './Progress';
import Contact from './Contact';
import Workout from './Workout';
import WelcomePage from './WelcomePage';

function Dashboard({setAuth}) {
 



  return (
    <div>

       <Router>
      <Navbar setAuth= {setAuth}/>
       
 
       <Switch>
         <div>
            <Route exact path="/dashboard" render={props =><WelcomePage {...props}/>}/>
            <Route exact path="/progress" render={props =><Progress {...props}/>} />
            <Route exact path="/workout" render={props =><Workout {...props}/>} />
            <Route exact path="/contact" render={props =><Contact {...props}/>} />
          </div>
      </Switch>
      </Router>
     
    </div>
  )
}

export default Dashboard
