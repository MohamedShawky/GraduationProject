from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import serializers

from Project.models import  Problems, CommentProblem, CommentProject, Reply, Profile, Projects


User = get_user_model()

class UserDetailSerializer(serializers.HyperlinkedModelSerializer):
    # image = SerializerMethodField()
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'password',

        )
    def __unicode__(self):
        return User.username

class ReplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        # fields = '__all__'
        fields = ('user', 'content', 'date', 'comment')

class CommentProblemSerializer(serializers.ModelSerializer):
    # content = ReplaySerializer(read_only=False)
    class Meta:
        model = CommentProblem
        fields = '__all__'

    # def create(self, validated_data):
    #     content = validated_data.pop('content')
    #     reply = Comments.objects.create(**validated_data)
    #     for track_data in content:
    #         Comments.objects.create(content = reply, **track_data)
    #     return reply

class CommentProjectSerializer(serializers.ModelSerializer):
    # content = ReplaySerializer(read_only=False)
    class Meta:
        model = CommentProject
        fields = '__all__'


class ProblemSerializer(serializers.ModelSerializer):
    # comment = CommentSerializer(read_only=False)

    class Meta:
        model = Problems
        fields = '__all__'

    # def create(self, validated_data):
    #     comments_data = validated_data.pop('comment')
    #     comment = Problems.objects.create(**validated_data)
    #     for track_data in comments_data:
    #         Comments.objects.create(comment = comment, **track_data)
    #     return comment

    # def create(self, validated_data):
    #     pro = Problems(**validated_data)
    #     pro.save()
    #     return pro

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = '__all__'

class Profileselializer(serializers.ModelSerializer):
    # image = SerializerMethodField(read_only=False)
    class Meta:
        model = Profile
        fields = (
            'id',
            'user',
            'skills',
            'image',
            'audio',
            'video',

        )
    def get_image(self, obj):
        try:
            image =  obj.image.path
        except:
            image = None
        return image



# tryyyyyyyyyyyyyyyyy

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'first_name', 'last_name', 'email')

    def create(self, validated_data):
        user = User(
            password=validated_data['password'],
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.is_active = False
        user.save()
        return user

class NestedSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(read_only = True)
    problem = ProblemSerializer(read_only = True)

    class Meta:
        model = Problems
        fields = (
            'content',
            'date',
            'user',
            'problem',

        )

