from django.shortcuts import render
from django.http import HttpResponse
from .models import *
import json
# Create your views here.

def checkPage(request):

    # Sending all disease to frontend
    diseases = Disease.objects.all()
    return render(request, 'chatPage.html', { 'diseases':diseases })

def setDisease(request):

    if request.method == 'GET':

        # Getting name value
        vals = request.GET.get('name')
        
        # JSON decoding
        vals = json.loads(str(vals))
        diseaseName = vals['disease']

        # Query to get dieaseId
        diseaseData = Disease.objects.all().filter(diseaseName = diseaseName)
        diseaseId = diseaseData[0]

        # Getting all messages
        messages = Messages.objects.all().filter(diseaseName = diseaseId)
        
        # List to store all the messages
        msgs = list()
        for message in messages:
            temp = list()
            temp.append(message.messageText)

            # Getting and splitting expectedReply
            msgRply = message.expectedReply.split(',')
            
            temp.append(msgRply)
            msgs.append(temp)

        # JSON encoding the list
        msgs = json.dumps(msgs)

        # Sending json as response
        return HttpResponse(msgs, content_type='application/json')
    
    else:

        return HttpResponse("Error: Something went wrong")

def getPrediction(request):

    if request.method == 'GET':
    
        vals = request.GET.get("values")
        vals = json.loads(vals)
        print(vals)
        # Here we have to make a dynamic string according to the disease name
        response = 'Your Chances of getting COVID-19 is High'
        return HttpResponse(response)

    else:
        return HttpResponse("Error: Something went wrong")
