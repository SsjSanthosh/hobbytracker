import React from "react";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { loginUser } from "./../Redux/Auth/authActions";
import "./Login.scss";
import { connect } from "react-redux";
function Login({ loginUser, isAuthenticated }) {
  const [login, setLogin] = useState({ email: "", password: "" });
  const handleSubmit = e => {
    e.preventDefault();
    loginUser({ ...login });
  };
  const handleChange = e => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  if (isAuthenticated) {
    return <Redirect to="/hobbies/books" />;
  }
  return (
    <div className="Login-container">
      <p className="utc">Login to access all your activities</p>
      <form className="Login-form" onSubmit={handleSubmit}>
        <div className="form-input-div">
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            value={login.email}
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>
        <div className="form-input-div">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            value={login.password}
            placeholder="Enter your password"
            onChange={handleChange}
          />
          <button className="btn">Log in</button>
        </div>
      </form>
      <div className="form-input-div">
        <Link to="/register">New user? Sign up here!</Link>
      </div>
    </div>
  );
}
const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};
export default connect(mapStateToProps, { loginUser })(Login);
