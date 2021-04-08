from django.shortcuts import render
from django.http import HttpResponse
from .models import *
# Create your views here.

def checkPage(request):
    
    diseases = Disease.objects.all()

    return render(request, 'chatPage.html', { 'diseases':diseases })