const express= require('express');
const router= express.Router();
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const keys = require("../../config/keys");
const passport = require("passport");
const organizer= require("../../models/organizer")

const validateRegisterInput= require("../../validation/register")
const validateLoginInput= require("../../validation/login")
router.post('/register',(req,res)=> {

const {errors, isValid}= validateRegisterInput(req.body);
if(!isValid){
    return res.status(400).json(errors);
}
organizer.findOne({email: req.body.email}).then(user=> {
    if(user){
         return res.status(400).json({email: "Email already exist!"})
    }
    else{
        const newOrganiser= new organizer({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        });
        bcrypt.genSalt(10,(err, salt)=> {
            bcrypt.hash(newOrganiser.password, salt,(err,hash) => {
                if(err) throw err;
                newOrganiser.password= hash;
                newOrganiser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err))

            })
        })
    }
})
})

router.post('/login', (req,res)=> {
    
    const {errors, isValid} = validateLoginInput(req.body);
    
    if(!isValid){
        return status(400).json(errors);
    }

     email= req.body.email,
     password= req.body.password
     
    organizer.findOne({email}).then(user =>{
    
    if(!user){
        return res.status(400).json({email: "User not found"});
    }
    else{
       bcrypt.compare(password, user.password).then(isMatch => {
           if(isMatch){
               const payload ={
                   id: user.id,
                   name: user.name
               }
            jwt.sign(
                payload,
                keys.secretOrKey,
                {
                    expiresIn: 31556926
                },
                (err, token) => {
                    res.json({
                        success: true,
                        token: "bearer" + token
                    })
                } 
            )
           }
           else{
                return res.status(400).json({passwordIncorrect: "Password is Incorrect" });
           }

       }) 
    }
    })
})

module.exports= router;
