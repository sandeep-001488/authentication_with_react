const User=require('../models/user')
const bcrypt=require("bcrypt")

const createUser=async(req,res)=>{
  try {
    const {name,email,password}=req.body
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const hashedPassword=await bcrypt.hash(password,10);
   const newUSer= User({
      name,
      email,
      password:hashedPassword,
      role:"user"
    })
    const savedUser=await newUSer.save();
    res.status(201).json({message:"user created succesfully",User:savedUser})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

module.exports={createUser}

// left doing {createUser}, {User:saveUser}