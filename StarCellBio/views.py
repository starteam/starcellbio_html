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
# 		import pudb
# 		pudb.set_trace()
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
	list = []
# 	import pudb
# 	pudb.set_trace()
	retval = []
	if(UserCourse.objects.filter(user = request.user).count()>0):
		usercourse = UserCourse.objects.filter(user=request.user)[0]
		course = Course.objects.filter(usercourses = usercourse)
		assignments = course[0].assignments.all()
		for a in assignments:
			dictionary = ast.literal_eval(a.data)
			list.append(json.dumps(dictionary))
		retval = {'list': json.dumps(list), 'is_auth': True, 'user': request.user.username}
	else:
		all =[]
		for a in assignments:
			dictionary = ast.literal_eval(a.data)
			all.append(json.dumps(dictionary))
		retval = {'list': json.dumps(all), 'is_auth': False, 'user': request.user.username}
	response = HttpResponse("var get_courses_result = {0};".format(retval))
	response.set_cookie("scb_username", request.user.username)
	response['Content-Type'] = 'text/javascript'
	return response
