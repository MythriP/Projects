import React, { useEffect } from "react";
import { connect } from "react-redux";
import { checkAuthenticated, load_user } from "../utils/actions/auth";

import Navbar from "../components/Navbar";

import "../App.css";

const Layout = ({ checkAuthenticated, load_user, children }) => {
  useEffect(() => {
    checkAuthenticated();
    load_user();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <div className="app__content">{children}</div>
    </div>
  );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);
