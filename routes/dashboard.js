const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../db");


router.get("/", authorization, async (req, res) => {
  try {
    
    const user = await pool.query(
      "SELECT u.user_name, t.tracker_form_id, t.exercise, t.repetition, t.weight,t.duration, t.date from users AS u LEFT JOIN tracker_form AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
      [req.user.id]);
    
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


//create a trackeritem

router.post("/tracker", authorization, async (req, res) => {
  try {
    const {exercise,repetition,weight,duration,date}= req.body
    console.log(req.body)
    const newTrackerItem = await pool.query(
      "INSERT INTO tracker_form (user_id,exercise,repetition,weight,duration,date) VALUES ($1, $2, $3,$4, $5, $6) RETURNING *",
      [req.user.id,exercise,repetition,weight,duration,date]
    );

    res.json(newTrackerItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});



//update a trackeritem

router.put("/tracker/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const {exercise,repetition,weight,duration,date}= req.body
    console.log(req.body)
    const newTrackerItem = await pool.query(
      "UPDATE tracker_form SET exercise= $1, repetition=$2, weight=$3 ,duration=$4, date=$5 WHERE tracker_form_id=$6 AND user_id = $7 returning *",[ exercise,repetition,weight,duration,date,id,req.user.id]
    );

    if (newTrackerItem.rows.length === 0) {
      return res.json("This tracker is not yours");
    }

    res.json(newTrackerItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


//delete a trackerItem

router.delete("/tracker/:id",authorization, async(req,res) => {
  try {
    const { id } = req.params;
    const deleteTrackerItem= await pool.query("DELETE from tracker_form where tracker_form_id=$1  AND user_id = $2 RETURNING *", [id,req.user.id])
    
    if (deleteTrackerItem.rows.length === 0) {
      return res.json("This trackerItem is not yours");
    }

    res.json("TrackerItem was deleted");
  
  }catch (err) {
    console.log(err.message)
  }
})



module.exports = router;