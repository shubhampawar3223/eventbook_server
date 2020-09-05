const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
//const requireLogin  = require('../middleware/requireLogin')
const Post =  require("../../models/post");


router.get('/allpost',(req,res)=>{
    Post.find()
    .sort('-createdAt')
    .then((posts)=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })
    
})


router.post('/createpost',(req,res)=>{
    const {title,caption,photo,name,event_url} = req.body 
    console.log(req.body.title);
    console.log(req.body.caption);
    console.log(req.body.photo);
    console.log(req.body.name);
    console.log(req.body.event_url);
     if(!title || !caption || !photo || !name || !event_url){
      return  res.status(422).json({error:"Plase add all the fields"})
     }
    const post = new Post({
        title:req.body.title,
        caption:req.body.caption,
        photo:req.body.photo,
        name:req.body.name,
        event_url:req.body.event_url
        
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

// router.get('/mypost',requireLogin,(req,res)=>{
//     Post.find({postedBy:req.user._id})
//     .populate("PostedBy","_id name")
//     .then(mypost=>{
//         res.json({mypost})
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })

// router.put('/like',(req,res)=>{
//     Post.findByIdAndUpdate(req.body.postId,{
//         $push:{interested:req.user._id}
//     },{
//         new:true
//     }).exec((err,result)=>{
//         if(err){
//             return res.status(422).json({error:err})
//         }else{
//             res.json(result)
//         }
//     })
// })
// router.put('/unlike',requireLogin,(req,res)=>{
//     Post.findByIdAndUpdate(req.body.postId,{
//         $pull:{likes:req.user._id}
//     },{
//         new:true
//     }).exec((err,result)=>{
//         if(err){
//             return res.status(422).json({error:err})
//         }else{
//             res.json(result)
//         }
//     })
// })


// router.put('/comment',requireLogin,(req,res)=>{
//     const comment = {
//         text:req.body.text,
//         postedBy:req.user._id
//     }
//     Post.findByIdAndUpdate(req.body.postId,{
//         $push:{comments:comment}
//     },{
//         new:true
//     })
//     .populate("comments.postedBy","_id name")
//     .populate("postedBy","_id name")
//     .exec((err,result)=>{
//         if(err){
//             return res.status(422).json({error:err})
//         }else{
//             res.json(result)
//         }
//     })
// })

router.delete('/deletepost/:postId',(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("organizer","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.organizer._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})

module.exports = router


