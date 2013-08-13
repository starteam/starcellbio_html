__author__ = 'ceraj'

# Create your views here.

from django.http import HttpResponse
import datetime

from django.shortcuts import redirect
import json
import pudb
from backend.models import Statuses, Assignment, StudentAssignment
import bz2
import StringIO
from django.core.files.base import ContentFile
import StarCellBio.settings


def home(request):

    file_path = StarCellBio.settings.rel('../html_app/index.html')
    fsock = open(file_path, "r")
    response = HttpResponse(fsock, mimetype='text/html; charset=utf-8')
    return response
    #return redirect('static/index.html')


def get_model(request):
    json_response = {'user': None, 'authenticated': False}
    if request.user.is_authenticated():
        json_assignments = [];
        json_response = { 'user': request.user.username , 'authenticated': True, 'app_title':'StarCellBio' , 'app_description':'StarCellBio Placeholder', 'assignments':{'list':json_assignments}}
        public_status = Statuses.objects.get(code='PUBL')
        courses = request.user.course_set.filter(status=public_status)
        for c in courses:
            # Do something for authenticated users.
            assignments = c.assignment_set.filter(status=public_status)
            for a in assignments:
                sa, created = StudentAssignment.objects.get_or_create(student=request.user, assignment=a)
                if created:
                    sa.initialize()
                json_assignments.append(sa.current)
    else:
        #import pudb
        #pudb.set_trace()
        #json_object = json.loads(request.body)
        pass
        # Do something for anonymous users.
    response = HttpResponse("var get_model_result = {0};".format( json.dumps(json_response)))
    response.set_cookie("scb_username", request.user.username)
    response['Content-Type'] = 'text/javascript'
    return response