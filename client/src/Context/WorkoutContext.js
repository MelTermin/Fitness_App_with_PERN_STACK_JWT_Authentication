import React, { useState, createContext } from "react";

export const WorkoutContext = createContext();

export const WorkoutContextProvider = (props) => {
  

  const [workoutDetails,setWorkOutDetails]=useState([])

  

  const searchWorkout=(item) => {
    setWorkOutDetails([...workoutDetails,item])
  }
  
  return (
    <WorkoutContext.Provider
      value={{
        workoutDetails:workoutDetails,
        setWorkOutDetails:setWorkOutDetails,
        searchWorkout
      }}
    >
      {props.children}
    </WorkoutContext.Provider>
  );
};