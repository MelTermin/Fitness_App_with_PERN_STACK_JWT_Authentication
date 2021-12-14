const express=require("express");
const app=express();
const cors=require("cors");

app.use(cors());
app.use(express.json());//this code allows me to access req.body

//register & login routes//

app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard",require("./routes/dashboard"))


app.listen(4000,()=> {
  console.log("the server is running on port 4000")
})