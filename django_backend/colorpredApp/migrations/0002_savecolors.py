# Generated by Django 4.1.4 on 2023-10-30 02:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('colorpredApp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SaveColors',
            fields=[
                ('userid', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('colors', models.CharField(max_length=100)),
                ('overlay', models.CharField(max_length=100)),
            ],
        ),
    ]