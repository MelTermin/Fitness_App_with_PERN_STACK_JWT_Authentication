const router=require("express").Router();
const pool= require("../db")
const bcrypt=require("bcrypt");
const jwtGenerator=require("../utils/jwtGenerator");
const validInfo=require("../middleware/ValidInfo");
const authorization=require("../middleware/authorization");

//register

router.post("/register", validInfo, async(req,res)=> {
  try {
    const {email,password,name}=req.body;
    const user= await pool.query("SELECT * FROM users WHERE user_email=$1",[email]);
    //res.json(user.rows)
    if(user.rows.length !==0) {// if the user exists//
      return res.status(401).send("User already exists")
    } //if user if registering for the first time
    const saltRound=10;
    const salt=await bcrypt.genSalt(saltRound);
    const bcryptPassword= await bcrypt.hash(password,salt);
  
    const newUser= await pool.query("INSERT INTO users(user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *",[name, email,bcryptPassword])

    // res.json(newUser.rows[0])

    const token=jwtGenerator(newUser.rows[0].user_id);

    res.json({token})
  
  } catch(err) {
    console.log(err.message)
    res.status(500).send("server error")
  }
})


//login route

router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email
    ]);

    if (user.rows.length === 0)  {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verify",authorization, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


module.exports=router;