import React from "react";
import "./ProfilePage.css";
import { Link } from "react-router-dom";

import "./ActivationEmailSent.css";

const ActivationEmailSent = () => (
  <div className="activationEmail">
    <h1>Activation Email</h1>
    <p>A activation link has been sent to your registered email address.</p>
    <p>Please click on the activation link and verify your account </p>
    <Link className="btn" to="/login">
      Back to Login
    </Link>
  </div>
);

export default ActivationEmailSent;
