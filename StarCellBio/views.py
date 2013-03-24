__author__ = 'ceraj'

# Create your views here.

from django.http import HttpResponse
import datetime

from django.shortcuts import redirect
import json
import pudb
from backend.models import UserAssignments


def home(request):
    return redirect('static/index.html')


def is_auth(request):
    pudb.set_trace()
    if request.user.is_authenticated():
    # Do something for authenticated users.
        ua, created = UserAssignments.objects.get_or_create(user=request.user)
        if request.method == 'GET':
            ## this is load
            if created:
                ua.data = ''
                command = {'load': '__assigment_tufts'}
                ua.timestamp = 0
                #ua.save()
                return HttpResponse(json.dumps({'user': request.user.username, 'data': ua.data, 'command': command}))
            else:
                return HttpResponse(json.dumps({'user': request.user.username, 'data': ua.data}))
        if request.method == 'POST':
            try:
                json_object = json.loads(request.body)
                timestamp = json_object.get('timestamp')
                if ua.timestamp < timestamp:
                    ua.timestamp = timestamp
                    ua.data = request.body
                    ua.save()
                    return HttpResponse(json.dumps({'user': request.user.username, 'data': ua.data}))
            except:
                return HttpResponse(json.dumps({'user': request.user.username, 'data': None, 'command':{'alert':'Failed to save!'}}))
    else:
        return HttpResponse(json.dumps({'user': None}))
        # Do something for anonymous users.
