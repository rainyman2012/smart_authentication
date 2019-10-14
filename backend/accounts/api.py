from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserSerializer, LoginSerializer


# Register API

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        # In my experience we didnt need that contex variable at all.
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key,
            "created": created})


class CheckExistUserAPI(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        user = User.objects.filter(username__iexact=request.data['username'])
        if user:
            # In my experience we didnt need that contex variable at all.
            return Response({"msg": "USER_EXISTED"})
        else:
            return Response({"msg": "USER_NOT_EXISTED"})


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        # TODO You must check this user is active or not

        # In my experience we didnt need that contex variable at all.
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key,
            "created": created})

# Get User Apo


class UserApi(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
