from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

class Profile(models.Model):
    user = models.ForeignKey(User)
    image = models.ImageField(upload_to='image',
                null=True,
                blank=True,
                # width_field="width_field",
                # height_field="height_field"
                                  )
    audio = models.FileField(upload_to='audio', max_length=200, null=True, blank=True)
    video = models.FileField(upload_to='video', max_length=200, null=True, blank=True)
    skills = models.CharField(max_length=300, null=True, blank=True)


class Problems(models.Model):
    content = models.CharField(max_length=500)
    publish_user = models.ForeignKey(User, default=1)
    problem_rate = models.IntegerField(blank = True, null = True)
    category = models.CharField(max_length=20, null=True, blank=True)
    date = models.DateTimeField(auto_now=True, auto_now_add=False)
    # p   = models.ForeignKey(Profile, blank = True, null = True)

class CommentProblem(models.Model):
    user = models.ForeignKey(User)
    content = models.CharField(max_length=120, blank=True)
    date = models.DateTimeField(auto_now=True, auto_now_add=False)
    problem = models.ForeignKey(Problems, related_name='Comment', on_delete=models.CASCADE, blank = True, null = True)

    def __str__(self):
        return self.content



class Projects(models.Model):
    name = models.CharField(max_length=60)
    publish_user = models.ForeignKey(User)
    date = models.DateTimeField(auto_now=True, auto_now_add=False)
    idea = models.CharField(max_length=3000, null=True, blank=True)
    technologies = models.CharField(max_length=3000, null=True, blank=True)
    team = models.CharField(max_length=3000, null=True, blank=True)
    image = models.ImageField(upload_to='image',
                              null=True,
                              blank=True,
                              # width_field="width_field",
                              # height_field="height_field"
                              )
    video = models.FileField(upload_to='video', max_length=200, null=True, blank=True)
    file = models.FileField(upload_to='files', max_length=200, null=True, blank=True)



class CommentProject(models.Model):
    user = models.ForeignKey(User)
    content = models.CharField(max_length=120, blank=True)
    date = models.DateTimeField(auto_now=True, auto_now_add=False)
    project = models.ForeignKey(Projects, related_name='Comment', blank=True, null=True)

class Reply(models.Model):
    user = models.ForeignKey(User)
    content = models.CharField(max_length=120)
    date = models.DateTimeField(auto_now=True, auto_now_add=False)
    # comment = models.ForeignKey(Comments)

class Notification(models.Model):
    title = models.CharField(max_length=30)
    message = models.TextField()
    viewed = models.BooleanField(default=False)
    user = models.ForeignKey(User)

# @receiver(post_save, sender=User)
# def create_welcome_message(sender, **kwargs):
#     if kwargs.get('created', False):
#         Notification.objects.create(user=kwargs.get('instance'), title='Hi',
#                                     message='Go To Home')

class ProfileManager(models.Manager):
    def active(self, *args, **kwargs):
        return super(ProfileManager, self).filter(draft=False).filter(puplish = timezone.now())



class Technology(models.Model):
    technology = models.CharField(max_length = 20, blank = False)

    def __unicode__(self):
        return self.technology

class FindTeam(models.Model):
    content = models.CharField(max_length = 200, blank = True)
    date = models.DateTimeField(auto_now=True, auto_now_add=False)
    teamUser = models.ForeignKey(User)


