import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../utils/actions/auth";

import Button from "../components/Button";
import "./SignupPage.css";

const SignupPage = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const { first_name, last_name, email, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === re_password) {
      signup(first_name, last_name, email, password, re_password);
      setAccountCreated(true);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  if (accountCreated) {
    // return <Redirect to="/login" />;
    return <Redirect to="/activation-email-sent" />;
  }

  return (
    <div className="signup">
      <h1>Sign up</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          placeholder="First Name"
          name="first_name"
          value={first_name}
          onChange={(e) => onChange(e)}
          required
        />

        <input
          type="text"
          placeholder="Last Name"
          name="last_name"
          value={last_name}
          onChange={(e) => onChange(e)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          required
        />

        <input
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          minLength="6"
          required
        />

        <input
          id="confirm-password"
          type="password"
          placeholder="Confirm Password"
          name="re_password"
          value={re_password}
          onChange={(e) => onChange(e)}
          minLength="6"
          required
        />

        <Button text="Sign up" submit />
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(SignupPage);
