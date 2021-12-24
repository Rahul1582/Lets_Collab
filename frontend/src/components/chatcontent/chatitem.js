import React,{useState ,useEffect} from "react";
import axios from "axios";

export default function Chatitem(props) {

  const id= props.userid;
  const name = props.name;
  const time= props.time;

  const [userid, setuserid] = useState('');

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

    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${userid == id ? "" : "other"}`}
      >

        <div className="chat__item__content">  
         <div className="chat__msg-name">{userid === id ? "You" : name}</div>   
        <div className="chat__msg">{props.msg}</div>
        <div className="chat__msg-time">{time}</div>
        </div>
      

        <div>
      
          </div>
      </div>

    );
  }
