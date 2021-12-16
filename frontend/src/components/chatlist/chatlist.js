import React, {useState ,useEffect}  from "react";
import axios from "axios";
import "./chatlist.css";
import ChatListItems from "./chatlistitems";
import { io } from 'socket.io-client';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const socket = io.connect("http://localhost:8000/", {
  transports: ['websocket'],
});

export default function Chatlist(props){

  const {setselectedroomid} = props;

  const [open, setopen] = useState(false);
  const [userid, setuserid] = useState(false);
  const [roomtitle, setroomtitle] = useState('');
  const [allchatlists, setallchatlists] = useState([]);

  useEffect(() => {
       
    axios.get('http://localhost:8000/chats/userid', {        
    headers: {
      "x-access-token": localStorage.getItem("usertoken")
    }
    }).then((res) => {
        setuserid(res.data.userid);
        console.log(userid);
      })
      .catch((error) => {
        console.error(error)
      })

  }, [userid]);


  useEffect(() => {
       
    axios.get('http://localhost:8000/chats/chatlist', {        
    headers: {
      "x-access-token": localStorage.getItem("usertoken")
    }
    }).then((res) => {
        setallchatlists(res.data.chatlists);
        console.log(allchatlists);
      })
      .catch((error) => {
        console.error(error)
      })

  },[]);

  useEffect(() => {

    // listen socket for creation of room for this user
    socket.removeAllListeners(`create-room-${userid}`);
    socket.on(`create-room-${userid}`, function (data) {
      setallchatlists((prevState) => {
        return [...prevState, data.room];
      });
    });

    return () => {
      socket.removeAllListeners(`create-room-${userid}`);
    };

  },[allchatlists]);


  const handleClickOpen = () => {
    setopen(true);
    };

  const handleClose = () => {
    setopen(false);
    };

  const handleChange = (e) => {
    setroomtitle(e.target.value);
  };

  const handleSubmit = () => {
    // emit create room action to backend with reqd data
    socket.emit('create-room', { userid: userid, roomtitle: roomtitle });
    setopen(false);
  };

    return (
      <div className="main__chatlist">
        <button className="btn" onClick={handleClickOpen}>
          <i className="fa fa-plus"></i>
          <span>New conversation</span>
        </button>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title' fontFamily="Bakbak One">New Room</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='roomTitle'
            label='Type Room Name'
            type='text'
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Done
          </Button>
        </DialogActions>
      </Dialog>
        <br/>
        <div className="chatlist__heading">
          <h2>ALL ROOMS</h2>
        </div>
        <br/>
        <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" placeholder="Search Here" required />
            <button className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div className="chatlist__items">

          {allchatlists === undefined  ?

              <div className="chatlist__heading1">
                    <h2>No Rooms Created</h2>
              </div>

          :

          (allchatlists.map((chat, index) => {
            return (
              <ChatListItems
                key={index}
                name={chat.title}
                id={chat._id}
                animationDelay={index + 1}
                setselectedroomid={setselectedroomid}
              />
            );
          }))
          
          }
        </div>
      </div>
      
    );
}
