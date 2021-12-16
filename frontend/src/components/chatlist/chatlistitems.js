import React from "react";

export default function Chatlistttems(props){

  const {setselectedroomid}= props.setselectedroomid;
  const {id} = props.id;

    return (
      <div
        style={{ animationDelay: `0.${props.animationDelay}s` }}
        onClick={() => 
          {setselectedroomid(id);}
        }
        className={`chatlist__item ${
          props.active ? props.active : ""
        } `}
      >

        <div className="userMeta">
          <p>{props.name}</p>
        </div>
      </div>
    );
  }
