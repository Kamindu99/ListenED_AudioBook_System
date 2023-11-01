from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from booksApp.models import Audiobook
from booksApp.serializers import AudiobookSerializer
 
from your_model_module import YourHandModel
 
hand_model = YourHandModel()
 
@csrf_exempt
def audiobooksApi(request, id=0):
    if request.method == 'GET':
        if id:
            try:
                book = Audiobook.objects.get(bookid=id)
                book_serializer = AudiobookSerializer(book)
                return JsonResponse(book_serializer.data)
            except Audiobook.DoesNotExist:
                return JsonResponse({"error": "Audiobook not found"}, status=404)
        else:
            books = Audiobook.objects.all()
            books_serializer = AudiobookSerializer(books, many=True)
            return JsonResponse(books_serializer.data, safe=False)
    elif request.method == 'POST':
        book_data = JSONParser().parse(request)
        book_serializer = AudiobookSerializer(data=book_data)
        if book_serializer.is_valid():
            book_serializer.save()
            return JsonResponse("Added Successfully!!", safe=False)
        return JsonResponse("Failed to Add.", safe=False)
    elif request.method == 'PUT':
        book_data = JSONParser().parse(request)
        book = Audiobook.objects.get(bookid=book_data['bookid'])
        book_serializer = AudiobookSerializer(book, data=book_data)
        if book_serializer.is_valid():
            book_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)
    elif request.method == 'DELETE':
        book = Audiobook.objects.get(bookid=id)
        book.delete()
        return JsonResponse("Deleted Successfully!!", safe=False)
    elif request.method == 'POST' and request.path == '/hand_movement_recognition/':
        image_data = request.FILES.get('image')
        if image_data:
            recognition_result = hand_model.recognize_hand_movement(image_data)
            return JsonResponse({"result": recognition_result})
        else:
            return JsonResponse({"error": "Image data not provided"}, status=400)
    return JsonResponse("Invalid request", status=400)