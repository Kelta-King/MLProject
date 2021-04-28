from django.shortcuts import render
from django.http import HttpResponse
from .models import *
import json

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
        diseaseGlo = diseaseName

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
        
        values = {
            'male':2,
            'female':1,
            'yes':1,
            'no':0,
            'contact to positive':1,
            'abroad travel':0,
            'other':2,
            '0':'Negative',
            '1':'Positive',
        }
        
        diseaseName = vals['disease']
        responses = vals['responses']
        
        # Here we have to make a dynamic string according to the disease name
        numeric_responses = []
        for i in range(1,len(responses)):
            numeric_responses.append(values[responses[i]])

        path = Disease.objects.values('modelPath').filter(diseaseName = diseaseName)
        import pickle
        path = path[0]['modelPath']
        
        loaded_model = pickle.load(open(path, 'rb'))
        result = loaded_model.predict([numeric_responses])
        
        output = values[str(result[0])]
        response = 'Your Predicted output for ' + diseaseName +' is <b>' + output + '</b>'
        return HttpResponse(response)

    else:
        return HttpResponse("Error: Something went wrong")

