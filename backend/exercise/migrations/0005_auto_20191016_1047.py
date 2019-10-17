# Generated by Django 2.2.3 on 2019-10-16 10:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exercise', '0004_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='age',
            field=models.PositiveIntegerField(default=10),
        ),
        migrations.AlterField(
            model_name='profile',
            name='gender',
            field=models.CharField(max_length=2),
        ),
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='profile_pics'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='lang',
            field=models.CharField(max_length=10),
        ),
    ]