const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    username:{type:String,required:true},
    title:{type:String,required:true},
    content:{type:String,required:true},
    catagory:{type:String,required:true,enum:['Business', 'Tech', 'Lifestyle', 'Entertainment']},
    date: {type:String,required:true},
    likes:{type:Number,default:0},
    comments:[{username:String,content:String}]
},
{
    versionKey:false
})

const BlogsModel = mongoose.model("blog",blogSchema)

module.exports = {
    BlogsModel
}