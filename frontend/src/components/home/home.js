import React from "react";
import { Link } from "react-router-dom";
import img1 from "../../images/home.jpg";
import "./home.css";

export default function Home() {
  return (
    <div className="hero">
      <div className="container-fluid">
        <br></br>

        <div className="row align-items-center text-center text-md-left">
          <div className="col-lg-5">
            <h1 className="mb-3 display-1">LET'S COLLAB</h1>
            <p className="mb-5 display-6">
              Meet, Chat and <br /> Collaborate in <br /> one place.
            </p>
            <Link to="/register">
              <button type="button" class="btn btn-primary">
                Register
              </button>
            </Link>

            <br></br>
            <br></br>
            <Link to="/login">
              <button type="button" class="btn btn-primary" >
                Login
              </button>
            </Link>
          </div>

          <div className="col-lg-7">
            <br></br>
            <img src={img1} className="img-fluid" alt="img" />
          </div>
        </div>
      </div>

      <br></br>
    </div>
  );
}
