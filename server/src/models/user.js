const { Error } = require("mongoose");
const mongoose=require("../db/conn")
const validator=require('validator')

const userSchema=new mongoose.Schema({
  name:{
    type:String,
    minlength:3,
    required:true,
  },
  email:{
    type:String,
    minlength:3,
    unique:[true,"email is already present "],
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("email is invalid")
      }
    },
    required:true,
  },
  password:{
    type:String,
    minlength:4,
    required:true,
  }, 
  role:{
    type:String,
    enum:["admin","user"],
    default:"user"
  }
})

const User=new mongoose.model("User",userSchema);
module.exports=User