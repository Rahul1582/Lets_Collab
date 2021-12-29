const express = require("express");
const router = express.Router(); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validregister = require("../Validation/register");
const validlogin = require("../Validation/login");
const User = require("../models/user");
const secret = require("../config_details/sectoken");

const saltRounds = 8;


router.post('/register', (req,res,next) =>{

    const {flaws, isValid} = validregister(req.body);
    const name=req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if(!isValid){
        return res.json({status:500 , flaws,isValid});
    }

    User.findOne({$or: [{ email }, { name }] } , (err,user) =>{

        if(err){
            return res.json({status:500 , message : "Internal Server Error",isValid});
        }

        else if(user){

            if(user.email == email){
                return res.json({status:400 , message : "Email Already Exists",isValid});
            }

            else{
                return res.json({status:400 , message : "Name Already Exists ! Please Type a new one",isValid});
            }
            
        }

        else{

            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    
                    if(err){
                        return res.json({status:500 , message : "Internal Server Error",isValid}); 
                    }

                    User.create(
                        {
                          name: name,
                          email: email,
                          password: hash
                        },
                        (err, user)=> {
                          if (err) {
                            return res.json({ status: 500, message: "Internal Server Error" ,isValid});
                          } 
                          
                          else {
                              
                            return res.json({status: 200, message: "Registered Successfully | Login to Continue",isValid});
                        }
                    }
                    );
            });
            
        });
}
}); 

});


router.post("/login" ,(req,res,next)=> {

    const {flaws, isValid} = validlogin(req.body);

    if(!isValid){

        return res.json({status: 500 , flaws, isValid});
    }

    const email= req.body.email;
    const password = req.body.password;

    User.findOne({email} , (err,user) =>{

        if(err){
            return res.json({status:500 , message : "Internal Server Error",isValid});
        }

        else if(user){

            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {

                   const payload = {
                    user: {
                        id: user.id,
                        name: user.name,
                        email:user.email,
                      },
                   };

                   jwt.sign(payload, secret.sectoken(), (err, token) => {

                      if (err) {
                        return res.json({status:500 , message : "Internal Server Error",isValid});
                      }

                      else{
                        return res.json({status:200,message: "Login Success", token:token ,id:user.id,isValid});
                      }
                      
                   });
                } 
                
                else {
                   return res.json({ status:400 , message: "Check the Password Again. Password is Incorrect" ,isValid});
                }
             });


        }

        else{

            return res.json({status:404 , message:"User not Registered !",isValid});
        }
    });

});

module.exports = router;