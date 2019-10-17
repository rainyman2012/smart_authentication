from django.urls import path, include, reverse
from django.conf.urls import url
from .views import (
    ProgramViewSet,
    ProfileView,
)

from rest_framework.routers import DefaultRouter
app_name = 'api'

urlpatterns = [
    url(r'profile/', ProfileView.as_view(), name="profile")
]


router = DefaultRouter()
router.register(r'program', ProgramViewSet, base_name="Program")


urlpatterns += router.urls

print(router.urls)
