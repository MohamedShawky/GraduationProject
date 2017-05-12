from django.contrib import admin

# Register your models here.
from Project.models import Problems, CommentProject, CommentProblem, Reply, Notification, Profile, Technology, Projects

admin.site.register(Problems)
admin.site.register(Projects)
admin.site.register(CommentProblem)
admin.site.register(CommentProject)
admin.site.register(Reply)
admin.site.register(Profile)
admin.site.register(Notification)
admin.site.register(Technology)