const jwt=require("jsonwebtoken")
const {secretKey}=require("../db/jwtConfig")
function generateToken(user){
  const payload={
    id:user._id,
    email:user.email,
    role:user.role
  }
  return jwt.sign(payload,secretKey,{expiresIn:"1h"})
}
function generateFreshToken(user){
  const payload={
    id:user._id,
    email:user.email,
    role:user.role
  }
  return jwt.sign(payload,secretKey,{expiresIn:"7h"})
}

function verifyToken(token){
  return jwt.verify(token,secretKey)
}

module.exports={generateToken,generateFreshToken,verifyToken}