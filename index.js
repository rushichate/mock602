const express = require("express")
const cors = require("cors")
const { auth } = require("./backend/middleware/authorization")
const { serverDB } = require("./backend/db")
const { userRouter } = require("./backend/routes/user.route")
const { blogRouter } = require("./backend/routes/blog.route")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    try{
        res.status(200).json("welcome to blogging app")
    }catch(error){
        console.log(error)
    }
})
app.use("/users",userRouter)
app.use(auth)
app.use("/blogs",blogRouter)

app.listen(process.env.port,async(req,res)=>{
    try{
          await serverDB
          console.log(`connectd to database and running on port ${process.env.port}`)
    }catch(error){
        console.log(error)
    }
})