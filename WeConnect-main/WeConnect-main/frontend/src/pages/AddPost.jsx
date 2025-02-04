import React, { useState } from "react";
import axios from "axios";
import Container from "../components/Container";
import Popup from "../components/Popup";
import { ReactComponent as SmileIcon } from "../assets/smile.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Picker from "emoji-picker-react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./AddPost.css";

const AddPost = ({ user }) => {
  const [caption, setCaption] = useState("");
  const [emoji, setEmoji] = useState(false);
  const [postData, setPostData] = useState([]);

  // Emojii Picker
  const onEmojiClick = (event, emojiObject) =>
    setCaption((prevCaption) => prevCaption + emojiObject.emoji);

  const onCaptionHandler = (e) => setCaption(e.target.value);

  const onPhotosHandler = (image) => {
    setPostData((prevData) => [...prevData, image]);
  };

  const onVideosHandler = (video) => {
    setPostData((prevData) => [...prevData, video]);
  };

  const onDocsHandler = (doc) => {
    setPostData((prevData) => [...prevData, doc]);
  };

  const onClickPostHandler = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      user_id: user.id,
      caption: caption,
      media: postData,
    });

    try {
      await axios.post(
        `http://localhost:8000/api/posts/createPost/${user.id}/`,
        body,
        config
      );
      setCaption("");
      setPostData([]);
    } catch (err) {}
    <Redirect to="/" />;
  };

  const checkIfEnterPressed = (e) => {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 13) {
      onClickPostHandler();
    }
  };

  return (
    <Container className="addpost">
      <div className="addpost__images">
        <Carousel emulateTouch dynamicHeight>
          {postData &&
            postData.map(({ id, type, url }) => (
              <div key={id}>
                {type === "image" && <img src={url} alt={id} />}
                {type === "doc" && (
                  <iframe
                    src={url}
                    title={id}
                    width="100% !important"
                    height="700"
                    frameBorder="0"
                  />
                )}
                {type === "video" && (
                  <video
                    style={{ width: "100%", height: "900" }}
                    controls
                    autoPlay
                  >
                    <source src={url} type="video/mp4" />
                  </video>
                )}
              </div>
            ))}
        </Carousel>
      </div>
      <div className="addpost__caption">
        {emoji ? (
          <>
            <SmileIcon onClick={() => setEmoji(false)} />
            <Picker onEmojiClick={onEmojiClick} />
          </>
        ) : (
          <SmileIcon onClick={() => setEmoji(true)} />
        )}
        <Popup
          attachment
          onPhotos={onPhotosHandler}
          onVideos={onVideosHandler}
          onDocs={onDocsHandler}
        />
        <input
          type="text"
          placeholder="Add a caption"
          value={caption}
          onChange={onCaptionHandler}
          onKeyUp={checkIfEnterPressed}
        />

        {caption ? (
          <div className="postbtn">
            <button className="btn" onClick={onClickPostHandler}>
              Post
            </button>
          </div>
        ) : (
          <div className="postbtn">
            <button disabled className="btn btn__disabled">
              Post
            </button>
          </div>
        )}
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(AddPost);
