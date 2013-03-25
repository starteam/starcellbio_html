__author__ = 'ceraj'

# Create your views here.

from django.http import HttpResponse
import datetime

from django.shortcuts import redirect
import json
import pudb
from backend.models import UserAssignments, UserAssignmentsLog
import bz2
import StringIO
from django.core.files.base import ContentFile


def home(request):
    return redirect('static/index.html')


def is_auth(request):
    response = HttpResponse(json.dumps({'user': None}))
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
                ual = UserAssignmentsLog.objects.create(user=request.user, timestamp=timestamp)
                cd = bz2.BZ2Compressor()
                cd.compress(command)
                cd = cd.flush()
                ual.data.save("{0}_{1}.json.bz".format(request.user.username,timestamp),ContentFile(cd),save=True)
                ual.save()
                response = HttpResponse(json.dumps({'user': request.user.username, 'data': ua.data, 'command': command}))
            else:
                response = HttpResponse(json.dumps({'user': request.user.username, 'data': ua.data}))
        if request.method == 'POST':
            try:
                json_object = json.loads(request.body)
                timestamp = json_object.get('timestamp')
                if ua.timestamp < timestamp:
                    ua.timestamp = timestamp
                    ua.data = request.body
                    ua.save()
                    ual = UserAssignmentsLog.objects.create(user=request.user, timestamp=timestamp)
                    cd = bz2.BZ2Compressor()
                    cd.compress(request.body)
                    cd = cd.flush()
                    ual.data.save("{0}_{1}.json.bz".format(request.user.username,timestamp),ContentFile(cd),save=True)
                    ual.save()

                    return HttpResponse(json.dumps({'user': request.user.username, 'data': ua.data}))
            except:
                response = HttpResponse(
                    json.dumps({'user': request.user.username, 'data': None, 'command': {'alert': 'Failed to save!'}}))
    else:
        pass
        # Do something for anonymous users.
    response.set_cookie("scb_username", request.user.username)
    return response