import React, { useState } from "react";
import "./chatbody.css";
import ChatList from "../chatlist/chatlist";
import ChatContent from "../chatcontent/chatcontent";

export default function Chatbody() {
  const [selectedroomid, setselectedroomid] = useState("");

  return (
    <div className="main__chatbody">
      <ChatList setselectedroomid={setselectedroomid} />
      <ChatContent selectedroomid={selectedroomid} />
    </div>
  );
}
