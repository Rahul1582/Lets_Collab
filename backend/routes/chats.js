const express = require("express");
const router = express.Router(); 
const jwt = require("jsonwebtoken");
const verifytoken = require("../middleware/verifytoken");
const Chatroom = require("../models/chatroom");
const User = require("../models/user");
const transporter = require("../config/nodemailer");

// Get the full chat list

router.get('/userid', verifytoken, (req,res)=>{

    const userid = req.user.id;

    User.findOne({_id: userid}, async (err,user)=>{

        if(err){

            return res.json({status:500 , message : "Internal Server Error"});
        }

        else{

            return res.json({status:200 , message : "Successful", userid});

        }
    })

})

router.get('/username', verifytoken, (req,res)=>{

    const userid = req.user.id;

    User.findOne({_id: userid}, async (err,user)=>{

        if(err){

            return res.json({status:500 , message : "Internal Server Error"});
        }

        else{

            return res.json({status:200 , message : "Successful", user});

        }
    })

})

router.get('/chatlist',verifytoken, (req,res)=>{

    const userid = req.user.id;

    User.findOne({_id: userid}, async (err,user)=>{

        if(err){

            return res.json({status:500 , message : "Internal Server Error"});
        }

        else{

            const userdetails = await User.findOne({_id: userid}).populate({

                path:'joinedrooms',
                options:{ sort:{'createdAt':-1}}
            })
        
            const chatlists = userdetails.joinedrooms;

            return res.json({status:200 , message : "Successful", chatlists});

        }
    })

}) ;


// Get a particular chat using roomid
router.get('/chatroom/:roomid', verifytoken, (req,res)=>{

    const roomid = req.params.roomid;
    
    Chatroom.findById(roomid, async (err,chatroom)=>{

        
        if(err){

            return res.json({status:500 , message : "Internal Server Error"});
        }

        else{

            const usernames = [];

            const room = await Chatroom.findById(roomid).populate('joinedusers','name');

            // console.log(room.joinedusers);

            for(const user of room.joinedusers){
                usernames.push(user.name);
            }

            return res.json({status:200, chatroom, usernames, message:"Success"});
        
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

        else if(chatroom!=null)
        {

            if(chatroom.joinedusers.includes(userid)){

                return res.json({status:400 , message : "User Already Joined"});
            }

            else if(chatroom.joinedusers.length===10){
                
                return res.json({status:400 , message : "Already 10 Participants are there."});
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

    else{
        return res.json({status:500 , message : "Room Doesnot Exists"});
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