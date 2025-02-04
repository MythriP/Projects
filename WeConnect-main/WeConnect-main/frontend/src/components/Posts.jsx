import React, { useEffect } from "react";
import "./Posts.css";
import Post from "./Post";
import Pusher from "pusher-js";
import { connect } from "react-redux";

import {
  getUserPosts,
  getProfileImage,
  getAllPosts,
  addNewPostToState,
} from "../utils/actions/post";
import Loader from "./Loader";

const Posts = ({
  allposts,
  getUserPosts,
  getProfileImage,
  getAllPosts,
  addNewPostToState,
}) => {
  // const [posts, setPosts] = useState(allposts);
  const userLS = JSON.parse(localStorage.getItem("user"));
  const username = userLS.first_name + " " + userLS.last_name;
  var funcExec = true;
  useEffect(() => {
    funcExec && functionsToExecuted();

    // const pusher = new Pusher("58317f865325e89f15ab", {
    //   cluster: "ap2",
    // });
    // const channel = pusher.subscribe("post");
    // channel.bind("event", async (data) => {
    //   if (data.username != username) {
    //     const res = await fetch(
    //       `http://localhost:8000/api/posts/media/${data.id}/`,
    //       {
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    //     const mediaData = await res.json();
    //     addNewPostToState({ post: data, media: mediaData });
    //     setPosts((prevPosts) => [
    //       { post: data, media: mediaData },
    //       ...prevPosts,
    //     ]);
    //   }
    // });
  }, []);

  const functionsToExecuted = () => {
    getAllPosts();
    getUserPosts();
    getProfileImage();
    funcExec = false;
  };

  return (
    <div className="posts">
      {allposts.length != 0 ? (
        allposts.map((item) => (
          <Post key={item.post.id} post={item.post} media={item.media} />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  allposts: state.post.posts,
});

export default connect(mapStateToProps, {
  getAllPosts,
  getUserPosts,
  getProfileImage,
  addNewPostToState,
})(Posts);
