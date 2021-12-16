import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import img1 from "../../images/home.jpg";
import "./home.css";

export default function Home() {
  return (
    <div className="hero">
      <div className="container-fluid">
        <br></br>

        <div className="row align-items-center text-center text-md-left">
          <div className="col-lg-4">
            <h1 className="mb-3 display-2">LET'S COLLAB</h1>
            <p className="mb-5 display-6">
            Meet, Chat and <br/> Collaborate in <br /> one place.
            </p>
            <Link to="/register">
              <Button variant="contained" color="primary">
                Register
              </Button>
            </Link>

            <br></br>
            <br></br>
            <Link to="/login">
              <Button variant="contained" color="primary">
                Login
              </Button>
            </Link>
          </div>

          <div className="col-lg-8">
            <br></br>
            <img src={img1} className="img-fluid" alt="img" />
          </div>
        </div>
      </div>

      <br></br>

    </div>
  );
}