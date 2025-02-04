// http://localhost:8000/

class Config {
  static loadUserUrl = "http://localhost:8000/auth/users/me/";

  static checkUserAuthenticatedUrl = "http://localhost:8000/auth/jwt/verify/";

  static loginUrl = "http://localhost:8000/auth/jwt/create/";

  static signUpUrl = "http://localhost:8000/auth/users/";

  static verifyUrl = "http://localhost:8000/auth/users/activation/";

  static resetPasswordUrl = "http://localhost:8000/auth/users/reset_password/";

  static resetPasswordConfirmUrl =
    "http://localhost:8000/auth/users/reset_password_confirm/";

  // URL's WITH GET METHOD

  static getAllPosts = "http://localhost:8000/api/posts/";

  static getUserPosts = "http://localhost:8000/api/posts/userPosts/";

  static getPostsExceptUser = "http://localhost:8000/api/postsExceptUser/";

  static getPost = "http://localhost:8000/api/posts/";

  static isUserLiked = "http://localhost:8000/api/posts/isUserLiked/";

  static isUserSaved = "http://localhost:8000/api/posts/isUserSaved/";

  static getPostMedia = "http://localhost:8000/api/posts/media/";

  static getPostComments = "http://localhost:8000/api/posts/comments/";

  static getPostLikes = "http://localhost:8000/api/posts/likes/";

  static getPostSaved = "http://localhost:8000/api/posts/saved/";

  // URL's WITH POST METHOD

  static setUserProfileImage =
    "http://localhost:8000/api/users/setUserProfileImage/";

  static createPost = "http://localhost:8000/api/posts/createPost/";

  static userDeletePost = "http://localhost:8000/api/posts/deletePost/";

  static createPostComment = "http://localhost:8000/api/posts/createComment/";

  static userLikePost = "http://localhost:8000/api/posts/likePost/";

  static userUnLikePost = "http://localhost:8000/api/posts/unlikePost/";

  static userSavedPost = "http://localhost:8000/api/posts/savePost/";

  static followOrUnfollowUser =
    "http://localhost:8000/api/users/followOrUnfollowUser/";
}

export default Config;
