from django.urls import path, include, reverse
from exercise.views import (
    ProgramViewSet
)
from rest_framework.routers import DefaultRouter
app_name = 'api'

router = DefaultRouter()
router.register(r'', ProgramViewSet, base_name='exercise')


urlpatterns = router.urls

