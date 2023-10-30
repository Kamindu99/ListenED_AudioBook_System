from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from colorpredApp.models import ColorInterface
from colorpredApp.serializers import ColorInterfaceSerializer
from colorpredApp.models import SaveColors
from colorpredApp.serializers import SaveColorsSerializer

from colorpredApp.models import ManageAudioBooks
from colorpredApp.serializers import ManageAudioBooksSerializer


import pandas as pd
from sklearn.neighbors import NearestNeighbors

from sklearn.linear_model import LogisticRegression
import random
import warnings
#import matplotlib.pyplot as plt

#displaying colors that relavant for color type (protanopia/deutanopia) seperately
@csrf_exempt
def colorsPred(request, id=0):
    if request.method=='POST':
        data = JSONParser().parse(request)
        type = data.get('type','')
        print(type)
    
    # Step 1: Load and preprocess the dataset
    data = pd.read_csv('./color_names3.csv')

    # Convert hex color codes to RGB
    data['Red (8 bit)'] = data['Hex (24 bit)'].apply(lambda x: int(x[1:3], 16))
    data['Green (8 bit)'] = data['Hex (24 bit)'].apply(lambda x: int(x[3:5], 16))
    data['Blue (8 bit)'] = data['Hex (24 bit)'].apply(lambda x: int(x[5:7], 16))

    # Encode boolean values as 0 and 1
    data['Visible to Protonopia'] = data['Visible to Protonopia'].astype(int)
    data['Visible to deuternopia'] = data['Visible to deuternopia'].astype(int)

    # Split the dataset into training and testing sets 
    X = data[['Red (8 bit)', 'Green (8 bit)', 'Blue (8 bit)']]
    y_protonopia = data['Visible to Protonopia']
    y_deuternopia = data['Visible to deuternopia']

    warnings.filterwarnings("ignore")

    # Create the LogisticRegression models
    # This model fit to the data for predicting color visibility to different types of color blindness (Protonopia and Deuternopia)
    model_protonopia = LogisticRegression()
    model_protonopia.fit(X, y_protonopia)

    model_deuternopia = LogisticRegression()
    model_deuternopia.fit(X, y_deuternopia)

    #Function to predict visible colors for Protonopia
    def predict_visible_colors_protonopia():
        visible_colors = []
        for index, row in data.iterrows():
            color_rgb = [row['Red (8 bit)'], row['Green (8 bit)'], row['Blue (8 bit)']]
            if model_protonopia.predict([color_rgb])[0]:
                #visible_colors.append(row['Name'])
                visible_colors.append(row['Hex (24 bit)'])

        #Randomly select 5 colors if there are more than 5
        if len(visible_colors) > 5:
            visible_colors = random.sample(visible_colors, 5)
        return visible_colors

    # Function to predict visible colors for Deuternopia
    def predict_visible_colors_deuternopia():
        visible_colors = []
        for index, row in data.iterrows():
            color_rgb = [row['Red (8 bit)'], row['Green (8 bit)'], row['Blue (8 bit)']]
            if model_deuternopia.predict([color_rgb])[0]:
                #visible_colors.append(row['Name'])
                visible_colors.append(row['Hex (24 bit)'])

        # Randomly select 5 colors if there are more than 5
        if len(visible_colors) > 5:
            visible_colors = random.sample(visible_colors, 5)
        return visible_colors

    # Example usage
    # color_blind_type = input("Enter the type of color blindness (protonopia or deuternopia): ").strip().lower()

    color_blind_type = type.strip().lower()

    response_data = {}

    if color_blind_type == 'protanopia':
        visible_colors = predict_visible_colors_protonopia()
        print("Visible Colors for Protonopia:")
        for color in visible_colors:
            print(color)
            response_data = visible_colors
    elif color_blind_type == 'deuteranopia':
        visible_colors = predict_visible_colors_deuternopia()
        print("Visible Colors for Deuteranopia:")
        for color in visible_colors:
            print(color)
            response_data = visible_colors
    else:
        print("Invalid color blindness type. Please enter 'protanopia' or 'deuteranopia'.")
        
    return JsonResponse(response_data, safe=False)

        
@csrf_exempt
def predictcolorApi(request, id=0):
    if request.method=='POST':
        data = JSONParser().parse(request)
        color = data.get('color','')
        print(color)


        
    
    #Load the dataset
    df = pd.read_csv("./color_names.csv")

    # Preprocessing stepsnm
    # For example, convert hex color codes to RGB values
    df['Hex (24 bit)'] = df['Hex (24 bit)'].apply(lambda x: x.lstrip('#'))  # Remove '#' if present
    df['R'] = df['Hex (24 bit)'].apply(lambda x: int(x[0:2], 16) if len(x) == 6 else 0)
    df['G'] = df['Hex (24 bit)'].apply(lambda x: int(x[2:4], 16) if len(x) == 6 else 0)
    df['B'] = df['Hex (24 bit)'].apply(lambda x: int(x[4:6], 16) if len(x) == 6 else 0)

    # Prepare the input features
    X = df[['R', 'G', 'B']]

    # Train the model
    model = NearestNeighbors(n_neighbors=5, algorithm='ball_tree')
    model.fit(X)

    def get_similar_colors(color, num_neighbors=10):
        # Preprocess the user's input color
        r = int(color[0:2], 16)
        g = int(color[2:4], 16)
        b = int(color[4:6], 16)
        
        # Find the nearest neighbors
        distances, indices = model.kneighbors([[r, g, b]], n_neighbors=num_neighbors)
        
        # Get the similar colors from the dataset
        similar_colors = df.loc[indices[0], ['Hex (24 bit)', 'Name']]
        
        return similar_colors

    #color_code = '00ff00'  # Red color code

    similar_colors = get_similar_colors(color)
    similar_colors_dict = similar_colors.to_dict(orient='records')

    return JsonResponse({'predictedcolors': similar_colors_dict}, safe=False)

# Create your views here.
@csrf_exempt
def colorInterfaceApi(request, id=0):
    if request.method=='GET':
        colorinterface = ColorInterface.objects.all()
        colorinterface_serializer = ColorInterfaceSerializer(colorinterface, many=True)
        return JsonResponse(colorinterface_serializer.data, safe=False)
    elif request.method=='POST':
        colorinterface_data=JSONParser().parse(request)
        colorinterface_serializer = ColorInterfaceSerializer(data=colorinterface_data)
        if colorinterface_serializer.is_valid():
            colorinterface_serializer.save()
            return JsonResponse("Added Successfully!!", safe=False)
        return JsonResponse("Failed to Add.", safe=False)
    elif request.method=='PUT':
        colorinterface_data = JSONParser().parse(request)
        colorinterface = ColorInterface.objects.get(studentId=colorinterface_data['studentId'])
        colorinterface_serializer = ColorInterfaceSerializer(colorinterface, data=colorinterface_data)
        if colorinterface_serializer.is_valid():
            colorinterface_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)
    elif request.method=='DELETE':
        colorinterface_data = JSONParser().parse(request)
        colorinterface = ColorInterface.objects.get(studentId=colorinterface_data['studentId'])
        colorinterface.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)

@csrf_exempt
def manageAudioBooksApi(request, id=0):
    if request.method=='GET':
        manageaudiobooks = ManageAudioBooks.objects.all()
        manageaudiobooks_serializer = ManageAudioBooksSerializer(manageaudiobooks, many=True)
        return JsonResponse(manageaudiobooks_serializer.data, safe=False)
    elif request.method=='POST':
        manageaudiobooks_data=JSONParser().parse(request)
        manageaudiobooks_serializer = ManageAudioBooksSerializer(data=manageaudiobooks_data)
        if manageaudiobooks_serializer.is_valid():
            manageaudiobooks_serializer.save()
            return JsonResponse("Added Successfully!!", safe=False)
        return JsonResponse("Failed to Add.", safe=False)
    elif request.method=='PUT':
        manageaudiobooks_data = JSONParser().parse(request)
        manageaudiobooks = ManageAudioBooks.objects.get(bookId=manageaudiobooks_data['bookId'])
        manageaudiobooks_serializer = ManageAudioBooksSerializer(manageaudiobooks, data=manageaudiobooks_data)
        if manageaudiobooks_serializer.is_valid():
            manageaudiobooks_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)
    elif request.method=='DELETE':
        manageaudiobooks_data = JSONParser().parse(request)
        manageaudiobooks = ManageAudioBooks.objects.get(bookId=manageaudiobooks_data['bookId'])
        manageaudiobooks.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)
 
@csrf_exempt
def saveColorsApi(request, pk=0):
    if request.method == 'GET':
        savecolors = SaveColors.objects.all()
        savecolors_serializer = SaveColorsSerializer(savecolors, many=True)
        return JsonResponse(savecolors_serializer.data, safe=False)

    elif request.method == 'POST':
        savecolors_data = JSONParser().parse(request)
        savecolors_serializer = SaveColorsSerializer(data=savecolors_data)
        if savecolors_serializer.is_valid():
            savecolors_serializer.save()
            return JsonResponse("Added Successfully!!", safe=False)
        return JsonResponse(savecolors_serializer.errors, status=400)

    elif request.method == 'PUT':
        try:
            savecolors_data = JSONParser().parse(request)
            savecolors = SaveColors.objects.get(userid=savecolors_data['userid'])
            savecolors_serializer = SaveColorsSerializer(savecolors, data=savecolors_data)
            if savecolors_serializer.is_valid():
                savecolors_serializer.save()
                return JsonResponse("Updated Successfully!!", safe=False)
            return JsonResponse(savecolors_serializer.errors, status=400)
        except SaveColors.DoesNotExist:
            return JsonResponse("SaveColors with the specified ID does not exist.", status=404)

    elif request.method == 'DELETE':
        try:
            savecolors = SaveColors.objects.get(pk=pk)
            savecolors.delete()
            return JsonResponse("Deleted Successfully!!", safe=False)
        except SaveColors.DoesNotExist:
            return JsonResponse("SaveColors with the specified ID does not exist.", status=404)
        
    
    # get by userid
    elif request.method == 'GET':
        try:
            savecolors = SaveColors.objects.filter(userid=pk)
            savecolors_serializer = SaveColorsSerializer(savecolors, many=True)
            return JsonResponse(savecolors_serializer.data, safe=False)
        except SaveColors.DoesNotExist:
            return JsonResponse("SaveColors for the specified user do not exist.", status=404)
        
        