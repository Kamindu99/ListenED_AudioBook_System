# Generated by Django 4.1.4 on 2023-10-30 16:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usermanagement', '0010_usermanagementmodel_fontconfig'),
    ]

    operations = [
        migrations.AddField(
            model_name='usermanagementmodel',
            name='topicfontconfig',
            field=models.JSONField(default=dict),
        ),
    ]
