import {
  GETUSERPOSTS_SUCCESS,
  SETPROFILEIMAGE_SUCCESS,
  GETPROFILEIMAGE_SUCCESS,
  GETPOSTS_SUCCESS,
  GETPOSTS_FAIL,
  GETPOST_SUCCESS,
} from "../actions/types";

const initialState = {
  posts: [],
  userPosts: [],
  userProfileImage: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GETUSERPOSTS_SUCCESS:
      return {
        ...state,
        userPosts: [...payload],
      };

    case GETPOSTS_SUCCESS:
      return {
        ...state,
        posts: [...payload],
      };

    case GETPOSTS_FAIL:
      console.log("POST NOT LOADED");
      break;

    case GETPOST_SUCCESS:
      return {
        ...state,
        posts: [...payload, ...state.posts],
      };

    case SETPROFILEIMAGE_SUCCESS:
      return {
        ...state,
        userProfileImage: payload.profile_pic,
      };

    case GETPROFILEIMAGE_SUCCESS:
      return {
        ...state,
        userProfileImage: payload.profile_pic,
      };

    default:
      return state;
  }
}
