const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    caption:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    interested:[{type:ObjectId,ref:"User"}],
    name:{
       type:String,
       required:true
    },
    event_url:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model("Post",postSchema)
