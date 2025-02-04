import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../utils/actions/auth";

import "./ResetPasswordPage.css";

const ResetPasswordPage = ({ reset_password }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    setRequestSent(true);
    reset_password(email);
  };

  if (requestSent) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="resetPassword">
      {!requestSent ? (
        <>
          <h1>Reset Password</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
            <button className="btn" type="submit">
              Reset Password
            </button>
          </form>
        </>
      ) : (
        <h1>A link was sent to your Email to reset Password</h1>
      )}
    </div>
  );
};

export default connect(null, { reset_password })(ResetPasswordPage);
