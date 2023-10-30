from rest_framework import serializers
from colorpredApp.models import ColorInterface
from colorpredApp.models import ManageAudioBooks
from colorpredApp.models import SaveColors

class ColorInterfaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ColorInterface
        fields = ('studentId', 'color', 'disabledColor')

class ManageAudioBooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManageAudioBooks
        fields = ('bookId', 'title', 'author', 'category', 'bookType')

class SaveColorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaveColors
        fields = ('userid', 'colors', 'overlay')  