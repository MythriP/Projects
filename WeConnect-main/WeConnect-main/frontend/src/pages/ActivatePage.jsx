import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../utils/actions/auth";
import { useParams } from "react-router-dom";

import "./ActivatePage.css";

const ActivatePage = ({ verify, match }) => {
  const [verified, setVerified] = useState(false);
  const params = useParams();
  const verify_account = (e) => {
    const uid = params.uid;
    const token = params.token;
    // const uid = match.params.uid;
    // const token = match.params.token;

    verify(uid, token);
    setVerified(true);
  };

  if (verified) {
    return <Redirect to="/" />;
  }

  return (
    <div className="activate">
      <h1>Verify your Account</h1>
      <button onClick={verify_account} type="button" className="btn">
        Verify
      </button>
    </div>
  );
};

export default connect(null, { verify })(ActivatePage);
