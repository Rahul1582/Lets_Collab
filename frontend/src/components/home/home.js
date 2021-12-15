import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import './home.css';

export default function Home() {
 
    return (
      <div className='main-div'>
        <h1>LET'S COLLAB </h1>
        <br /><br/>
        <p>
          Meet, Chat and <br/> Collaborate in <br /> one place.
        </p>
        <br /><br/>

       <div className="btn1">
            <Link to='/login'>
            <Button variant="contained" color="success">Sign In</Button>
            </Link>
            <Link to='/register'>
            <Button variant="contained" color="success">Sign Up</Button>  
            </Link>
            </div>
      </div>
    );
  }

