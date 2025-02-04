import React, { useState, useEffect } from "react";

import Pusher from "pusher-js";
import Picker from "emoji-picker-react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import CarouselComponent from "../components/CarouselComponent";
import Container from "../components/Container";
import Avatar from "../components/Avatar";
import { ReactComponent as HeartIcon } from "../assets/heart.svg";
import { ReactComponent as HeartFilledIcon } from "../assets/heart_filled.svg";
import { ReactComponent as MessageIcon } from "../assets/message-circle.svg";
import { ReactComponent as SendIcon } from "../assets/send.svg";
import { ReactComponent as BookmarkIcon } from "../assets/bookmark.svg";
import { ReactComponent as BookmarkFilledIcon } from "../assets/bookmark_filled.svg";
import { ReactComponent as SmileIcon } from "../assets/smile.svg";


import "./SinglePostPage.css";

const SinglePostPage = ({ user }) => {
  console.log("USER", user)
  let params = useParams();
  const [post, setPost] = useState([]);
  const [profilePic, setProfilePic] = useState();
  const [comments, setComments] = useState([]);
  const [emoji, setEmoji] = useState(false);
  const [comment, setComment] = useState("");
  const [bookmark, setBookmark] = useState(false);
  const [media, setMedia] = useState();
  const [likeAndCount, setLikeAndCount] = useState({
    like: false,
    likeCount: post && post.no_of_likes,
  });

  var funcExec = true;


  useEffect(() => {
    console.log('hello')
    funcExec && functionsToExecuted();
    const pusher = new Pusher("58317f865325e89f15ab", {
      cluster: "ap2",
    });

    const postCommentFun = "post" + params.id + "comment";
    const commentChannel = pusher.subscribe(postCommentFun);
    const out = document.getElementById("out");
    commentChannel.bind("event", (data) => {
      if (data.post == params.id) {
        setComments((prevComments) => [...prevComments, data]);
        out.scrollTop = out.scrollHeight;
      }
    });

    const postLikeFun = "post" + params.id + "like";
    const likeChannel = pusher.subscribe(postLikeFun);
    likeChannel.bind("event", (data) => {
      console.log('Liked ' + params.id)
      // if (data.post == params.id) {
        // if (data.user_id == user.id) {
      console.log(data)
          setLikeAndCount((prevLikeAndCount) => ({
            ...prevLikeAndCount,
            like: data.like,
            likeCount: data.no_of_likes,
          }));
        // }
        // setLikeAndCount((prevLikeAndCount) => ({
        //   ...prevLikeAndCount,
        //   likeCount: data.no_of_likes,
        // }));
      // }
    });
  }, []);

  const functionsToExecuted = () => {
    getPost();
    isUserLiked();
    funcExec = false;
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

  const getUserProfileImage = async (userId) => {
    await fetch(
      `http://localhost:8000/api/users/getProfileImage/${userId}/`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setProfilePic(data.profile_pic);
      });
  }

  const isUserLiked = async () => {
    const res = await fetch(
      `http://localhost:8000/api/posts/isUserLiked/${params.id}/`,
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

  const getPost = async () => {
    const res = await fetch(
      `http://localhost:8000/api/posts/${params.id}/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await res.json();

    getUserProfileImage(data['post'].user);

    setPost(data["post"]);
    setMedia(data["media"]);
    setComments(data["comments"]);
    const out = document.getElementById("out");
    out.scrollTop = out.scrollHeight;
    console.log("POST", data["post"])
  };

  const onClickLikeBtn = async () => {
    if (likeAndCount.like === true) {
      await fetch(
        `http://localhost:8000/api/posts/unlikePost/${params.id}/`,
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
        `http://localhost:8000/api/posts/likePost/${params.id}/`,
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

    // await fetch(
    //   `http://localhost:8000/api/posts/likePost/${params.id}/`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: JSON.stringify({ user_id: user.id }),
    //   }
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setLikeAndCount((prevLikeAndCount) => ({
    //       ...prevLikeAndCount,
    //       like: data.like,
    //       likeCount: data.no_of_likes,
    //     }));
    //   });
  };

  const onClickCommentBtn = async () => {
    await fetch(
      `http://localhost:8000/api/posts/createComment/${params.id}/`,
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

  const onCommentHandler = (e) => {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 13) {
      onClickCommentBtn();
    } else {
      setComment(e.target.value);
    }
  };

  const checkIfEnterPressed = (e) => {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 13) {
      onClickCommentBtn();
    }
  };

  const onDeletePost = async () => {
    await fetch(
      `http://localhost:8000/api/posts/deletePost/${params.id}/`,
      {
        method: "DELETE",
      }
    );
  };

  return (
    <Container className="singlePost">
      <div className="media__wrapper">
        <div className="post__body">
          <CarouselComponent media={media} />
        </div>
        <div className="post__caption">
          <h3>{post && post.caption}</h3>
        </div>
        <div className="post__btns">
          <div className="btns__left">
            {likeAndCount.like === true ? (
              <HeartFilledIcon onClick={onClickLikeBtn} />
            ) : (
              <HeartIcon onClick={onClickLikeBtn} />
            )}
            <MessageIcon />
            <SendIcon />
          </div>
          <div className="btns__right">
            {bookmark ? (
              <BookmarkFilledIcon onClick={() => setBookmark(false)} />
            ) : (
              <BookmarkIcon onClick={() => setBookmark(true)} />
            )}
          </div>
        </div>
        <div className="post__likes">
          <p>{showLikes()}</p>
        </div>
      </div>
      <div className="content">
        <div className="post__header">
          {profilePic === "" ? <Avatar /> : <img src={profilePic} />}
          <a href="/">{post && post.username}</a>
          {post.username === user.first_name + " " + user.last_name && (
            <Link to="/" onClick={onDeletePost}>
              Delete
            </Link>
          )}
          
        </div>
        <div className="comments" id="out">
          {comments &&
            comments.map((comment) =>
              comment.user === user.id ? (
                <div className="user comment_wrapper" key={comment.id}>
                  <div className="comment">
                    <span>{comment.username}</span>
                    <p>{comment.message}</p>
                  </div>
                </div>
              ) : (
                <div className="comment_wrapper" key={comment.id}>
                  <div className="comment">
                    <span>{comment.username}</span>
                    <p>{comment.message}</p>
                  </div>
                </div>
              )
            )}
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
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(SinglePostPage);
