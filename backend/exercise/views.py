from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
import json
from pudb import set_trace
# from rest_framework import viewsets
from rest_framework.response import Response

from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)


from rest_framework import viewsets, mixins
from exercise.serializers import (
    ProgramSerializer,
)

from .models import Program
import io
from rest_framework import authentication, permissions
from rest_framework.views import APIView

from rest_framework.generics import (
    ListAPIView,
)
from django.contrib.auth.models import User
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.middleware.csrf import get_token
from django.db.models import Q


class ProgramViewSet(viewsets.ModelViewSet):
    serializer_class = ProgramSerializer
    queryset = Program.objects.all()
    lookup_field = 'uuid'