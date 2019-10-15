# Generated by Django 2.2.3 on 2019-10-14 16:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('exercise', '0002_auto_20191014_1615'),
    ]

    operations = [
        migrations.AlterField(
            model_name='program',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='program', to=settings.AUTH_USER_MODEL),
        ),
    ]