const mongoose=require("mongoose")
require("dotenv").config()

const DB=`${process.env.URL}`
mongoose.connect(DB,{
  serverSelectionTimeoutMS:5000
})
mongoose.connection.on("connected",()=>{
  console.log("mongo db connected");
})

mongoose.connection.on("error",(error)=>{
  console.log("connection failed",error);
})

module.exports=mongoose