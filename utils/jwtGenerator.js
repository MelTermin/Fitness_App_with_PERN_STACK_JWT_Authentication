const jwt=require("jsonwebtoken");
const env=require('dotenv')
env.config();


function jwtGenerator(user_id) {
  const payload= {
    user: {id:user_id}
  }
  return jwt.sign(payload,process.env.jwtSecret, {expiresIn:"1hr"})
}

module.exports=jwtGenerator;
