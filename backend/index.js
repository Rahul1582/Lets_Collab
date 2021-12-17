const express = require('express');
const connectdb = require('./config/dbconnection');
const cors = require("cors");
const http = require('http');
const path = require('path');
const bodyParser = require("body-parser");
const auth = require("./routes/auth");
const chats = require("./routes/chats");
const files = require("./routes/files");
const User = require("./models/user");
const Chatroom = require("./models/chatroom");

const app= express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

// User.pre('update',function(next) {
//     this.model('Chatroom').update(
//         { },
//         { "$pull": { "joinedusers": this._id } },
//         { "multi": true },
//         next
//     );
// })

// Chatroom.pre('update',function(next) {
//     this.model('User').update(
//         { },
//         { "$pull": { "joinedrooms": this._id } },
//         { "multi": true },
//         next
//     );
// })



// create a socket
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

connectdb();

// routes
app.use("/auth",auth);
app.use("/chats",chats);
app.use("/files",files);

io.on('connection',(socket)=>{

    try{

        socket.on('message', function (message) {
            // Broadcast any received message to all clients
            io.emit('message', message);
          });

        socket.on('create-room' , async function(room){

             try{

                console.log(room);

                const roomtitle = room.roomtitle;
                const userid = room.userid;

                let chatroom = new Chatroom({
                    title:roomtitle,
                    joinedusers:[userid],
                    msgarray:[],
                });

                await chatroom.save(async function(err,result){

                    if(err){
                        console.log('Chat room save error: **', err);
                        return;
                    }

                    try{

                        const roomid=result._id;

                        await User.updateOne(
                            {_id:userid},
                            { $push: { joinedrooms: roomid }}
                        )

                       await User.findOne({_id: userid}).populate({

                            path:'joinedrooms',
                            options:{ sort:{'createdAt':-1}}
                        })

                        io.emit(`create-room-${userid}`, { room: result});
                    }catch(err){

                        console.log('Chat room save error:', err);
                    }
                });
             } catch(err){
                res.status(401).send('Socket callback error');
             } 
        });
    }catch (err) {
        console.log('Error socket', err.message);
      }
});

const PORT = process.env.PORT || 8000;

app.get('/', (req,res) => {
    res.send('Welcome to Lets_Collab');
})

server.listen(PORT, ()=> console.log(`Server Started and running on port ${PORT}`));