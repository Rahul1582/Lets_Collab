const express = require("express");
const router = express.Router(); 
const jwt = require("jsonwebtoken");
const verifytoken = require("../middleware/verifytoken");
const Chatroom = require("../models/file.js");
const User = require("../models/user");
const File = require("../models/file");

router.get('/allfiles' , verifytoken, (req,res)=>{

    const userid = req.user.id;

    User.findById({_id:userid}, (err,user)=>{

        if(err){

            return res.json({status:500 , message : "Internal Server Error"});

        }

        else{

            File.find({roomid:{$in:user.joinedrooms}}, (err,file)=>{

                if(err){

                    return res.json({status:401 , message : "Internal Server Error"});

                }

                else{

                    return res.json({status:200, message:"Successful" , filesarray:file})
                }


            })

        }
    })
})

module.exports = router;