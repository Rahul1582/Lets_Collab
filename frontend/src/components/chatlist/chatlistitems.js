import React from "react";

export default function Chatlistttems(props){

  const {name,id,setselectedroomid}= props;
  

    return (
      <div
        style={{ animationDelay: `0.${props.animationDelay}s` }}
        onClick={() => {
          setselectedroomid(id);
        }}
        className={`chatlist__item ${
          props.active ? props.active : ""
        } `}
      >

        <div className="userMeta">
          <p>{name}</p>
        </div>
      </div>
    );
  }
