
from django.urls import path
from . import views

urlpatterns = [
    path('', views.checkPage),
    path('/setDisease', views.setDisease),
    
]
