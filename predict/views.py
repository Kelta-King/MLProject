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

            # Expected output is json
            temp.append(json.dumps(message.expectedReply))
            msgs.append(temp)

        # JSON encoding the list
        msgs = json.dumps(msgs)

        # Sending json as response
        return HttpResponse(msgs, content_type='application/json')
    
    else:

        return HttpResponse("Error: Something went wrong")