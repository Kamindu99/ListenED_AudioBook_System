# Generated by Django 4.1.4 on 2023-10-30 10:40

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usermanagement', '0006_alter_usermanagementmodel_overlay_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usermanagementmodel',
            name='overlay',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=200), default=list, size=8),
        ),
    ]
