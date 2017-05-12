import jwt
from django.http import Http404
from django.http import HttpResponse
from django.contrib import auth
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.contrib.auth.models import User
from jwt_auth.forms import jwt_decode_handler

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models  import Notification, Technology


def set_Session(request):
    request.session['color'] = 'red'
    return HttpResponse('color is added')

def get_Session(request):
    color = request.session['color']
    return HttpResponse('color= %s'%color)

def index(request):
    user = request.user
    return render_to_response('index.html', {'name':user.username})

def login(request):
    return render_to_response('login.html')

def check_login(request):
    name = request.POST['name']
    passw = request.POST['pa']
    user = auth.authenticate(username=name, password=passw)
    if user !=None:
        auth.login(request, user)
        n = Notification.objects.filter(user=request.user, viewed=False)
        return render_to_response('index.html',{'notifications': n})
    else:
        return render_to_response('login.html')

def logout_view(request):
    auth.logout(request)
    return render_to_response('login.html')

def create(request):
    user = User.objects.create_user(username='john', email = 'jlennon@beatles.com',
    password = 'glass onion')
    user.save()
    return HttpResponse('created')

def show_notification(request, id):
    n = Notification.objects.get(id = id)
    n.viewed = True
    n.save()
    return render_to_response('notification.html', {'notification':n})

def delete_notification(request, id):
    n = Notification.objects.get(id = id)
    n.viewed = True
    n.save()
    return render_to_response('index.html')

def add_notification(request):
    n = Notification(user=request.user, title='posted in problems sections', message='Hi there')
    n.save()
    return HttpResponse('add')

class ActivateUser(APIView):

    def get(self, request, *args, **kwargs):
        token = kwargs.pop('token')
        print (token)
        try:
            payload = jwt_decode_handler(token)
            print (payload)
        except jwt.ExpiredSignature:
            msg = ('Signature has expired.')
            # raise jwt.exceptions.AuthenticationFailed(msg)
        except jwt.DecodeError:
            msg = ('Error decoding signature.')
            # raise jwt.exceptions.AuthenticationFailed(msg)
        except jwt.InvalidTokenError:
            raise jwt.exceptions.AuthenticationFailed()
        user_to_activate = User.objects.get(id=payload.get('user_id'))
        print(user_to_activate.username)
        user_to_activate.is_active = True
        user_to_activate.save()

        return HttpResponse('Activated')

