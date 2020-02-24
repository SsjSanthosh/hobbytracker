import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { registerUser } from "./../Redux/Auth/authActions";
import { connect } from "react-redux";
function Register({ registerUser, isAuthenticated }) {
  const [register, setRegister] = useState({
    email: "",
    password: "",
    name: ""
  });
  const handleSubmit = e => {
    e.preventDefault();
    registerUser({ ...register });
  };
  const handleChange = e => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };
  if (isAuthenticated) {
    return <Redirect to="/hobbies/books" />;
  }
  return (
    <div className="register-container">
      <p className="utc">Register to start tracking your activities</p>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-input-div">
          <label for="name">Name</label>
          <input
            type="name"
            name="name"
            value={register.name}
            placeholder="Enter your name"
            onChange={handleChange}
          />
        </div>
        <div className="form-input-div">
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            value={register.email}
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>
        <div className="form-input-div">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            value={register.password}
            placeholder="Enter your password"
            onChange={handleChange}
          />
          <button className="btn">Register</button>
        </div>
      </form>
      <div className="form-input-div">
        <Link to="/login">Already registered? Log in here</Link>
      </div>
    </div>
  );
}
const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};
export default connect(mapStateToProps, { registerUser })(Register);
