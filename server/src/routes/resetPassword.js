const express=require("express")
const resetUserPasswordController=require("../controller/resetPassword")
const router=express.Router()

router.post("/reset-password",resetUserPasswordController.resetUserPassword)

module.exports=router