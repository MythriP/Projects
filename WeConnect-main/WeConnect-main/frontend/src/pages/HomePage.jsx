import React from "react";
import Posts from "../components/Posts";
import MiniProfile from "../components/MiniProfile";
import "./HomePage.css";

import Loader from "../components/Loader";

import { connect } from "react-redux";

const HomePage = ({ user }) => {
  return (
    <div className="main_section">
      {user ? <Posts /> : <Loader />}
      <MiniProfile />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(HomePage);
