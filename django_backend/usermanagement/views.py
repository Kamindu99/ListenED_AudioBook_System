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
from usermanagement.serializers import UserLoginSerializer

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
    elif request.method=='DELETE':
        user_data = UserManagementModel.objects.get(userid=id)
        user_data.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)

@csrf_exempt
def loginapis(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            # Check email and password
            user = authenticate(request, email=email, password=password)

            if user is not None:
                login(request, user)
                return JsonResponse("Login successful!", status=status.HTTP_200_OK)
            else:
                return JsonResponse("Login failed. Please check your credentials.", status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    