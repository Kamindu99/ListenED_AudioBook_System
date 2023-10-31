from django.db import models

# Create your models here.

class Audiobook(models.Model):
    bookid = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    genre = models.CharField(max_length=100)
    studyarea = models.CharField(max_length=100)
    url = models.CharField(max_length=200)
    nameurl = models.CharField(max_length=300)
    pages = models.CharField(max_length=100)
    year = models.CharField(max_length=100)