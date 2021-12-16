import React from "react";
import "./chatbody.css";
import ChatList from "../chatlist/chatlist";
import ChatContent from "../chatcontent/chatcontent";;

export default function chatbody() {

    return (
      <div className="main__chatbody">
        <ChatList />
        <ChatContent />
      </div>
    );
  }
