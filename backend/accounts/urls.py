from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserApi
from rest_framework.authtoken import views

app_name = "auth"
urlpatterns = [
    path('', include('knox.urls')),
    path('register', RegisterAPI.as_view()),
    path('login', LoginAPI.as_view()),
    path('user', UserApi.as_view())

]
