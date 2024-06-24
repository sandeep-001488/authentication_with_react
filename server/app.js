require('dotenv').config();
// console.log(`Loaded secret key: ${process.env.SECRET_KEY}`);
const express=require("express")
const validator=require("validator")
const signupRoute=require("./src/routes/signup")
const loginRoute=require("./src/routes/login")
const authenticatedRoute=require("./src/routes/authenticated")
const resetPasswordRoute=require("./src/routes/resetPassword")
const {createAdminAccount}=require("./src/scripts/admin")
const bodyParser=require("body-parser")
const cors=require("cors")
const Port=process.env.PORT||5000

const app=express()
app.use(cors())

app.use(bodyParser.json())
createAdminAccount()
app.use("/user",signupRoute)
app.use("/user",loginRoute)
app.use('/api',authenticatedRoute)
app.use("/user",resetPasswordRoute)
app.listen(Port,()=>{

  console.log(`server is running at ${Port}`);
})