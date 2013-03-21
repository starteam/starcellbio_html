__author__ = 'ceraj'

# Create your views here.

from django.http import HttpResponse
import datetime

from django.shortcuts import redirect
import json
import pudb

def home(request):
    return redirect( 'static/index.html')

def is_auth(request):
    if request.user.is_authenticated():
    # Do something for authenticated users.
        pudb.set_trace()
        return HttpResponse(json.dumps({ 'user':request.user.username}))
    else:
        return HttpResponse(json.dumps({ 'user':None}))
    # Do something for anonymous users.
