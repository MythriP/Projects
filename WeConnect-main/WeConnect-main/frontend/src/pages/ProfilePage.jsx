import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import Container from "../components/Container";
import { ReactComponent as PersonIcon } from "../assets/person.svg";
import "./ProfilePage.css";
import { ReactComponent as HeartFilledIcon } from "../assets/heart_filled.svg";
import { Link } from "react-router-dom";
import { setProfileImage } from "../utils/actions/post";

const ProfilePage = ({
  user,
  userPosts,
  userProfileImage,
  setProfileImage,
}) => {
  const [showMedia, setShowMedia] = useState({
    showImages: true,
    showVideos: false,
    showDocuments: false,
    // showSaved: false,
  });
  const [userProfilePic, setUserProfilePic] = useState(userProfileImage);
  const uploadProfileRef = useRef(null);

  const onUploadProfileImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setProfileImage(readerEvent.target.result);
      setUserProfilePic(readerEvent.target.result);
    };
  };

  const onImagesClickHandler = () => {
    setShowMedia((prevShowMedia) => ({ showImages: true }));
  };
  const onVideossClickHandler = () => {
    setShowMedia((prevShowMedia) => ({ showVideos: true }));
  };
  const onDocumentsClickHandler = () => {
    setShowMedia((prevShowMedia) => ({
      showDocuments: true,
    }));
  };
  // const onSavedClickHandler = () => {
  //   setShowMedia((prevShowMedia) => ({
  //     showSaved: true,
  //   }));
  // };
  return (
    user && (
      <Container className="profile">
        <div className="profile__header">
          <div className="profile__avatar">
            <div
              className="profile__img"
              onClick={() => uploadProfileRef.current.click()}
            >
              {userProfilePic === "" && <PersonIcon />}
              {userProfilePic !== "" && (
                <img
                  src={userProfilePic}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  alt="profile pic"
                />
              )}
              <input
                ref={uploadProfileRef}
                onChange={onUploadProfileImage}
                type="file"
                accept="image/*"
                hidden
              />
            </div>
          </div>
          <div className="profile__content">
            <h1>{user.first_name + " " + user.last_name}</h1>
            <h3>{user.email}</h3>
            <div>
              <p>{userPosts.length} posts</p>
              <p>50 followers</p>
              <p>50 following</p>
            </div>
            <div>
              <Link className="btn" to="/edit">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
        <div className="profile__body">
          <div className="tab">
            <button
              className="tablinks activeTab"
              onClick={onImagesClickHandler}
            >
              Images
            </button>
            <button className="tablinks" onClick={onVideossClickHandler}>
              Videos
            </button>
            <button className="tablinks" onClick={onDocumentsClickHandler}>
              Documents
            </button>
            {/* <button className="tablinks" onClick={onSavedClickHandler}>
              Saved
            </button> */}
          </div>

          {showMedia.showImages && (
            <div id="Images" className="tabcontent">
              {userPosts.map((items) =>
                items.media.map(
                  (item) =>
                    item.type === "image" && (
                      <div key={item.id} className="post">
                        <Link to={`/p/${items.post.id}/`}>
                          <div className="overlay">
                            <HeartFilledIcon />
                            <span style={{ fontSize: "40px" }}>
                              {items.post.no_of_likes}
                            </span>
                          </div>
                          <img src={item.media_url} alt={item.id} />
                        </Link>
                      </div>
                    )
                )
              )}
            </div>
          )}

          {showMedia.showVideos && (
            <div id="Videos" className="tabcontent">
              {userPosts.map((items) =>
                items.media.map(
                  (item) =>
                    item.type === "video" && (
                      <div key={item.id} className="post">
                        <Link to={`/p/${items.post.id}/`}>
                          <div className="overlay">
                            <HeartFilledIcon />
                            <span style={{ fontSize: "40px" }}>
                              {items.post.no_of_likes}
                            </span>
                          </div>
                          <video
                            style={{ width: "100%" }}
                            // controls
                            // autoPlay
                          >
                            <source src={item.media_url} type="video/mp4" />
                          </video>
                        </Link>
                      </div>
                    )
                )
              )}
            </div>
          )}

          {showMedia.showDocuments && (
            <div id="Documents" className="tabcontent">
              {userPosts.map((items) =>
                items.media.map(
                  (item) =>
                    item.type === "doc" && (
                      <div key={item.id} className="post">
                        <Link to={`/p/${items.post.id}/`}>
                          <div className="overlay">
                            <HeartFilledIcon />
                            <span style={{ fontSize: "40px" }}>
                              {items.post.no_of_likes}
                            </span>
                          </div>
                          <iframe
                            src={item.media_url}
                            title={item.id}
                            style={{ height: "300px" }}
                            frameBorder="0"
                          />
                        </Link>
                      </div>
                    )
                )
              )}
            </div>
          )}
        </div>
      </Container>
    )
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  userPosts: state.post.userPosts,
  userProfileImage: state.post.userProfileImage,
});

export default connect(mapStateToProps, {
  setProfileImage,
})(ProfilePage);
