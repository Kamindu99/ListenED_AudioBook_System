from rest_framework import serializers
from booksApp.models import Audiobook

class AudiobookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audiobook
        fields = ('bookid', 'title', 'author', 'genre', 'studyarea','url','nameurl','pages','year')