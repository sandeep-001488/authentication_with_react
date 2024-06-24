const express=require("express")
const signUpController=require("../controller/signup")

const router=new express.Router()


router.post("/register",signUpController.createUser)


module.exports=router