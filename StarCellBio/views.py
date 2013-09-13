__author__ = 'ceraj'

# Create your views here.

from django.http import HttpResponse
import datetime

from django.shortcuts import redirect
import json
import pudb
from backend.models import Statuses, Assignment, StudentAssignment, Course, UserCourse
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
#     import pudb
#     pudb.set_trace()
    print request.user
    if request.user.is_authenticated():
        json_assignments = [];
        json_response = { 'user': request.user.username , 'authenticated': True, 'app_title':'StarCellBio' , 'app_description':'StarCellBio Placeholder', 'assignments':{'list':json_assignments}}
        if(Statuses.objects.exists()):
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
        	return HttpResponse("var get_model_result = {0};".format( json.dumps("not working yet")))
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
    
def create_courses(request, **kwargs):
	if(request.method == 'POST'):

		jstr=request.raw_post_data
		jsondata = json.loads(jstr)
		if(jsondata):
			#make more complex later 
			for x in jsondata['assignments']['list']:
				assign_id = x["id"]
				course_code = x["course"]
				assign_name = x["name"]
				course_name = x["course_name"]
				c = Course(code = course_code, course_name = course_name)
				c.save()
				a = Assignment(courseID=c, assignmentID=assign_id, assignmentName=assign_name, data = x)
				a.save()
			return HttpResponse('got it')
	else:
		response = HttpResponse("var create_courses_result = {0};".format( ''))
		response.set_cookie("scb_username", request.user.username)
		response['Content-Type'] = 'text/javascript'
		return response
		
def get_courses(request, **kwargs):
	import ast
	import random
	list = []
	retval = []
	token = random.randrange(0, 1000000)
	if(UserCourse.objects.filter(user__username = request.user.username).count()>0):
		usercourse = UserCourse.objects.filter(user=request.user)[0]
		course = Course.objects.filter(usercourses = usercourse)
		assignments = course[0].assignments.all()
		if(course[0].sassignments.count() == 0 or course[0].sassignments.filter(data='').count() > 0):
			for a in assignments:
				sa = StudentAssignment(student = request.user, course = course[0], assignmentID = a.assignmentID, assignmentName= a.assignmentName, token = token, data = '')
				sa.save()
		else:
			assignments = course[0].assignments.all()
		for a in assignments:
			dictionary = ast.literal_eval(a.data)
			list.append(dictionary)
		retval = {'list': list, 'is_auth': True, 'is_selected': list[0]['id'], 'token': token}
	else:
		all =[]
		for a in Assignment.objects.all():
			dictionary = ast.literal_eval(a.data)
			all.append(dictionary)
		retval = {'list': all, 'is_auth': False, 'is_selected': all[0]['id'], 'token': token}
	response = HttpResponse("var get_courses_result = {0};".format(json.dumps(retval)))
	response['Content-Type'] = 'text/javascript'
	return response
	
def post_state(request, **kwargs):
	jstr = request.raw_post_data
	jsondata = json.loads(jstr)
	jsonmodel = jsondata['model']
	import pudb 
	pudb.set_trace()
	if(UserCourse.objects.filter(user__username = request.user.username).count()>0):
		usercourse = UserCourse.objects.filter(user=request.user)[0]
		course = Course.objects.filter(usercourses = usercourse)
		sassignments = course[0].sassignments.all()
		retval = {'is_anonymous': False, 'valid_token':False, 'token': jsondata['token']}
		for sa in sassignments:
			for x in jsondata['model']['assignments']['list']:
				if(sa.token == jsondata['token'] and sa.assignmentID == x.id):
						sa.data = x
						retval = {'is_anonymous': False, 'valid_token': True, 'token': jsondata['token']}
	else:
		retval = {'is_anonymous': True, 'valid_token': False, 'token': jsondata['token']}
	response = HttpResponse("var post_state_result = {0};".format(json.dumps(retval)))
	response['Content-Type'] = 'text/javascript'
	return response

