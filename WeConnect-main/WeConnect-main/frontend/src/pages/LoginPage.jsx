import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../utils/actions/auth";
import Button from "../components/Button";

import "./LoginPage.css";

const LoginPage = ({ login, isAuthenticated }) => {
  let message;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    message = login(email, password);
    console.log(message)
  };

  if (isAuthenticated) {
    
    return <Redirect to="/" />;
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          required
        />
        <Link to="/reset-password">Forgot Password?</Link>
        <Button text="Login" submit />
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginPage);
