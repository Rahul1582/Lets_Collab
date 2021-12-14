import React, { Component } from "react";
import "./chatbody.css";
import ChatList from "../chatlist/chatlist";
import ChatContent from "../chatcontent/chatcontent";;

export default class chatbody extends Component {
  render() {
    return (
      <div className="main__chatbody">
        <ChatList />
        <ChatContent />
      </div>
    );
  }
}