from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import *
from rest_framework import viewsets
from rest_framework.reverse import reverse
from django.http import HttpResponse
from .models import *
from .serializers import *
from rest_framework.mixins import RetrieveModelMixin, UpdateModelMixin, CreateModelMixin
from rest_framework import status
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings


jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

class UserCreateAPIView(viewsets.ModelViewSet):
    serializer_class = UserDetailSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny,]

class ProblemViewset(viewsets.ModelViewSet):
    # lookup_field = 'id'\
    user = UserCreateAPIView()
    serializer_class = ProblemSerializer
    queryset = Problems.objects.all()
    permission_classes = (AllowAny,)

class ProjectViewset(viewsets.ModelViewSet):
    user = UserCreateAPIView()
    serializer_class = ProjectSerializer
    queryset = Projects.objects.all()
    permission_classes = (AllowAny,)

class CommentProblemViewset(viewsets.ModelViewSet):
    # lookup_field = 'id'
    user = UserCreateAPIView()
    serializer_class = CommentProblemSerializer
    queryset = CommentProblem.objects.all()
    permission_classes=(AllowAny,)

class CommentProjectViewset(viewsets.ModelViewSet):
    # lookup_field = 'id'
    user = UserCreateAPIView()
    serializer_class = CommentProjectSerializer
    queryset = CommentProject.objects.all()
    permission_classes=(AllowAny,)

class ReplyViewset(viewsets.ModelViewSet):
    # lookup_field = 'id'
    user = UserCreateAPIView()
    serializer_class = ReplaySerializer
    queryset = Reply.objects.all()
    permission_classes=(AllowAny,)

class ProfileViewet(viewsets.ModelViewSet):
    user = UserCreateAPIView()
    serializer_class = Profileselializer
    queryset = Profile.objects.all()


class CreateUserView(CreateAPIView):
    model = User.objects.all()
    permission_classes = [
        AllowAny, # Or anon users can't register
    ]
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        user = self.model.get(username=serializer.data['username'])
        user.is_active = True
        user.save()
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        # print token
        return Response(
            {
                'confirmation_url': reverse(
                    'activate-user', args=[token], request=request
                )
            },
            status=status.HTTP_201_CREATED, headers=headers
        )

class ProblemUserView(viewsets.ModelViewSet):
    serializer_class = ProblemUser
    queryset         = Problems.objects.all()

class ProblemCommentView(viewsets.ModelViewSet):
    serializer_class = ProblemCommentSerializer
    queryset         = CommentProblem.objects.all()

class NestedView(viewsets.ModelViewSet):
    lookup_field = 'id'
    serializer_class = NestedSerializer
    queryset = Problems.objects.all()

###########################################################################################################
###########################################################################################################

# view set for nested problrm serializers Problem=>user =>comment=>user

class TestView(viewsets.ModelViewSet):
    serializer_class = NestedWorkedSerializer
    queryset         = Problems.objects.all()
# #############################################################################################
# Projects ya halawa
# view set for nested project serializers project=>user =>comment=>user
class Test1View(viewsets.ModelViewSet):
    serializer_class = NestedProjectSerializer
    queryset         = Projects.objects.all()