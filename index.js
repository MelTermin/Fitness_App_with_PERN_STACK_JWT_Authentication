const express=require("express");
const app=express();
const cors=require("cors");
const path = require('path')
const env=require('dotenv')
env.config();

app.use(cors());
app.use(express.json());//this code allows me to access req.body

//register & login routes//
app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard",require("./routes/dashboard"))


app.listen(process.env.PORT,()=> {
  console.log(`the server is running on port` + process.env.PORT)
})