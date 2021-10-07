const express = require("express");
const router = express.Router(); 
const jwt = require("jsonwebtoken");
const verifytoken = require("../middleware/verifytoken");
const chatroom = require("../models/chatroom");
const User = require("../models/user");

router.get('/chatlist',verifytoken, (req,res)=>{

    const userid = req.user.id;

    User.findOne({_id: userid}, (err,user)=>{

        if(err){

            return res.json({status:500 , message : "Internal Server Error"});
        }

        else{

            const user = User.findOne({_id: userid}).populate({

                path:'joinedrooms',
                options:{ sort:{'updatedAt':-1}}
            })

            user.populate({

                path:'joinedrooms',
                options:{ sort:{'updatedAt':-1}}
            })
        
            const chatlists = user.joinedrooms;

            return res.json({status:200 , message : "Successful", chatlists});

        }
    })

}) ;

router.get('/chat-room/:roomid', verifytoken, (req,res)=>{

    const roomid = req.params.roomid;

    





});

router.post('/create-chat-meet-room',auth,chatController.createChatMeetRoom) ;

// join chat room
router.post('/invite/:chatRoomId',auth,chatController.joinChatRoom) ;

module.exports = router ;