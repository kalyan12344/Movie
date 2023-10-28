const express=require('express');
const connection=require('./config/database')
const userRouter = require("./routes/user.router");
const app=express();
var cors = require('cors')
app.use(cors()) // Use this after the variable declaration
require("dotenv").config();

const port=process.env.PORT||8080;

app.listen(port,()=>{
  console.log(`Rest API listening at port ${port}`);
});


app.use(express.json());
app.use("/user", userRouter);

module.exports =app;
