from django.db import models
import uuid
import base64
from PIL import Image

from django.db.models import Q
from passlib.hash import pbkdf2_sha256
from django.conf import settings
from django.utils.translation import gettext_lazy as _


def generate_uuid():
    _uuid = base64.urlsafe_b64encode(uuid.uuid4().bytes)
    _uuid = _uuid.decode('utf-8').replace('=', '')
    return _uuid


class ProgramManager(models.Manager):

    def create(self, **kwargs):
        obj = super().create(**kwargs)
        obj.password = pbkdf2_sha256.encrypt(
            obj.password, rounds=12000, salt_size=32)
        obj.save()
        return obj

    def get_model_fields(self):
        return self.model._meta.fields

    def get_exercise(self, _uuid):
        return self.filter(uuid__exact=_uuid).first()

    def verify_password(self, password, uuid):
        obj = self.filter(uuid__iexact=uuid).first()
        if obj:
            return pbkdf2_sha256.verify(password, obj.password)
        return False


class Program(models.Model):
    name = models.CharField(max_length=80)
    uuid = models.CharField(max_length=32, blank=True,
                            null=True, default=generate_uuid)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='program',
        on_delete=models.CASCADE, null=True, blank=True
    )
    password = models.CharField(max_length=256, default="1234")
    objects = ProgramManager()

    def __str__(self):
        return self.name
