from django.db import models
from users.models import UserAccount as User

class Userdata(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile_pic = models.TextField()
    website = models.TextField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    phone_no = models.CharField(max_length=10, blank=True, null=True, unique=True)
    no_of_followers = models.IntegerField(default=0, blank=True, null=True)
    no_of_following = models.IntegerField(default=0, blank=True, null=True)

    def __str__(self):
        return self.user.email

class Profileimage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile_pic = models.TextField()

    def __str__(self):
        return self.user.email

class Post(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE )
    username = models.CharField(max_length=255, blank=True)
    caption = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    no_of_likes = models.IntegerField(default=0, blank=True, null=True)
    class Meta:
        # ordering = ['-no_of_likes', '-updated', '-created']
        ordering = ['-created']

    def setUsername(self):
        self.username = self.user.get_full_name()

    def getNoOfLikes(self):
        self.no_of_likes = self.like_set.all().count()

    def __str__(self):
        return self.caption[0:20]

class Media(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    type= models.CharField(max_length=255)
    media_url = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.type

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=255, blank=True)
    message = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.message[0:15]

class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=255, blank=True)
    like = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.user.get_short_name()

class Saved(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=255, blank=True)
    savePost = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.user.get_short_name()


class Follower(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=255, blank=True) 
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.username

class Following(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=255,blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.username

