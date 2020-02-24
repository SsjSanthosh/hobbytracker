import React from "react";
import "./Landing.scss";
import { Link } from "react-router-dom";
export default function Landing() {
  return (
    <div className="container demo">
      <div className="">
        <div className="content">
          <div id="">
            <h1 className="main-title">
              Hobby Tracker
              <br />
              <span className="thin">Never miss a beat.</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="landing-btn-div">
        <Link to="/login">
          <button className="btn">Login</button>
        </Link>
        <Link to="/register">
          <button className="btn">Register</button>
        </Link>
      </div>
    </div>
  );
}
