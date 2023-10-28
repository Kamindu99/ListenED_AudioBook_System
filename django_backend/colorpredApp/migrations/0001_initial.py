# Generated by Django 4.1.4 on 2023-10-28 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ColorInterface',
            fields=[
                ('studentId', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('color', models.CharField(max_length=100)),
                ('disabledColor', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='ManageAudioBooks',
            fields=[
                ('bookId', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('author', models.CharField(max_length=100)),
                ('category', models.CharField(max_length=100)),
                ('bookType', models.CharField(max_length=100)),
            ],
        ),
    ]
