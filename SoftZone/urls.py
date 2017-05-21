"""SoftZone URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import url, include, static
from django.contrib import admin
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token
from django.conf import settings


from Project.view import *
from Project.viewSet import *
# postUser,
router = routers.DefaultRouter()
router.register(r'user',UserCreateAPIView,r'user')
router.register(r'profile',ProfileViewet,r'profile')
router.register(r'problem',ProblemViewset,r'problem')
router.register(r'project',ProjectViewset,r'project')
router.register(r'commentproblem',CommentProblemViewset,r'commentproblem')
router.register(r'commentproject',CommentProjectViewset,r'commentproject')
router.register(r'reply',ReplyViewset,r'reply')
router.register(r'problemUser',ProblemUserView, r'problemUser')
router.register(r'problemUComment',ProblemCommentView, r'problemUComment')
router.register(r'worked',TestView, r'worked')
router.register(r'nestedProject',Test1View, r'nestedProject')

router.register(r'nested',NestedView, r'nested')


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^accounts/', include('allauth.urls')),
    url(r'^accounts/profile', login),
    # token
    url(r'^api-token-auth/', obtain_jwt_token),
    url('^api-register/$', CreateUserView.as_view()),
    url('^api-activate/(?P<token>.+?)/$', ActivateUser.as_view(), name='activate-user'),

    url(r'',include(router.urls, namespace = 'user')),
    url(r'', include(router.urls, namespace='profile')),
    url(r'', include(router.urls, namespace='problem')),
    url(r'', include(router.urls, namespace='project')),
    url(r'', include(router.urls, namespace='commentproblem')),
    url(r'', include(router.urls, namespace='commentproject')),
    url(r'', include(router.urls, namespace='reply')),
    url(r'', include(router.urls, namespace='problemUser')),
    url(r'', include(router.urls, namespace='problemcommentU')),

    url(r'', include(router.urls, namespace='nested')),
    url(r'', include(router.urls, namespace='worked')),
    url(r'', include(router.urls, namespace='nestedProject')),

    url(r'^getSession/', get_Session),
    url(r'^setSession/', set_Session),
    url(r'index/', index),
    url(r'^login/', login),
    url('^checklogin', check_login, name='login'),
    url('^logout/', logout_view, name='logout'),
    url('create', create),
    # url('notification', send_notification),
    # url('^notification', include(notification))
    url('^show/(?P<id>\d)/$', show_notification),
    url('^delete/(?P<id>\d)/$', delete_notification),
    url('add_notification',add_notification),
]