import React, { useContext } from "react";
import { connect } from "react-redux";
import ThemeContext from "../App";
import Avatar from "./Avatar";
import Container from "./Container";
import "./MiniProfile.css";

const MiniProfile = ({ user, userProfileImage }) => {
  const theme = useContext(ThemeContext);
  const username = user && (user.first_name + "_" + user.last_name).toLowerCase();
  return (
    <Container className={"miniprofile " + theme}>
      <div className="miniprofile__header">
        {userProfileImage === "" ? <Avatar /> : <img src={userProfileImage} />}
        <div className="user__details">
          <h3>{ user && username }</h3>
          <h3>{ user && (user.first_name + " " + user.last_name) }</h3>
        </div>
      </div>
    </Container>
  );
};


const mapStateToProps = (state) => ({
  user: state.auth.user,
  userProfileImage: state.post.userProfileImage,
});

export default connect(mapStateToProps)(MiniProfile);