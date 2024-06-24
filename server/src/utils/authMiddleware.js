// const jwt=require("jsonwebtoken")
// const {secretKey}=require("../db/jwtConfig");


// function authenticateToken(req,res,next){
//   const authHeader=req.header("Authorization")
//   if(!authHeader){
//     return res.status(401).json({message:"Unauthorized: missing token"})
//   }

//   const [bearer,token]=authHeader.split(" ");
//   if(bearer!=="Bearer" || !token){
//     return res.status(401).json({message:"Unauthorized:Invalid token format"})
//   }
//   jwt.verify(token,secretKey,(err,user)=>{

//     if(err){
//       return res.status(401).json({message:"forbidden:invalid token"})
//     }
//     req.user=user;
//     next();
//   })
// }


// module.exports={authenticateToken}


const jwt = require("jsonwebtoken");
const { secretKey } = require("../db/jwtConfig");

function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: missing token" });
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Unauthorized: Invalid token format" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Forbidden1: token expired" });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Forbidden2: invalid token" });
      } else {
        return res.status(401).json({ message: "Forbidden: token verification failed" });
      }
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
