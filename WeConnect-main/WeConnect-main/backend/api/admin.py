from django.contrib import admin
from .models import Post, Comment, Like, Media, Follower, Following, Saved

admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(Saved)
admin.site.register(Media)
admin.site.register(Follower)
admin.site.register(Following)