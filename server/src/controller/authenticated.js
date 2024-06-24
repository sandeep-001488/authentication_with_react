const User=require("../models/user")

async function getUser(req,res){
  try {
    const userId=req.user.id
    const user=await  User.findById(userId)
 if(!user){
      res.status(404).json({message:"User not found "})
    }
    res.json(user)
    
  } catch (error) {
    res.status(500).json({message:"inrternal server error "})
  }
}


module.exports={getUser}