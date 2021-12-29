import React, { useState, useEffect } from "react";
import axios from "axios";
import "./chatlist.css";
import ChatListItems from "./chatlistitems";
import { io } from "socket.io-client";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const socket = io.connect("https://lets-collab-backend.herokuapp.com/", {
  transports: ["websocket"]
});

export default function Chatlist(props) {
  const { setselectedroomid } = props;

  const [open, setopen] = useState(false);
  const [userid, setuserid] = useState("");
  const [roomtitle, setroomtitle] = useState("");
  const [allchatlists, setallchatlists] = useState([]);
  const [searchbar, setsearchbar] = useState("");

  useEffect(() => {
    axios
      .get("https://lets-collab-backend.herokuapp.com/chats/userid", {
        headers: {
          "x-access-token": localStorage.getItem("usertoken")
        }
      })
      .then((res) => {
        setuserid(res.data.userid);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userid]);

  useEffect(() => {
    axios
      .get("https://lets-collab-backend.herokuapp.com/chats/chatlist", {
        headers: {
          "x-access-token": localStorage.getItem("usertoken")
        }
      })
      .then((res) => {
        setallchatlists(res.data.chatlists);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // listen socket for creation of room for this user
    socket.removeAllListeners(`create-room-${userid}`);
    socket.on(`create-room-${userid}`, function (data) {
      setallchatlists((prevState) => {
        return [data.room, ...prevState];
      });
    });

    return () => {
      socket.removeAllListeners(`create-room-${userid}`);
    };
    // eslint-disable-next-line
  }, [allchatlists]);

  const handleClickOpen = () => {
    setopen(true);
  };

  const handleClose = () => {
    setopen(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setroomtitle(e.target.value);
  };

  const handleSubmit = () => {
    // emit create room action to backend with reqd data
    socket.emit("create-room", { userid: userid, roomtitle: roomtitle });
    setroomtitle("");
    setopen(false);
  };

  return (
    <div className="main__chatlist">
      <button className="btn-new" onClick={handleClickOpen}>
        <i className="fa fa-plus"></i>
        <span>New conversation</span>
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth="true"
      >
        <DialogTitle id="form-dialog-title" fontFamily="Bakbak One">
          New Room
        </DialogTitle>

        <DialogContent>
          <div className="dia">
            <input
              type="text"
              placeholder="Type Room Name(Max 25 Characters)"
              onChange={handleChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} type="button" class="btn btn-success">
            Cancel
          </button>
          <button onClick={handleSubmit} type="button" class="btn btn-success">
            Done
          </button>
        </DialogActions>
      </Dialog>
      <br />
      <div className="chatlist__heading">
        <h2>JOINED ROOMS</h2>
      </div>
      <br />
      <div className="chatList__search">
        <div className="search_wrap">
          <input
            type="text"
            placeholder="Search Rooms Here"
            required
            onChange={(e) => setsearchbar(e.target.value)}
          />
          <button className="search-btn">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="chatlist__items">
        {allchatlists.length === 0 ? (
          <div className="chatlist__heading1">
            <h3>No Rooms Created Or Joined</h3>
          </div>
        ) : (
          allchatlists
            // eslint-disable-next-line
            .filter((chat) => {
              if (searchbar === "") {
                return chat;
              } else if (
                chat.title.toLowerCase().includes(searchbar.toLowerCase())
              ) {
                return chat;
              }
            })
            .map((chat, index) => {
              return (
                <ChatListItems
                  key={index}
                  name={chat.title}
                  id={chat._id}
                  animationDelay={index + 1}
                  setselectedroomid={setselectedroomid}
                />
              );
            })
        )}
      </div>
    </div>
  );
}
