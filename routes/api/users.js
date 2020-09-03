const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateProfileInput= require("../../validation/profile");

const User = require("../../models/user");

router.post("/register", (req, res) => {
  
  console.log("Register")
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});


router.post("/login", (req, res) => {
  

  const { errors, isValid } = validateLoginInput(req.body);

  
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;


  User.findOne({ email }).then(user => {

    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }


    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
    
        const payload = {
          id: user.id,
          name: user.name
        };

        
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });

  });
});

router.get("/profile/:email",(req,res)=>{
  console.log("profile");
  User.findOne({"email":req.params.email},function(err, profileInfo){
            if(err){
              next(err)
            }else{
              res.json({status: "successfull" , message:"Here is your info..." , data:{userdata: profileInfo}})
            }
  })
})



router.put("/profile/:email",(req,res)=>{
  
   const {error, isValid}= validateProfileInput(req.body)     
   
   if (!isValid) {
     console.log("abb")
    return res.status(400).json(errors);
  }else{
    console.log("updateprofile");
    User.findOneAndUpdate({"email":req.params.email},{name:req.body.name, email:req.body.email, password:req.body.password, firstName: req.body.firstName, lastName: req.body.lastName, dob: req.body.dob, collageName: req.body.collageName, gradYear: req.body.gradYear, gender: req.body.gender, mobileNo: req.body.mobileNo, interests:req.body.interests},function(err,result){
    if(err){
      next(err)
    }else{
      res.json({status:"successful", message:"Info Updated successfully..", data:null})
    }

    })
  }
 })

module.exports = router;
