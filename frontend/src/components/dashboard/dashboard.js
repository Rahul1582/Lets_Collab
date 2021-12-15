import React from 'react';
import Chatbody from '../chatbody/chatbody';
import './dashboard.css';
import Nav from '../navbar/nav';

function dashboard() {
    return (

      <div>
       <Nav/>
        <div className="__main">
        <Chatbody />
        </div>
      </div>
 
    )
}

export default dashboard;
