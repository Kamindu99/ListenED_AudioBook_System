
from django.db import models
#import uuid

# Create your models here.

class ColorInterface(models.Model):
    studentId = models.CharField(max_length=100, primary_key=True)
    color = models.CharField(max_length=100)
    disabledColor = models.CharField(max_length=100)

class ManageAudioBooks(models.Model):
    #id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    bookId = models.CharField(max_length=100, primary_key=True)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    bookType = models.CharField(max_length=100)

# //crete a model with userid and colors array
class SaveColors(models.Model):
    userid = models.CharField(max_length=100, primary_key=True)
    colors = models.TextField()
    overlay = models.CharField(max_length=100)

