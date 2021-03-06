const Pool=require("pg").Pool;
const env=require('dotenv')
env.config();

const pool= new Pool({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  port:process.env.DB_PORT,
  database:process.env.DB_DATABASE,
  ssl:{rejectUnauthorized:false},
 
});

module.exports=pool;