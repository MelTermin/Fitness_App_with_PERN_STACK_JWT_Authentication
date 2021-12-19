const jwt=require("jsonwebtoken");
const env=require('dotenv')
env.config();


module.exports=function (req,res,next) {
  
    const jwtToken=req.header("token");

    if(!jwtToken) {
      return res.status(403).json("Not authorized")
    }
    try{
    const payload=jwt.verify(jwtToken,process.env.jwtSecret);
    
    req.user=payload.user;
    next();
  }catch(err) {
    console.log(err.message)
    return res.status(403).json("Not authorized")
  }
}