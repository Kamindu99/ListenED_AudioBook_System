# Generated by Django 4.1.4 on 2023-10-28 14:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AudioBook',
            fields=[
                ('bookId', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('bookName', models.CharField(max_length=200)),
                ('author', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='SinhalaAudio',
            fields=[
                ('studentId', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('studentName', models.CharField(max_length=100)),
                ('words', models.CharField(max_length=1000)),
            ],
        ),
    ]
