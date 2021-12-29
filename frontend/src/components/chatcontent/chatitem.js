import React from "react";

export default function Chatitem(props) {

  const id = props.userid;
  const name = props.name;
  const time = props.time;

  const userid = localStorage.getItem('userid');

  return (
    <div
      style={{ animationDelay: `0.1s` }}
      className={`chat__item ${userid === id ? "" : "other"}`}
    >
      <div className="chat__item__content">
        <div className="chat__msg-name">{userid === id ? "You" : name}</div>
        <div className="chat__msg">{props.msg}</div>
        <div className="chat__msg-time">{time}</div>
      </div>
      <div></div>
    </div>
  );
}
