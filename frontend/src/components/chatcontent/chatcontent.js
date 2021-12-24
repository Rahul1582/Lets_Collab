import React, {useState ,useEffect, useRef} from "react";
import axios from "axios";
import copy from "copy-to-clipboard";  
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import "./chatcontent.css";
import ChatItem from "./chatitem";
import { io } from 'socket.io-client';

const socket = io.connect("http://localhost:8000/", {
  transports: ['websocket'],
});

export default function Chatcontent(props) {

  const roomid = props.selectedroomid;

  const [open, setopen] = useState(false);
  const messagesendref = useRef(null);
  const [roomname,setroomname]  =useState('');
  const [userid, setuserid] = useState('');
  const [username, setusername] = useState('');
  const [roommembers,setroommembers]  =useState([]);
  const [textroomid, settextroomid] = useState('');
  const [msg, setmsg] = useState('');
  const [msgarray, setmsgarray] = useState([]);

  const scrollToBottom = () => {
    messagesendref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  

  useEffect(() => {
       
    axios.get(`http://localhost:8000/chats/chatroom/${roomid}`,
    {        
    headers: {
      "x-access-token": localStorage.getItem("usertoken")
    }
    }).then((res) => {
        // console.log(res.data);
        setroomname(res.data.chatroom.title);
        setroommembers(res.data.usernames);
        settextroomid(res.data.chatroom._id);
        setmsgarray(res.data.chatroom.msgarray);
      })
      .catch((error) => {
        console.error(error)
      })

  },[roomid]);

  useEffect(() => {
    // listener for latest message on selected room
    socket.removeAllListeners(`${roomid}`);
    socket.on(`${roomid}`, function (data) {
      setmsgarray((prevState) => {
        return [...prevState, data.finalmessage];
      });
    });

    return (()=>{
    socket.removeAllListeners(`${roomid}`);
    })
  }, [roomid]);

  useEffect(() => {
    scrollToBottom();
  }, [msgarray]);

  useEffect(() => {
       
    axios.get('http://localhost:8000/chats/userid', {        
    headers: {
      "x-access-token": localStorage.getItem("usertoken")
    }
    }).then((res) => {
        setuserid(res.data.userid);
        // console.log(userid);
      })
      .catch((error) => {
        console.error(error)
      })

  }, [userid]);

  useEffect(() => {
       
    axios.get('http://localhost:8000/chats/username', {        
    headers: {
      "x-access-token": localStorage.getItem("usertoken")
    }
    }).then((res) => {
       setusername(res.data.user.name);
      })
      .catch((error) => {
        console.error(error)
      })

  },[username]);

  const onStateChange = (e) => {
    e.preventDefault();
    setmsg(e.target.value);
  };

    const handleClickOpen = () => {
    setopen(true);
    };

    const formatteddate = (date) => {
      return new Date(Date.parse(date)).toLocaleDateString("en-US", {
         dateStyle: "long"
      });
   };

    
    const handlecopytext = () => {
      copy(textroomid);
      alert(`Copied the Room ID Sucessfully!! Share with your friends`);
     
    };

    const handleSubmit = (e, roomid, username, userid) =>{

      e.preventDefault();
      var currentdate = new Date();
      var time = currentdate.getHours() + ':' + currentdate.getMinutes();

      if(msg.trim() !== '' ){
        socket.emit('sendmessage', {
          userid:userid,
          time: formatteddate(currentdate) + " " + time,
          message: msg,
          username:username,
          roomid:roomid
        });

        scrollToBottom();
      }

      console.log(msg);

    };

    
    const leaveroom = () => {
      socket.emit('leave-room', { userid: userid, roomid: roomid });
      alert(`Room Left`);
      window.location.reload();
    };


    if(!roomid){

        return (
        <div className="main__chatcontent1">
        <h2 color="white">Create a new room / Select an existing room to see the chats</h2>
        </div>
        );
      }
      

  else{

        return(

        <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <p>{roomname}</p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">

            <button className="btn-nobg" onClick={handlecopytext}>
                <span fontFamily="Bakbak One">Copy Room ID</span>
            </button>

            <button className="btn-nobg" onClick={handleClickOpen}>
                <span fontFamily="Bakbak One">Room Participants</span>
            </button>

            <button className="btn-nobg" onClick={() => {if(window.confirm('Are you sure you want to Leave this Room?'))leaveroom()}}>
                <span fontFamily="Bakbak One">Leave Room</span>
            </button>

                    <Dialog
                    open={open}
        onClose={() => setopen(false)}
        aria-labelledby='simple-dialog-title'
      >
        <DialogTitle id='simple-dialog-title' fontFamily="Bakbak One">Participants List</DialogTitle>
        <List>
          {roommembers.map((p) => (
            <ListItem fontFamily="Bakbak One">
              <ListItemAvatar fontFamily="Bakbak One" >
                <Avatar>
                  <PersonIcon fontFamily="Bakbak One"/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText fontFamily="Bakbak One" primary={p} />
            </ListItem>
          ))}
        </List>
      </Dialog>
              {/* <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button> */}
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            {msgarray.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  userid = {itm.userid}
                  msg={itm.message}
                  name = {itm.username}
                  time = {itm.time}
                />
              );
            })}
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button>
            <input
              type="text"
              placeholder="Type a message here"
              onChange={onStateChange}
            />
            <button className="btnSendMsg" id="sendMsgBtn" type="submit" onClick={(e) =>
              handleSubmit(e, roomid, username, userid)
            }>
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>

        );

      }
      
  }
