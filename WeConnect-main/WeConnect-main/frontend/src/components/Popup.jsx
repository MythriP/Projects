import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../utils/actions/auth";

import { ReactComponent as AttachmentIcon } from "../assets/paperclip.svg";
import { ReactComponent as PersonOutlineIcon } from "../assets/person_outline.svg";
import { ReactComponent as SettingsIcon } from "../assets/settings.svg";
import { ReactComponent as LogOutIcon } from "../assets/log-out.svg";
import { ReactComponent as CrossIcon } from "../assets/x.svg";
import Avatar from "./Avatar";
import Uploader from "./Uploader";

import "./Popup.css";

const popUpStyle = {
  opacity: "1",
};

const popCloseStyle = {
  display: "none",
};

const Popup = ({
  logout,
  isAuthenticated,
  user,
  avatar,
  onPhotos,
  onVideos,
  onDocs,
  userProfileImage,
}) => {
  const [popup, setPopup] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const logout_user = () => {
    logout();
    setRedirect(true);
  };

  const showPopupHandler = () => {
    if (popup) {
      setPopup(false);
    } else {
      setPopup(true);
    }
  };

  const stopPopupHandler = () => {
    if (popup) {
      setPopup(false);
    } else {
      setPopup(true);
    }
  };

  const sendPhotoToAddPost = (imageObject) => {
    onPhotos(imageObject);
  };

  const sendVideoToAddPost = (videoObject) => {
    onVideos(videoObject);
  };

  const sendDocToAddPost = (docObject) => {
    onDocs(docObject);
  };

  return (
    <div
      className={avatar ? "pop avatar" : "pop attachment"}
      onClick={showPopupHandler}
    >
      {avatar ? (userProfileImage ? <img src={userProfileImage} width="35" height="35" style={{borderRadius: "50%"}} /> : <Avatar />) : <AttachmentIcon />}
      <div className="popup" style={popup ? popUpStyle : popCloseStyle}>
        {avatar && (
          <div className="popup__item crossicon">
            <CrossIcon
              style={popup ? popUpStyle : popCloseStyle}
              onClick={stopPopupHandler}
            />
          </div>
        )}

        {avatar ? (
          <Link to="/profile">
            <div className="popup__item">
              <PersonOutlineIcon />
              <span>Profile</span>
            </div>
          </Link>
        ) : (
          <div className="popup__item">
            <Uploader photo onPhoto={sendPhotoToAddPost} />
          </div>
        )}

        {avatar ? (
          <Link to="/edit">
            <div className="popup__item">
              <SettingsIcon />
              <span>Settings</span>
            </div>
          </Link>
        ) : (
          <div className="popup__item">
            <Uploader video onVideo={sendVideoToAddPost} />
          </div>
        )}

        {avatar ? (
          <Link to="/login" onClick={logout_user}>
            <div className="popup__item">
              <LogOutIcon />
              <span>Sign Out</span>
            </div>
          </Link>
        ) : (
          <div className="popup__item">
            <Uploader doc onDoc={sendDocToAddPost} />
          </div>
        )}
      </div>
      {redirect ? <Redirect to="/login" /> : <></>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  userProfileImage: state.post.userProfileImage,
});

export default connect(mapStateToProps, { logout })(Popup);
