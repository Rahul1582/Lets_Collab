import React from "react";

export default function Chatitem(props) {

    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${props.user ? props.user : ""}`}
      >
        <div className="chat__item__content">
          <div className="chat__msg">{props.msg}</div>
        </div>
        <div>
          <br></br>
          </div>
      </div>
    );
  }
