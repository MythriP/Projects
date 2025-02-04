import axios from "axios";

import {
  GETUSERPOSTS_SUCCESS,
  GETUSERPOSTS_FAIL,
  SETPROFILEIMAGE_SUCCESS,
  GETPROFILEIMAGE_SUCCESS,
  GETPOSTS_FAIL,
  GETPOSTS_SUCCESS,
  GETPOST_SUCCESS,
} from "./types";

export const setProfileImage = (image_source) => async (dispatch) => {
  const user_id = JSON.parse(localStorage.getItem("user")).id;
  try {
    const res = await fetch(
      `http://localhost:8000/api/users/setProfileImage/${user_id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profile_image: image_source }),
      }
    );
    dispatch({
      type: SETPROFILEIMAGE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getProfileImage = () => async (dispatch) => {
  const user_id = JSON.parse(localStorage.getItem("user")).id;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get(
      `http://localhost:8000/api/users/getProfileImage/${user_id}/`,
      config
    );
    dispatch({
      type: GETPROFILEIMAGE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUserPosts = () => async (dispatch) => {
  const user_id = JSON.parse(localStorage.getItem("user")).id;
  const config = {
    header: {
      "Content-type": "application/json",
    },
  };
  try {
    const res = await axios.get(
      `http://localhost:8000/api/posts/userPosts/${user_id}/`,
      config
    );
    dispatch({
      type: GETUSERPOSTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GETUSERPOSTS_FAIL,
    });
  }
};

export const getAllPosts = () => async (dispatch) => {
  const user_id = JSON.parse(localStorage.getItem("user")).id;
  const config = {
    header: {
      "Content-type": "application/json",
    },
  };
  try {
    const res = await axios.get(
      `http://localhost:8000/api/posts/postsExceptUser/${user_id}/`,
      config
    );
    dispatch({
      type: GETPOSTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GETPOSTS_FAIL,
    });
  }
};

export const addNewPostToState = (data) => async (dispatch) => {
  dispatch({
    type: GETPOST_SUCCESS,
    payload: data,
  });
};
