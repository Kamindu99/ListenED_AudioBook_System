from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from sinhalaNLP.models import SinhalaAudio
from sinhalaNLP.serializers import SinhalaAudioSerializer
from sinhalaNLP.models import AudioBook
from sinhalaNLP.serializers import AudioBookSerializer

import speech_recognition as sr
import pyttsx3
from django.shortcuts import render
from django.http import JsonResponse
import spacy
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn import preprocessing
import string
from sklearn.feature_extraction.text import TfidfVectorizer


@csrf_exempt

@csrf_exempt
def svct(request, id=0):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        text = data.get('text', '')  # Extract the value of the "text" key
        print(text)  # Print only the value of "text"

    
    nlp = spacy.load("en_core_web_sm")

    # Process the text
    doc = nlp(text)

    # Initialize lists for each part of speech
    nouns = []
    verbs = []
    adjectives = []
    adverbs = []

    # Iterate over the tokens and identify parts of speech
    for token in doc:
        if token.pos_ == "NOUN":
            nouns.append(token.text)
        elif token.pos_ == "VERB":
            verbs.append(token.text)
        elif token.pos_ == "ADJ":
            adjectives.append(token.text)
        elif token.pos_ == "ADV":
            adverbs.append(token.text)
    

    print("Noun phrases:", nouns)
    print("Verbs:", verbs)
    print("Adjectives:", adjectives)
    print("Adverbs:", adverbs)


    # Return the identified parts of speech
    # return nouns, verbs, adjectives, adverb

    
    # Replace 'path_to_csv' with the actual path to your CSV file
    data = pd.read_csv('./dataU2.csv')
    # Remove unnecessary columns
    data = data[['BaseForm', 'PastForm', 'PastParticipleForm', 'Sform', 'IngForm']]

    # Drop rows with missing values, if any
    data = data.dropna()

    # Reset the index
    data = data.reset_index(drop=True)
    X = data[['BaseForm', 'PastForm', 'PastParticipleForm', 'Sform', 'IngForm']]
    y = data['BaseForm']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Preprocess the text data
    translator = str.maketrans('', '', string.punctuation)
    X_train_features = X_train['BaseForm'] + ' ' + X_train['PastForm'] + ' ' + X_train['PastParticipleForm'] + ' ' + X_train['Sform'] + ' ' + X_train['IngForm']
    X_train_features = X_train_features.str.lower().str.translate(translator)
    X_test_features = X_test['BaseForm'] + ' ' + X_test['PastForm'] + ' ' + X_test['PastParticipleForm'] + ' ' + X_test['Sform'] + ' ' + X_test['IngForm']
    X_test_features = X_test_features.str.lower().str.translate(translator)

    # Initialize a CountVectorizer to convert text features into numerical vectors
    vectorizer = CountVectorizer()

    # Fit the vectorizer on the training features and transform them
    X_train_vectors = vectorizer.fit_transform(X_train_features)

    # Initialize an SVM model
    model = SVC()

    # Train the model on the training vectors and labels
    model.fit(X_train_vectors, y_train)

    # Transform the test features using the fitted vectorizer
    X_test_vectors = vectorizer.transform(X_test_features)

    # Make predictions on the test set
    y_pred = model.predict(X_test_vectors)


    def predict_regular_verbs(verb_forms):
        predicted_verbs = []
        for verb_form in verb_forms:
            verb_form_features = verb_form.replace(',', ' ').replace('.', ' ').replace('-', ' ')
            verb_form_features = verb_form_features.lower().translate(translator)
            verb_form_vector = vectorizer.transform([verb_form_features])
            predicted_verb = model.predict(verb_form_vector)
            predicted_verbs.append(predicted_verb[0])
        return predicted_verbs

    print(predict_regular_verbs(verbs))

    predicted_verbs = predict_regular_verbs(verbs)
    
    return JsonResponse([{'predicted_verbs': predicted_verbs, 'nouns' : nouns }], safe=False)



@csrf_exempt
def predictword(request, id=0):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        text = data.get('text', '')
        print(text) 

    nlp = spacy.load("en_core_web_sm")

    # Process the text
    doc = nlp(text)

    # Initialize lists for each part of speech
    nouns = []
    verbs = []
    adjectives = []
    adverbs = []

    # Iterate over the tokens and identify parts of speech
    for token in doc:
        if token.pos_ == "NOUN":
            nouns.append(token.text)
        elif token.pos_ == "VERB":
            verbs.append(token.text)
        elif token.pos_ == "ADJ":
            adjectives.append(token.text)
        elif token.pos_ == "ADV":
            adverbs.append(token.text)

    print("Noun phrases:", nouns)
    print("Verbs:", verbs)
    print("Adjectives:", adjectives)
    print("Adverbs:", adverbs)

    # Replace 'path_to_csv' with the actual path to your CSV file
    data = pd.read_csv('./dataU2.csv')
    # Remove unnecessary columns
    data = data[['BaseForm', 'PastForm', 'PastParticipleForm', 'Sform', 'IngForm']]

    # Drop rows with missing values, if any
    data = data.dropna()

    # Reset the index
    data = data.reset_index(drop=True)
    X = data[['BaseForm', 'PastForm', 'PastParticipleForm', 'Sform', 'IngForm']]
    y = data['BaseForm']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Preprocess the text data
    translator = str.maketrans('', '', string.punctuation)
    X_train_features = X_train['BaseForm'] + ' ' + X_train['PastForm'] + ' ' + X_train['PastParticipleForm'] + ' ' + X_train['Sform'] + ' ' + X_train['IngForm']
    X_train_features = X_train_features.str.lower().str.translate(translator)
    X_test_features = X_test['BaseForm'] + ' ' + X_test['PastForm'] + ' ' + X_test['PastParticipleForm'] + ' ' + X_test['Sform'] + ' ' + X_test['IngForm']
    X_test_features = X_test_features.str.lower().str.translate(translator)

    # Initialize a CountVectorizer to convert text features into numerical vectors
    vectorizer = CountVectorizer()

    # Fit the vectorizer on the training features and transform them
    X_train_vectors = vectorizer.fit_transform(X_train_features)

    # Initialize a RandomForestClassifier model
    model = RandomForestClassifier()

    # Train the model on the training vectors and labels
    model.fit(X_train_vectors, y_train)
    

    # Transform the test features using the fitted vectorizer
    X_test_vectors = vectorizer.transform(X_test_features)

    # Make predictions on the test set
    y_pred = model.predict(X_test_vectors)
    
    def predict_regular_verbs(verb_forms):
        predicted_verbs = []
        for verb_form in verb_forms:
            verb_form_features = verb_form.replace(',', ' ').replace('.', ' ').replace('-', ' ')
            verb_form_features = verb_form_features.lower().translate(translator)
            verb_form_vector = vectorizer.transform([verb_form_features])
            predicted_verb = model.predict(verb_form_vector)
            predicted_verbs.append(predicted_verb[0])
        return predicted_verbs

    print(predict_regular_verbs(verbs))

    predicted_verbs = predict_regular_verbs(verbs)


    print(predicted_verbs)

    output_string = ', '.join(predicted_verbs)
    output = ["sss", "www", "ww"]
    out = ', '.join(output)

    print(out)

    print(output_string)






    data2 = pd.read_csv('./synonym.csv')

    # Split the data into features (X) and labels (y)
    X = data2['Word']
    y = data2['Synonyms']

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Vectorize the text data using TF-IDF
    tfidf_vectorizer = TfidfVectorizer()
    X_train_tfidf = tfidf_vectorizer.fit_transform(X_train)
    X_test_tfidf = tfidf_vectorizer.transform(X_test)

    # Train a Random Forest classifier
    classifier = RandomForestClassifier()
    classifier.fit(X_train_tfidf, y_train)

    # Make predictions on the testing data
    y_pred = classifier.predict(X_test_tfidf)

    # Evaluate the model
    # accuracy = accuracy_score(y_test, y_pred)
    # report = classification_report(y_test, y_pred)

    # print(f'Accuracy: {accuracy}')
    # print(f'Classification Report:\n{report}')

    # Predict synonyms for a given word
    input_word = output_string
    input_word_tfidf = tfidf_vectorizer.transform([input_word])
    synonym_predictions = classifier.predict(input_word_tfidf)[0].split(',')

    print(f'Synonyms for "{input_word}": {synonym_predictions}')




    













    # return JsonResponse([{'predicted_verbs': predicted_verbs, 'nouns' : nouns }], safe=False)
    data = {'predicted_verbs': predicted_verbs, 'nouns': nouns, "similar": synonym_predictions}








    return JsonResponse(data, safe=False)





@csrf_exempt
def textGetbyPost(request, id=0):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        text = data.get('text', '')  # Extract the value of the "text" key
        print(text)  # Print only the value of "text"

    
    nlp = spacy.load("en_core_web_sm")

    # Process the text
    doc = nlp(text)

    # Initialize lists for each part of speech
    nouns = []
    verbs = []
    adjectives = []
    adverbs = []

    # Iterate over the tokens and identify parts of speech
    for token in doc:
        if token.pos_ == "NOUN":
            nouns.append(token.text)
        elif token.pos_ == "VERB":
            verbs.append(token.text)
        elif token.pos_ == "ADJ":
            adjectives.append(token.text)
        elif token.pos_ == "ADV":
            adverbs.append(token.text)
    

    print("Noun phrases:", nouns)
    print("Verbs:", verbs)
    print("Adjectives:", adjectives)
    print("Adverbs:", adverbs)


    # Return the identified parts of speech
    # return nouns, verbs, adjectives, adverb

    
    # Replace 'path_to_csv' with the actual path to your CSV file
    data = pd.read_csv('./dataU2.csv')
    # Remove unnecessary columns
    data = data[['BaseForm', 'PastForm', 'PastParticipleForm', 'Sform', 'IngForm']]

    # Drop rows with missing values, if any
    data = data.dropna()

    # Reset the index
    data = data.reset_index(drop=True)
    X = data[['BaseForm', 'PastForm', 'PastParticipleForm', 'Sform', 'IngForm']]
    y = data['BaseForm']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Preprocess the text data
    translator = str.maketrans('', '', string.punctuation)
    X_train_features = X_train['BaseForm'] + ' ' + X_train['PastForm'] + ' ' + X_train['PastParticipleForm'] + ' ' + X_train['Sform'] + ' ' + X_train['IngForm']
    X_train_features = X_train_features.str.lower().str.translate(translator)
    X_test_features = X_test['BaseForm'] + ' ' + X_test['PastForm'] + ' ' + X_test['PastParticipleForm'] + ' ' + X_test['Sform'] + ' ' + X_test['IngForm']
    X_test_features = X_test_features.str.lower().str.translate(translator)

    # Initialize a CountVectorizer to convert text features into numerical vectors
    vectorizer = CountVectorizer()

    # Fit the vectorizer on the training features and transform them
    X_train_vectors = vectorizer.fit_transform(X_train_features)

    # Initialize a LogisticRegression model
    model = LogisticRegression()

    # Train the model on the training vectors and labels
    model.fit(X_train_vectors, y_train)

    # Transform the test features using the fitted vectorizer
    X_test_vectors = vectorizer.transform(X_test_features)

    # Make predictions on the test set
    y_pred = model.predict(X_test_vectors)

   

    # def predict_regular_verb(verb_form):
    #     verb_form_features = verb_form.replace(',', ' ').replace('.', ' ').replace('-', ' ')
    #     verb_form_features = verb_form_features.lower().translate(translator)
    #     verb_form_vector = vectorizer.transform([verb_form_features])
    #     predicted_verb = model.predict(verb_form_vector)
    #     return predicted_verb[0]

    # # Predict the base form of the verb 'talked'
    # print(predict_regular_verb(verbs))


    def predict_regular_verbs(verb_forms):
        predicted_verbs = []
        for verb_form in verb_forms:
            verb_form_features = verb_form.replace(',', ' ').replace('.', ' ').replace('-', ' ')
            verb_form_features = verb_form_features.lower().translate(translator)
            verb_form_vector = vectorizer.transform([verb_form_features])
            predicted_verb = model.predict(verb_form_vector)
            predicted_verbs.append(predicted_verb[0])
        return predicted_verbs

    print(predict_regular_verbs(verbs))







    predicted_verbs = predict_regular_verbs(verbs)
    return JsonResponse([{'predicted_verbs': predicted_verbs, 'nouns' : nouns }], safe=False)








@csrf_exempt

def sinhalaAudioApi(request, id=0):
    if request.method == 'GET':
        student_name = request.GET.get('studentName', '')
        if student_name:
            students = SinhalaAudio.objects.filter(studentName__icontains=student_name)
            print('called')
        else:
            students = SinhalaAudio.objects.all()
        
        students_serializer = SinhalaAudioSerializer(students, many=True)
        return JsonResponse(students_serializer.data, safe=False)
    
    elif request.method == 'POST':
        students_data = JSONParser().parse(request)
        students_serializer = SinhalaAudioSerializer(data=students_data)
        if students_serializer.is_valid():
            students_serializer.save()
            return JsonResponse("Added Successfully!!", safe=False)
        return JsonResponse("Failed to Add.", safe=False)
    
    elif request.method == 'PUT':
        students_data = JSONParser().parse(request)
        student = SinhalaAudio.objects.get(studentId=students_data['studentId'])
        students_serializer = SinhalaAudioSerializer(student, data=students_data)
        if students_serializer.is_valid():
            students_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)
    
    elif request.method == 'DELETE':
        student = SinhalaAudio.objects.get(studentId=id)
        student.delete()
        return JsonResponse("Deleted Successfully!!", safe=False)


@csrf_exempt

def audioBook(request, id=0):
    if request.method == 'GET':
        # students = SinhalaAudio.objects.all()
        # students_serializer = SinhalaAudioSerializer(students, many=True)
        # return JsonResponse(students_serializer.data, safe=False)
        books = AudioBook.objects.all()
        books_serializer = AudioBookSerializer(books, many=True)
        return JsonResponse(books_serializer.data, safe=False)
    
    elif request.method == 'POST':
     
        books_data = JSONParser().parse(request)
        books_serializer = AudioBookSerializer(data=books_data)
        if books_serializer.is_valid():
            books_serializer.save()
            return JsonResponse("Added Successfully!!", safe=False)
        return JsonResponse("Failed to Add.", safe=False)
    
    
    elif request.method == 'PUT':
        # students_data = JSONParser().parse(request)
        # student = SinhalaAudio.objects.get(studentId=students_data['studentId'])
        # students_serializer = SinhalaAudioSerializer(student, data=students_data)
        # if students_serializer.is_valid():
        #     students_serializer.save()
        #     return JsonResponse("Updated Successfully!!", safe=False)
        # return JsonResponse("Failed to Update.", safe=False)
        books_data = JSONParser().parse(request)
        book = AudioBook.objects.get(bookId=books_data['bookId'])
        books_serializer = AudioBookSerializer(book, data=books_data)
        if books_serializer.is_valid():
            books_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)
    
    
    elif request.method == 'DELETE':
        # student = SinhalaAudio.objects.get(studentId=id)
        # student.delete()
        # return JsonResponse("Deleted Succeffully!!", safe=False)
        book = AudioBook.objects.get(bookId=id)
        book.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)
   