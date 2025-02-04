import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "./Container";
import Avatar from "./Avatar";

import { ReactComponent as HeartIcon } from "../assets/heart.svg";
import { ReactComponent as HeartFilledIcon } from "../assets/heart_filled.svg";
import { ReactComponent as MessageIcon } from "../assets/message-circle.svg";
import { ReactComponent as SendIcon } from "../assets/send.svg";
import { ReactComponent as BookmarkIcon } from "../assets/bookmark.svg";
import { ReactComponent as BookmarkFilledIcon } from "../assets/bookmark_filled.svg";
import { ReactComponent as SmileIcon } from "../assets/smile.svg";
import "./Post.css";
import Picker from "emoji-picker-react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CarouselComponent from "./CarouselComponent";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Post = ({ post, media, user, userProfileImage }) => {
  // const [postState, setPostState] = useState(post);
  // const params = useParams();
  console.log(post)
  const [profileImage, setProfileImage] = useState();
  const [mediaState, setMediaState] = useState(media);
  const [emoji, setEmoji] = useState(false);
  const [comment, setComment] = useState("");
  const [bookmark, setBookmark] = useState(false);
  const [likeAndCount, setLikeAndCount] = useState({
    like: false,
    likeCount: post.no_of_likes,
  });

  useEffect(() => {
    const unsubscribe = getMediaAndIsLiked();
    return unsubscribe;
  }, [post.id]);

  const getMediaAndIsLiked = () => {
    isUserLiked();
    isUserSaved();
    getUserProfileImage();
  };

  const showLikes = () => {
    if (likeAndCount.likeCount === 0) {
      return "";
    } else if (likeAndCount.likeCount > 1) {
      return likeAndCount.likeCount + " likes";
    } else {
      return likeAndCount.likeCount + " like";
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setComment((prevcomment) => {
      return prevcomment + emojiObject.emoji;
    });
  };

  const onCommentHandler = (e) => {
    setComment(e.target.value);
  };

  const onClickCommentBtn = async () => {
    await fetch(
      `http://localhost:8000/api/posts/createComment/${post.id}/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ user_id: user.id, message: comment }),
      }
    );
    setComment("");
  };

  const isUserLiked = async () => {
    const res = await fetch(
      `http://localhost:8000/api/posts/isUserLiked/${post.id}/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ user_id: user.id }),
      }
    );
    const data = await res.json();
    setLikeAndCount((prevLikeAndCount) => ({
      ...prevLikeAndCount,
      like: data.like,
      likeCount: data.no_of_likes,
    }));
  };

  const isUserSaved = async () => {
    await fetch(
      `http://localhost:8000/api/posts/isUserSaved/${post.id}/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ user_id: user.id }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBookmark(data.save);
      });
  };

  const onClickLikeBtn = async () => {
    if (likeAndCount.like === true) {
      await fetch(
        `http://localhost:8000/api/posts/unlikePost/${post.id}/`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ user_id: user.id }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setLikeAndCount((prevLikeAndCount) => ({
            ...prevLikeAndCount,
            like: data.like,
            likeCount: data.no_of_likes,
          }));
        });
    } else {
      await fetch(
        `http://localhost:8000/api/posts/likePost/${post.id}/`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ user_id: user.id }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setLikeAndCount((prevLikeAndCount) => ({
            ...prevLikeAndCount,
            like: data.like,
            likeCount: data.no_of_likes,
          }));
        });
    }
    // const res = await fetch(
    //   `http://localhost:8000/api/posts/likePost/${post.id}/`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: JSON.stringify({ user_id: user.id }),
    //   }
    // );
    // const data = await res.json();
    // setLikeAndCount((prevLikeAndCount) => ({
    //   ...prevLikeAndCount,
    //   like: data.like,
    //   likeCount: data.no_of_likes,
    // }));
  };

  const onClickSaveBtn = async () => {
    await fetch(
      `http://localhost:8000/api/posts/savePost/${post.id}/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ user_id: user.id }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBookmark(data.save);
      });
  };

  const checkIfEnterPressed = (e) => {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 13) {
      onClickCommentBtn();
    }
  };

  const getUserProfileImage = async () => {
    await fetch(
      `http://localhost:8000/api/users/getProfileImage/${post.user}/`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setProfileImage(data.profile_pic);
      });
  }

  return (
    <Container className="post">
      <div className="post__header">
        {userProfileImage === "" ? <Avatar /> : <img src={profileImage} />}
        <a href="/">{post.username}</a>
      </div>
      <div className="post__body">
        <CarouselComponent media={mediaState} />
      </div>
      <div className="post__caption">
        <h3>{post.caption}</h3>
      </div>
      <div className="post__btns">
        <div className="btns__left">
          {likeAndCount.like === true ? (
            <HeartFilledIcon onClick={onClickLikeBtn} />
          ) : (
            <HeartIcon onClick={onClickLikeBtn} />
          )}
          <Link to={`/p/${post.id}/`}>
            <MessageIcon />
          </Link>
          <SendIcon />
        </div>
        <div className="btns__right">
          {bookmark === true ? (
            <BookmarkFilledIcon onClick={onClickSaveBtn} />
          ) : (
            <BookmarkIcon onClick={onClickSaveBtn} />
          )}
        </div>
      </div>
      <div className="post__likes">
        <p>{showLikes()}</p>
      </div>
      <div className="post__comments">
        <Link to={`/p/${post.id}/`}>Views Comments</Link>
      </div>
      <div className="post__comment">
        {emoji ? (
          <>
            <SmileIcon onClick={() => setEmoji(false)} />
            <Picker onEmojiClick={onEmojiClick} />
          </>
        ) : (
          <SmileIcon onClick={() => setEmoji(true)} />
        )}
        <input
          type="text"
          placeholder="Add a comment.."
          value={comment}
          onChange={onCommentHandler}
          onKeyUp={checkIfEnterPressed}
        />
        <button className="btn" onClick={onClickCommentBtn}>
          Comment
        </button>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  userProfileImage: state.post.userProfileImage,
});

export default connect(mapStateToProps)(Post);
