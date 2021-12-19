import React from 'react'

import { Link } from "react-router-dom";



function TrackerItem({item,setItem}) {

  const onDeleteUser= async (id) => {
    try {
       await fetch(`https://fitnessappmelissa.herokuapp.com/dashboard/tracker/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.token }
      });

      setItem(item.filter(detail => detail.tracker_form_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

 
  return (
    <div>
       <table className="styled-table">
        <thead>
          <tr>
          
            <th style= {{textAlign:"center"}}>Exercise</th>
            <th style= {{textAlign:"center"}}>Duration</th>
            <th style= {{textAlign:"center"}}>Date</th>
            <th style= {{textAlign:"center"}}>Weight</th>
            <th style= {{textAlign:"center"}}>Repetition</th>
            <th style= {{textAlign:"center"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {item.length !== 0 &&
            item[0].tracker_form_id !== null &&
          item.map((details)=>{
            return(
              <tr key={item.id}>
                <td>{details.exercise}</td>
                <td>{details.duration}</td>
                <td>{new Date (details.date).toLocaleDateString("en-US")}</td>
                <td>{details.weight} kg</td>
                <td>{details.repetition}</td>
                <td>
                  <Link to= {`/update/${details.tracker_form_id}`}>
                    <button className="btn btn-edit">
                      Edit
                    </button>
                  </Link>
                  <button className="btn btn-delete" onClick= {()=>onDeleteUser(details.tracker_form_id)} >Delete</button>
                  
                </td>
                
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TrackerItem
