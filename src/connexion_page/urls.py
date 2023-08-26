from django.contrib import admin
from django.urls import path, include
from . import views
urlpatterns = [
    path('', views.index, name = "index_page"),
    path('inscription/', views.inscription, name = "inscription_page"),
    path('connexion/', views.connexion, name = "connexion_page"),
    path('home_chat_page/', include('chat.urls'), name = "home_chat_page"),    
]