const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/user.model")
const userRouter = express.Router()


userRouter.post("/register",async(req,res)=>{
     const {username,avatar,email,password} = req.body
    try{
        const isEmailPresent = await UserModel.findOne({email})
        if(isEmailPresent){
            return res.status(200).json({msg:"Email already present"})
        }
        const hashedPassword = bcrypt.hashSync(password,5)
        const user = new UserModel({username,avatar,email,password:hashedPassword})
        await user.save()
        res.status(200).json({msg:"registration successful"})
    }catch(error){
        res.status(400).json(error.message)
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try{
         const isEmailValid = await UserModel.findOne({email})
         if(!isEmailValid){
            return res.status(200).json({msg:"This email not registered with us"})
         }
         const isPasswordValid = bcrypt.compareSync(password,isEmailValid.password)
         if(!isPasswordValid){
            return res.status(200).json({msg:"Wrong Credentials"})
         }
         
         const token = jwt.sign({userID:isEmailValid._id,username:isEmailValid.username},"masai")
         res.status(200).json({msg:"Login successful",token:token,name:isEmailValid.username})

    }catch(error){
        res.status(400).json(error.message)
    }
})

module.exports = {
    userRouter
}

