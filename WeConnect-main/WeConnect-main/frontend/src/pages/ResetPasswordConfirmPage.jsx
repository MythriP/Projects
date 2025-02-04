import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../utils/actions/auth";
import { useParams } from "react-router-dom";
import "./ResetPasswordPage.css";

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
  const params = useParams();
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password, re_new_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    // const uid = match.params.uid;
    // const token = match.params.token;
    const uid = params.uid;
    const token = params.token;

    reset_password_confirm(uid, token, new_password, re_new_password);
    setRequestSent(true);
  };

  if (requestSent) {
    return <Redirect to="/" />;
  }

  return (
    <div className="resetPassword">
      <h1>Set New Password</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="password"
          placeholder="New Password"
          name="new_password"
          value={new_password}
          onChange={(e) => onChange(e)}
          minLength="6"
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          name="re_new_password"
          value={re_new_password}
          onChange={(e) => onChange(e)}
          minLength="6"
          required
        />
        <button className="btn" type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
