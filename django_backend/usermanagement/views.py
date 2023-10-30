from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from usermanagement.models import UserManagementModel
from usermanagement.serializers import UserManagementSerializer
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
import json
from django.contrib.auth.hashers import check_password

@csrf_exempt
def usermanagementApi(request, id=0):
    if request.method == 'GET':
        if id:
            try:
                user = UserManagementModel.objects.get(userid=id)
                user_serializer = UserManagementSerializer(user)
                return JsonResponse(user_serializer.data)
            except UserManagementModel.DoesNotExist:
                return JsonResponse({"error": "user not found"}, status=404)
        else:
            users = UserManagementModel.objects.all()
            users_serializer = UserManagementSerializer(users, many=True)
            return JsonResponse(users_serializer.data, safe=False)
    
    elif request.method=='POST':
        user_data = JSONParser().parse(request)
        user_serializer = UserManagementSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Added Successfully!!", safe=False)
        return JsonResponse("Failed to Add.", safe=False)

    elif request.method == 'PUT':
        user_data = JSONParser().parse(request)
        try:
            user = UserManagementModel.objects.get(userid=user_data['userid'])
        except UserManagementModel.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)

        user_serializer = UserManagementSerializer(user, data=user_data, partial=True)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse(user_serializer.errors, status=400)

    elif request.method=='DELETE':
        user_data = UserManagementModel.objects.get(userid=id)
        user_data.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            password = data.get('password')
            
            if password:
                try:
                    user = UserManagementModel.objects.get(password=password)
                    if user:
                        # Password matches
                        return JsonResponse({'status': 'Login successful', 'userid': user.userid}, status=200)
                    else:
                        # Password doesn't match
                        return JsonResponse({'error': 'Invalid login credentials'}, status=401)
                except UserManagementModel.DoesNotExist:
                    # User with the provided email doesn't exist
                    return JsonResponse({'error': 'Invalid login credentials'}, status=401)
            else:
                return JsonResponse({'error': 'Email and password are required.'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=400)