import React, { useState } from "react";

import { logout } from "../utils/actions/auth";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { ReactComponent as AddIcon } from "../assets/addIcon.svg";
import { ReactComponent as SearchIcon } from "../assets/search.svg";
import { ReactComponent as PersonOutlineIcon } from "../assets/person_outline.svg";
import { ReactComponent as SettingsIcon } from "../assets/settings.svg";
import { ReactComponent as LogOutIcon } from "../assets/log-out.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Popup from "./Popup";

import "./Navbar.css";

const Navbar = ({ isAuthenticated, user, logout }) => {
  const [showMenu, setShowMenu] = useState({});
  const [menuClick, setMenuClick] = useState(false);

  const logout_user = () => {
    logout();
  };

  const onMenuClick = () => {
    if (menuClick === false) {
      setMenuClick(true);
      setShowMenu({ display: "flex" });
    } else {
      setMenuClick(false);
      setShowMenu({});
    }
  };
  const guestLinks = () => {
    return (
      <div className="nav__links" style={showMenu}>
        <Link className="nav__link" to="/login">
          Login
        </Link>
        <Link className="nav__link" to="/signup">
          Sign Up
        </Link>
      </div>
    );
  };

  const authLinks = () => {
    return (
      <div className="nav__icons" style={showMenu}>
        <div className="search">
          <SearchIcon />
          <input type="search" placeholder="Search..."></input>
        </div>
        <div className="menu-item" onClick={onMenuClick}>
          <Link to="/profile">
            <PersonOutlineIcon />
            <span>Profile</span>
          </Link>
        </div>
        <div className="menu-item" onClick={onMenuClick}>
          <Link to="/addpost">
            <AddIcon />
            <span>Create Post</span>
          </Link>
        </div>
        {/* <div className="menu-item">
          <Link to="/profile">
            <SettingsIcon />
            <span>Settings</span>
          </Link>
        </div> */}
        <div className="menu-item" onClick={onMenuClick}>
          <Link to="/login" onClick={logout_user}>
            <LogOutIcon />
            <span>Sign out</span>
          </Link>
        </div>
        <Link className="add_post" to="/addpost">
          <AddIcon />
        </Link>
        <Popup avatar />
      </div>
    );
  };

  return (
    <div className="nav">
      <div className="nav__logo">
        <Link to="/">
          <span>We</span>Connect
        </Link>
        <div className="menu" onClick={onMenuClick}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      {isAuthenticated ? authLinks() : guestLinks()}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
