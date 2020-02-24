import React from "react";
import "./Navbar.scss";
import { connect } from "react-redux";
import { logoutUser } from "./../Redux/Auth/authActions";
import { Link } from "react-router-dom";
function Navbar({ logoutUser, isAuthenticated, user }) {
  if (user.user) {
    console.log(user.user.name);
  }
  if (isAuthenticated) {
    return (
      <div className="Navbar">
        <nav className="Navbar-nav">
          <ul className="Navbar-list">
            <li className="Navbar-item">
              {user.user && <span>Hi, {user.user.name}</span>}
            </li>
            <li className="Navbar-item">Home</li>{" "}
            <li className="Navbar-item">Hobbies</li>
            <li className="Navbar-item" onClick={logoutUser}>
              Log out
            </li>
          </ul>
        </nav>
      </div>
    );
  } else {
    return (
      <div className="Navbar">
        <nav className="Navbar-nav">
          <ul className="Navbar-list">
            <li className="Navbar-item">Home</li>{" "}
            <Link to="/login">
              {" "}
              <li className="Navbar-item">Log in</li>
            </Link>
            <Link to="/register">
              {" "}
              <li className="Navbar-item">Register</li>
            </Link>
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps, { logoutUser })(Navbar);
