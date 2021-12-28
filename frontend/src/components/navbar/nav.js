import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./nav.css";

export default function Header() {
  const [loggedin, setloggedin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("loggedin") === "true") {
      if (!loggedin) {
        setloggedin(true);
      }
    }

    if (localStorage.getItem("loggedin") === "false") {
      if (loggedin) {
        setloggedin(false);
      }
    }
  }, [loggedin]);

  if (loggedin) {
    return (
      <nav className="navbar navbar-dark bg-dark sticky-top navbar-expand-lg font">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupported"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupported">
          <ul className="navbar-nav mr-auto">
            {/* <Typography  align="left" color="#4462ff" fontSize='35px' fontFamily={'Bakbak One'} paddingLeft={2}>MERN CHAT APPLICATION</Typography> */}

            <li className="heading">LET'S COLLAB</li>

            <li className="navbar-item font active">
              <Link
                to="/useraccount"
                className="nav-link"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                User Account
              </Link>
            </li>

            <li className="navbar-item font">
              <Link
                to="/dashboard"
                className="nav-link"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                Dashboard
              </Link>
            </li>

            <li className="navbar-item font">
              <Link
                to="/joinroom"
                className="nav-link"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                Join Room
              </Link>
            </li>

            <li className="navbar-item font">
              <Link
                to="/login"
                className="nav-link"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                Login
              </Link>
            </li>

            <li className="navbar-item font">
              <Link
                to="/register"
                className="nav-link"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                Register
              </Link>
            </li>

            <li className="navbar-item font">
              <Link
                to="/"
                className="nav-link"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
                onClick={() => {
                  window.localStorage.removeItem("loggedin");
                  window.localStorage.removeItem("usertoken");
                  window.location = "/";
                }}
              >
                {" "}
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar navbar-dark bg-dark sticky-top navbar-expand-lg font">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupported"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupported">
          <ul className="navbar-nav mr-auto">
            <li className="heading">LET'S COLLAB</li>

            <li className="navbar-item font">
              <Link
                to="/register"
                className="nav-link"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                Register
              </Link>
            </li>

            <li className="navbar-item font">
              <Link
                to="/login"
                className="nav-link"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
