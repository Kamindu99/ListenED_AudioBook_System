# Generated by Django 4.1.4 on 2023-10-30 10:55

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usermanagement', '0008_remove_usermanagementmodel_overlay'),
    ]

    operations = [
        migrations.AddField(
            model_name='usermanagementmodel',
            name='overlay',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=200), default=list, size=8),
        ),
    ]
