from unicodedata import name
from django.urls import path
from . import views

urlpatterns = [

    # GET REQUESTS

    path('users/', views.getUsers, name='users'),

    path('users/<str:pk>/', views.getUser, name='user'),

    # path('users/getUserData/<str:pk>/', views.getUserData, name='getUserData'),

    path('users/getProfileImage/<str:pk>/', views.getUserProfileImage, name='getUserProfileImage'),
    
    path('users/isUserFollowing/<str:pk1>/<str:pk2>/', views.isUserFollowing, name='isUserFollowing'),

    path('users/userFollowers/<str:pk>/', views.getUserFollowers, name='getUserFollowers'),

    path('users/userFollowing/<str:pk>/', views.getUserFollowing, name='getUserFollowing'),



    path('posts/', views.getAllPosts, name='getAllPosts'),

    path('posts/userPosts/<str:pk>/', views.getUserPosts, name='userPosts'),

    path('posts/postsExceptUser/<str:pk>/', views.getPosts, name='posts'),


    path('posts/<str:pk>/', views.getPost, name='post'),

    path('posts/isUserLiked/<str:pk>/', views.isUserLiked, name='isUserLiked'),

    path('posts/isUserSaved/<str:pk>/', views.isUserSaved, name='isUserSaved'),


    path('posts/media/<str:pk>/', views.getMedia, name='media'),

    path('posts/comments/<str:pk>/', views.getComments, name='comments'),

    path('posts/likes/<str:pk>/', views.getLikes, name='likes'),

    path('posts/saved/<str:pk>/', views.getSaved, name='saved'),



    # POST REQUESTS
    # path('users/updateInformation/<str:pk>/', views.updateUserData, name="updateUserInformation"),

    path('users/setProfileImage/<str:pk>/', views.setUserProfileImage, name='setUserProfileImage'),

    path('posts/createPost/<str:pk>/', views.createPost, name='create-post'),

    path('posts/deletePost/<str:pk>/', views.deletePost, name='deletePost'),

    path('posts/createComment/<str:pk>/', views.createComment, name='create-comment'),

    path('posts/likePost/<str:pk>/', views.likePost, name='like-post'),

    path('posts/unlikePost/<str:pk>/', views.unlikePost, name='unlike-post'),

    path('posts/savePost/<str:pk>/', views.savePost, name='save-post'),

    path('users/followOrUnfollowUser/<str:pk1>/<str:pk2>/', views.followOrUnfollowUser, name='followOrUnfollowUser'),
]
