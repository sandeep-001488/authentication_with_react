const User=require("../models/user")
const bcrypt=require("bcrypt")

async function createAdminAccount(){
  try {
    const admin=await 
     User.findOne({email:"sandeepsandeepsanu1230@gmail.com"})
    if(!admin){
   const newAdmin=   new User({
        name:"Sandeep Kumar",
        email:"sandeepsandeepsanu1230@gmail.com",
        password:await bcrypt.hash("admin",10),
        role:"admin"

      })
      await newAdmin.save()
      console.log("admin created successfully");
    } else{
      console.log("admin already exist");
    }
  } catch (error) {
    console.log(`error found in creating admin account${error}`)
  }
}

module.exports={createAdminAccount}