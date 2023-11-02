const express = require("express")
const { BlogsModel } = require("../models/blog.model")
const blogRouter = express.Router()


blogRouter.get("/",async(req,res)=>{
    try{
        const blogs = await BlogsModel.find();
        res.status(200).json({blogs})
  
    }catch(error){
        res.status(400).json(error.message)
    }
})

blogRouter.post("/blog",async(req,res)=>{
     const {username,title,content,catagory,date,likes,comments} = req.body
    try{
        const newBlog = new BlogsModel({username,title,content,catagory,date,likes,comments})
       await newBlog.save()
       res.status(200).json({msg:"Blog Created"})
    }catch(error){
        res.status(400).json(error.message)
    }
})

blogRouter.put("/blog/:id",async(req,res)=>{
    try{
        const blog = await BlogsModel.findByID(req.params.id)
        if(blog){
            blog.username = req.body.username
            blog.title = req.body.title
            blog.content = req.body.content
            blog.catagory = req.body.catagory
        }

        const updatedBlog = await blog.save()
        res.status(200).json({msg:"Blog Updated",blog:updatedBlog})

    }catch(error){
        res.status(400).json(error.message)
    }
})

blogRouter.delete("/blog/:id",async(req,res)=>{
    const {id} = req.params
    try{
        await BlogsModel.findByIdAndDelete(id)
        res.status(200).json({msg:"Blog Deleted"})
    }catch(error){
        res.status(400).json(error.message)
    }
})

module.exports = {
    blogRouter
}