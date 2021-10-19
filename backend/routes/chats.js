const express = require("express");
const router = express.Router(); 
const jwt = require("jsonwebtoken");
const verifytoken = require("../middleware/verifytoken");
const Chatroom = require("../models/chatroom");
const User = require("../models/user");
const transporter = require("../config/nodemailer");

// Get the full chat list
router.get('/chatlist',verifytoken, (req,res)=>{

    const userid = req.user.id;

    User.findOne({_id: userid}, (err,user)=>{

        if(err){

            return res.json({status:500 , message : "Internal Server Error"});
        }

        else{

            user.populate({

                path:'joinedrooms',
                options:{ sort:{'updatedAt':-1}}
            })
        
            const chatlists = user.joinedrooms;

            return res.json({status:200 , message : "Successful", chatlists});

        }
    })

}) ;


// Get a particular chat using roomid
router.get('/chatroom/:roomid', verifytoken, (req,res)=>{

    const roomid = req.params.roomid;

    Chatroom.findById(roomid, (err,chatroom)=>{

        if(err){

            return res.json({status:500 , message : "Internal Server Error"});
        }

        else{

            // chatroom.populate('joinedusers');
            chatroom.joinedusers.forEach(function(each) {
                console.log('Office name: ', each.name);
            });      //  chatroom.populate('joinedusers');

            console.log(chatroom.joinedusers[0]);

            // const users=chatroom.joinedusers.name;

            // console.log(room);

            // for(const user of room){
            //     console.log(user);
            // }

            return res.json({status:200, chatroom, message:"Success"});

        }
    })

});

router.post('/create-chatroom',verifytoken, (req,res)=>{

    const {useremails,roomname,joinedusers,starttime} = req.body;

    Chatroom.findOne({title:roomname},(err,chatroom)=>{

        if(err){

            return res.json({status:500 , message : "Internal Server Error"});
        }

        else if(chatroom){

            return res.json({status:400 , message : "Chatroom with this Title Already Exists"});
        }


        else{
            let room = new Chatroom({
                title: roomname,
                joinedusers:req.user.id                
            })

           room.save((err, result) =>{

                if (err) {
                    return res.json({status: 500, message: "Internal Server Error"});
                }

                else{

                    
               // for(const email of useremails){
            //     mailFunction(email,roomname,starttime,user.name,user.email,room._id);
            // }

            // useremails.forEach((email) => {
            //     mailFunction(email,roomname,starttime,user.name,user.email,room._id);
                //  });

                //  return res.json({status: 200, message: "Chatroom Successfully Created"});

                User.findOneAndUpdate({_id:req.user.id},{$push:{joinedrooms:room._id}},{new:true},(err,user)=>{

                    if(err){

                        return res.json({status:500 , message : "Internal Server Error while creating the chatroom"});
                    }

                    else{

                        return res.json({status:200 , message : "Chatroom Successfully Created"});
                    }

                })

            }

            })
        }
    })

}) ;

// Joining via Invite Link
router.post('/invitelink/:chatroomid',verifytoken,(req,res)=>{

    const chatroomid = req.params.chatroomid;

    const userid = req.user.id;

    Chatroom.findById({_id:chatroomid},(err, chatroom) =>{

        if(err){

            return res.json({status:500 , message : "Room Doesnot Exists"});
        }

        else{

            if(chatroom.joinedusers.includes(userid)){

                return res.json({status:200 , message : "User Already Joined"});
            }

            else{

                Chatroom.findOneAndUpdate({_id:chatroomid},{$push:{joinedusers:userid}},{new:true},(err,chatroom)=>{

                    if(err){

                        return res.json({status:500 , message : "Internal Server Error while Joining"});
                    }

                    else{

                        User.findOneAndUpdate({_id:userid},{$push:{joinedrooms:chatroomid}},{new:true},(err,user)=>{

                            if(err){

                                return res.json({status:500 , message : "Internal Server Error while Updating the data"});
                            }

                            else{

                                return res.json({status:200 , message : "User Successfully Joined"});
                            }

                        })


                    }
                })
            }


        }
    })


});


const mailFunction = (sendto,roomname,starttime,username,useremail,roomid) => {

    let smtpTransport = transporter;
    let date = new Date(starttime) ;
  
    let mailOptions = {
      from: `patrokumarrahul@gmail.com`,
      to: `${sendto}`,
      subject: 'Room Joining Invitation Mail',
      html: `
              <h4> Invitation to Join the Room: <u>${roomname}</u> on ${date} by ${username} with email : ${useremail}  </h4>
              <br />
              <h3> <a href="https://lets_collab.vercel.app/invitelink/${roomid}"> Join Using This Link </a> </h3>
          `,
    };
  
    smtpTransport.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.log('Mail Not Sent', err);
      } else {
        console.log('Mail Sent');
      }
    });
  };

module.exports = router ;