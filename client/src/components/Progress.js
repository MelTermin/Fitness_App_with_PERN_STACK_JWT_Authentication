import React ,{useState,useEffect}from 'react'
import TrackerItem from './TrackerItem'
import {useParams,useHistory} from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
toast.configure();


function Progress() {
  const [exercise, setExercise]= useState("")
  const [repetition,setRepition]=useState("")
  const [weight,setWeight]=useState("")
  const [duration,setDuration]=useState("")
  const [date,setDate]=useState("")
  const [item,setItem]=useState([]);
  
  
  const {id}=useParams()
  const history=useHistory();


  const handleSubmit= async (e) => {
    e.preventDefault()
    if( !id){
    
        const myHeaders = new Headers();
  
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("token", localStorage.token);
  
        const body= {exercise,date,weight,duration,repetition}
  
        const response = await fetch("https://fitnessappmelissa.herokuapp.com/dashboard/tracker", {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(body)
          
        });
  
        
        const parseResponse = await response.json();
        console.log(parseResponse);
  
      setItem([...item, parseResponse])
      setWeight("")
      setDuration("")
      setExercise("")
      setRepition("")
      setDate("")
  
      
       
  
    } else {
      updateUserDetails(id)
    }
   
    
  }

  const updateUserDetails= async (id) => {
    try {
      const body= {exercise,date,weight,duration,repetition}

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      await fetch(`https://fitnessappmelissa.herokuapp.com/dashboard/tracker/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body)
      });
      toast.success("Updated Successfully");
      setWeight("")
      setDuration("")
      setExercise("")
      setRepition("")
      setDate("")
      setTimeout (()=>history.push("/progress"),1000);
     
    } catch (err) {
      console.error(err.message);
    }

    
    
  }

  const getProfile = async () => {
    try {
      const res = await fetch("https://fitnessappmelissa.herokuapp.com/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseData = await res.json();
     setItem(parseData)
    } catch (err) {
      console.error(err.message);
    }
  };



  useEffect(() => {
    getProfile();
   
  }, [item]);
  return (
    <div  className="progress-container" >
       <form className="workout-details-form" onSubmit= {handleSubmit}   >
        
       <h1 className="form-title">Workout Detail Form</h1>
         
         <label>Name of exercise:</label>
         <input required type="text" value= {exercise}  name="exercise" onChange={e => setExercise(e.target.value)} placeholder="Please type a exercise " ></input>
 
         <label>Number of repetition:</label>
         <input required type="number" value= {repetition} name="repetition" onChange={e => setRepition(e.target.value)} placeholder="Repetition " ></input>
 
         <label>Current Weight:</label>
         <input required type="number" value= {weight} name="weight" onChange={e => setWeight(e.target.value)}  placeholder="Weight" ></input>
 
         <label>Duration:</label>
         <input required type="number" value= {duration} name="duration" onChange={e => setDuration(e.target.value)} placeholder="Duration" ></input>
 
         <label>Date:</label>
         <input required type="date" value={date} name="date"  onChange={e => setDate(e.target.value)}></input>
         
         <br/>
         <input className="btn-add" type="submit" value={id ? "UPDATE": "ADD"}></input> 
       </form>
       <TrackerItem item={item} setItem={setItem} ></TrackerItem>
       
    </div>
  )
}

export default Progress
