const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/authentication",{
  serverSelectionTimeoutMS:5000
})
mongoose.connection.on("connected",()=>{
  console.log("mongo db connected");
})

mongoose.connection.on("error",(error)=>{
  console.log("connection failed",error);
})

module.exports=mongoose