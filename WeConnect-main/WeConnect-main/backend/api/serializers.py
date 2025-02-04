from django.db import models
# from matplotlib.pyplot import cla
from rest_framework.serializers import ModelSerializer
from .models import Follower, Following, Media, Post, Comment, Like, Saved, Profileimage, Userdata
from users.models import UserAccount


class UserSerializer(ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'


class UserdataSerializer(ModelSerializer):
    class Meta:
        model = Userdata
        fields = '__all__'


class UserProfileImageSerializer(ModelSerializer):
    class Meta:
        model = Profileimage
        fields = '__all__'


class PostSerializer(ModelSerializer):

    class Meta:
        model = Post
        fields = '__all__'


class MediaSerializer(ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'


class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class LikeSerializer(ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'


class SavedSerializer(ModelSerializer):
    class Meta:
        model = Saved
        fields = '__all__'


class FollowerSerializer(ModelSerializer):
    class Meta:
        model = Follower
        fields = '__all__'


class FollowingSerializer(ModelSerializer):
    class Meta:
        model = Following
        fields = '__all__'
