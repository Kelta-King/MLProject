from django.shortcuts import render
from django.http import HttpResponse
from .models import *
import json
# Create your views here.

def checkPage(request):
    
    diseases = Disease.objects.all()

    return render(request, 'chatPage.html', { 'diseases':diseases })

def setDisease(request):

    if request.method == 'GET':

        vals = request.GET.get('name')
        vals = json.loads(str(vals))
        diseaseName = vals['disease']

        diseaseData = Disease.objects.all().filter(diseaseName = diseaseName)
        diseaseId = diseaseData[0]
        print(diseaseId)

        messages = Messages.objects.all().filter(diseaseName = diseaseId)
        print(messages)

        return HttpResponse("Yo")
    
    else:

        return HttpResponse("Error: Something went wrong")