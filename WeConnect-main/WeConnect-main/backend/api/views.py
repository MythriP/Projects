from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import MediaSerializer, SavedSerializer, UserProfileImageSerializer, UserSerializer, PostSerializer, CommentSerializer, LikeSerializer, FollowerSerializer, FollowingSerializer, UserdataSerializer
from .models import Post, Comment, Like, Saved, Profileimage, Userdata
from users.models import UserAccount as User

from .pusher import pusher_client

# @api_view(['POST'])
# def updateUserData(request, pk):
#     data = request.data
#     user = User.objects.get(id = pk)
#     user.userdata_set.all().delete()
#     user.userdata_set.create(user = user, website = data['website'], bio = data['bio'], phone_no = data['phone_no'], gender = data['gender'], profile_pic = data['profile_pic'])
#     userData = user.userdata_set.last()
#     serializer = UserdataSerializer(userData, many=False)
#     return Response(serializer.data)

# @api_view(['GET'])
# def getUserData(request, pk):
#     user = User.objects.get(id = pk)
#     userData = user.userdata_set.last()
#     serializer = UserdataSerializer(userData, many = False)
#     return Response(serializer.data)

# GET LIST OF USERS


@api_view(['GET'])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


# GET USER
@api_view(['GET'])
def getUser(request, pk):
    user = User.objects.get(id=pk)
    posts = user.post_set.all()
    postswithmedia = []
    for post in posts:
        media = post.media_set.all()
        post_serializer = PostSerializer(post, many=False)
        media_serializer = MediaSerializer(media, many=True)
        postswithmedia.append(
            {'post': post_serializer.data, 'media': media_serializer.data})

    user_serializer = UserSerializer(user, many=False)
    return Response({
        'user': user_serializer.data,
        'posts': postswithmedia
    })


# GET USER PROFILE IMAGE
@api_view(['GET'])
def getUserProfileImage(request, pk):
    user = User.objects.get(id=pk)
    userProfileImage = user.profileimage_set.last()
    serializer = UserProfileImageSerializer(userProfileImage, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getUserFollowers(request, pk):
    user = User.objects.get(id=pk)
    followers = user.follower_set.all()
    serializer = FollowerSerializer(followers, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getUserFollowing(request, pk):
    user = User.objects.get(id=pk)
    following = user.following_set.all()
    serializer = FollowingSerializer(following, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def followOrUnfollowUser(request, pk1, pk2):
    user1 = User.objects.get(id=pk1)
    user2 = User.objects.get(id=pk2)
    filterUser = user1.following_set.all().filter(username=user2.get_full_name())
    if filterUser:
        filterUser2 = user2.follower_set.all().filter(username=user1.get_full_name())
        filterUser2.delete()
        filterUser.delete()
        user1.getNoOfFollowing()
        user1.save()
        user2.getNoOfFollowers()
        user2.save()
        return Response({'following': False})
    else:
        user1.following_set.create(user=user2, username=user2.get_full_name())
        user2.follower_set.create(user=user1, username=user1.get_full_name())
        user1.getNoOfFollowing()
        user1.save()
        user2.getNoOfFollowers()
        user2.save()
        return Response({
            'following': True,
        })


@api_view(['GET'])
def isUserFollowing(request, pk1, pk2):
    user1 = User.objects.get(id=pk1)
    user2 = User.objects.get(id=pk2)
    print(user1.following_set.all().filter(user=user2))
    if user1.following_set.all().filter(user=user2):
        return Response({'following': True})
    else:
        return Response({'following': False})


# GET ALL POSTS
@api_view(['GET'])
def getAllPosts(request):
    posts = Post.objects.all()
    postswithmedia = []
    for post in posts:
        media = post.media_set.all()
        post_serializer = PostSerializer(post, many=False)
        media_serializer = MediaSerializer(media, many=True)
        postswithmedia.append(
            {'post': post_serializer.data, 'media': media_serializer.data})
    return Response(postswithmedia)


@api_view(['GET'])
def getUserPosts(request, pk):
    user = User.objects.get(id=pk)
    posts = user.post_set.all()
    postswithmedia = []
    for post in posts:
        media = post.media_set.all()
        post_serializer = PostSerializer(post, many=False)
        media_serializer = MediaSerializer(media, many=True)
        postswithmedia.append(
            {'post': post_serializer.data, 'media': media_serializer.data})
    return Response(postswithmedia)


@api_view(['GET'])
def getPosts(request, pk):
    user = User.objects.get(id=pk)
    posts = Post.objects.all().exclude(user=user)
    # serializer = PostSerializer(posts, many=True)

    postswithmedia = []
    for post in posts:
        media = post.media_set.all()
        post_serializer = PostSerializer(post, many=False)
        media_serializer = MediaSerializer(media, many=True)
        postswithmedia.append(
            {'post': post_serializer.data, 'media': media_serializer.data})

    return Response(postswithmedia)


@api_view(['GET'])
def getPost(request, pk):
    post = Post.objects.get(id=pk)
    media = post.media_set.all()
    comments = post.comment_set.all()
    post_serializer = PostSerializer(post, many=False)
    media_serializer = MediaSerializer(media, many=True)
    comment_serializer = CommentSerializer(comments, many=True)
    return Response({
        'post': post_serializer.data,
        'media': media_serializer.data,
        'comments': comment_serializer.data
    })


@api_view(['GET'])
def getMedia(request, pk):
    post = Post.objects.get(id=pk)
    media = post.media_set.all()
    serializer = MediaSerializer(media, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getComments(request, pk):
    # pk --> post id
    post = Post.objects.get(id=pk)
    comments = post.comment_set.all()
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getLikes(request, pk):
    # pk --> post id
    post = Post.objects.get(id=pk)
    post.getNoOfLikes()
    post.save()
    likes = post.like_set.all()
    serializer = LikeSerializer(likes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getSaved(request, pk):
    # pk --> post id
    post = Post.objects.get(id=pk)
    saved = post.saved_set.all()
    serializer = SavedSerializer(saved, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def setUserProfileImage(request, pk):
    data = request.data
    user = User.objects.get(id=pk)
    user.profileimage_set.all().delete()
    profileImage = Profileimage(user=user, profile_pic=data['profile_image'])
    profileImage.save()
    userProfileImage = user.profileimage_set.last()
    serializer = UserProfileImageSerializer(userProfileImage, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def createPost(request, pk):
    data = request.data  # ['user id', 'caption', [image, image]]
    user = User.objects.get(id=pk)
    post = Post.objects.create(
        user=user, username=user.get_full_name(), caption=data['caption'])
    for image in data['media']:
        post.media_set.create(type=image['type'], media_url=image['url'])
    post.save()
    serializer = PostSerializer(post, many=False)
    pusher_client.trigger('post', 'event', serializer.data)
    return Response(serializer.data)


@api_view(['POST'])
def createComment(request, pk):
    print('hello')
    data = request.data  # ['user_id', 'message']
    print(data['user_id'], data['message'])
    post = Post.objects.get(id=pk)
    user = User.objects.get(id=data['user_id'])
    comment = Comment(post=post, user=user,
                      username=user.get_full_name(), message=data['message'])
    comment.save()
    serializer = CommentSerializer(comment, many=False)
    pusher_client.trigger('post'+str(post.id)+'comment',
                          'event', serializer.data)
    return Response(serializer.data)


# @api_view(['POST'])
# def likePost(request, pk):
#     data = request.data
#     post = Post.objects.get(id = pk)
#     user = User.objects.get(id = data['user_id'])
#     filterUser = post.like_set.all().filter(user=user)
#     if filterUser:
#         filterUser.delete()
#         post.getNoOfLikes()
#         post.save()
#         pusher_client.trigger('post'+str(post.id)+'like', 'event', {'user_id': user.id, 'post': post.id, 'like': False, 'no_of_likes': post.no_of_likes})
#         return Response({'like': False, 'no_of_likes': post.no_of_likes})
#     else:
#         # like = Like(post=post, user=user, username=user.get_full_name(), like=True)
#         post.like_set.create(post=post, user=user, username=user.get_full_name(), like=True)
#         post.getNoOfLikes()
#         post.save()
#         pusher_client.trigger('post'+str(post.id)+'like', 'event', {'user_id': user.id,'post': post.id, 'like': True, 'no_of_likes': post.no_of_likes})

#         return Response({
#             'like': True,
#             'no_of_likes': post.no_of_likes
#         })


@api_view(['POST'])
def likePost(request, pk):
    post = Post.objects.get(id=pk)
    user = User.objects.get(id=request.data['user_id'])

    post.like_set.create(post=post, user=user,
                         username=user.get_full_name(), like=True)
    post.getNoOfLikes()
    post.save()

    pusher_client.trigger('post'+str(post.id)+'like', 'event', {
                          'user_id': user.id, 'post': post.id, 'like': True, 'no_of_likes': post.no_of_likes})
    return Response({
        'like': True,
        'no_of_likes': post.no_of_likes
    })


@api_view(['POST'])
def unlikePost(request, pk):
    post = Post.objects.get(id=pk)
    user = User.objects.get(id=request.data['user_id'])
    filterUser = post.like_set.all().filter(user=user)
    if filterUser:
        filterUser.delete()
        post.getNoOfLikes()
        post.save()
        pusher_client.trigger('post'+str(post.id)+'like', 'event', {
                              'user_id': user.id, 'post': post.id, 'like': False, 'no_of_likes': post.no_of_likes})
        return Response({'like': False, 'no_of_likes': post.no_of_likes})
    return Response({'message': 'Not liked or User not found'})


@api_view(['POST'])
def isUserLiked(request, pk):
    post = Post.objects.get(id=pk)
    user = User.objects.get(id=request.data['user_id'])
    if post.like_set.all().filter(user=user):
        return Response({'like': True, 'no_of_likes': post.no_of_likes})
    else:
        return Response({'like': False, 'no_of_likes': post.no_of_likes})


@api_view(['POST'])
def savePost(request, pk):
    data = request.data
    post = Post.objects.get(id=pk)
    user = User.objects.get(id=data['user_id'])
    filterUser = post.saved_set.all().filter(user=user)
    if filterUser:
        filterUser.delete()
        post.save()
        return Response({'save': False, })
    else:
        post.saved_set.create(post=post, user=user,
                              username=user.get_full_name(), savePost=True)
        return Response({'save': True, })


@api_view(['POST'])
def isUserSaved(request, pk):
    data = request.data
    post = Post.objects.get(id=pk)
    user = User.objects.get(id=data['user_id'])
    if post.saved_set.all().filter(user=user):
        return Response({'save': True, })
    else:
        return Response({'save': False, })


@api_view(['DELETE'])
def deletePost(request, pk):
    post = Post.objects.get(id=pk)
    post.delete()
    return Response('Deleted')
