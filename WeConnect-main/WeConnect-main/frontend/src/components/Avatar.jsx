import React from "react";
import { connect } from "react-redux";
import { ReactComponent as PersonIcon } from "../assets/person.svg";

const Avatar = ({ user }) => {
  return (
    <div className="icons__profile">
      <PersonIcon />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Avatar);
