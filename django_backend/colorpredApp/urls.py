from django.urls import path 
from colorpredApp import views 

urlpatterns = [ 
    path('colorinterface/', views.colorInterfaceApi), 
    path('colorinterface/<int:pk>/', views.colorInterfaceApi),
    path('predictcolor/', views.predictcolorApi),
    path('manageaudiobooks/', views.manageAudioBooksApi),
    path('colorspred/', views.colorsPred),
    path('savecolors/', views.saveColorsApi),
    path('savecolors/<int:pk>/', views.saveColorsApi)
]