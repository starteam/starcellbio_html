__author__ = 'ceraj'

# Create your views here.

from django.http import HttpResponse
import datetime

from django.shortcuts import redirect
import json
import pudb
from backend.models import Assignment, StudentAssignment, Course, UserCourse
import StringIO
from django.core.files.base import ContentFile
import StarCellBio.settings
import os
import StarCellBio.supplements as supplements

random_mapping = {0: 'BADC', 1: 'CBAD', 2: 'ABDC', 3: 'CDAB', 4: 'CABD', 5: 'DCBA', 6: 'ADCB', 7: 'BACD', 8: 'DBAC', 9: 'DCAB', 10: 'CDBA', 11: 'ACDB', 12: 'BDAC', 13: 'DBCA', 14: 'DABC', 15: 'ACBD', 16: 'BCDA', 17: 'DACB', 18: 'BDCA', 19: 'ADBC', 20: 'CBDA', 21: 'ABCD', 22: 'CADB', 23: 'BCAD'}

def home(request):

    file_path = StarCellBio.settings.rel('../html_app/index.html')
    fsock = open(file_path, "r")
    response = HttpResponse(fsock, mimetype='text/html; charset=utf-8')
    return response
    #return redirect('static/index.html')


def get_model(request):
    json_response = {'user': None, 'authenticated': False}
    #import pudb
    #pudb.set_trace()
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
    
def create_courses(request, **kwargs):# 
# 	import pudb
# 	pudb.set_trace()
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
	import pudb
	#pudb.set_trace()
	alist = []
	retval = []
	token1 = random.randrange(0, 1000000)
	if(UserCourse.objects.filter(user__username = request.user.username).count()>0):
		usercourse = UserCourse.objects.filter(user=request.user)[0]
		course = Course.objects.filter(usercourses = usercourse)
		assignments = course[0].assignments.all()
		if(course[0].sassignments.filter(student=request.user).count() == 0 or course[0].sassignments.count() == 0):
			for a in assignments:
				if(a.assignmentName == 'StarCellBio Problem 1'):
					pudb.set_trace()
					import hashlib
					md5 = hashlib.md5()
					md5.update(str(request.user.email))
					encoded_email = md5.hexdigest()
					encoded_number = int(encoded_email, 16)%24
					order = random_mapping[encoded_number]
					order = list(order)
					original_assignment_data = a.data
					assignment_data = ast.literal_eval(original_assignment_data)
					#replace A
					assignment_data['template']['ui']['add_multiple_dialog']['gfp1']['rows'][0]['cells'][0]['text'] = "WT-GFP-Protein "+order[0]+""
					assignment_data['template']['cell_lines']['gfp1']['name'] = "WT-GFP-Protein "+order[0]+""
					assignment_data['template']['primary_anti_body']['mp1']['name'] = "mouse anti-phospho-protein "+order[0]+""
					assignment_data['template']['primary_anti_body']['mp1']['gel_name'] = "P-Protein "+order[0]+""
					
					#replace B
					assignment_data['template']['ui']['add_multiple_dialog']['gfp2']['rows'][0]['cells'][0]['text'] = "WT-GFP-Protein "+order[1]+""
					assignment_data['template']['cell_lines']['gfp2']['name'] = "WT-GFP-Protein "+order[1]+""
					assignment_data['template']['primary_anti_body']['mp2']['name'] = "mouse anti-phospho-protein "+order[1]+""
					assignment_data['template']['primary_anti_body']['mp2']['gel_name'] = "P-Protein "+order[1]+""
					assignment_data['template']['model']['western_blot']['cyto']['parser_fixed'][1]['above_marks'][0]['name'] = "protein "+order[1]+""
					assignment_data['template']['model']['western_blot']['cyto']['parser_fixed'][3]['above_marks'][0]['name'] = "protein "+order[1]+""
					
					
					#replace C
					assignment_data['template']['ui']['add_multiple_dialog']['gfp3']['rows'][0]['cells'][0]['text'] = "WT-GFP-Protein "+order[2]+""
					assignment_data['template']['cell_lines']['gfp3']['name'] = "WT-GFP-Protein "+order[2]+""
					assignment_data['template']['primary_anti_body']['mp3']['name'] = "mouse anti-phospho-protein "+order[2]+""
					assignment_data['template']['primary_anti_body']['mp3']['gel_name'] = "P-Protein "+order[2]+""
					assignment_data['template']['model']['western_blot']['cyto']['parser_fixed'][0]['above_marks'][0]['name'] = "protein "+order[2]+""
					assignment_data['template']['model']['western_blot']['cyto']['parser_fixed'][1]['above_marks'][1]['name'] = "protein "+order[2]+""
					assignment_data['template']['model']['western_blot']['cyto']['parser_fixed'][2]['above_marks'][0]['name'] = "protein "+order[2]+""
					assignment_data['template']['model']['western_blot']['cyto']['parser_fixed'][3]['above_marks'][1]['name'] = "protein "+order[2]+""
					
					#replace D
					assignment_data['template']['ui']['add_multiple_dialog']['gfp4']['rows'][0]['cells'][0]['text'] = "WT-GFP-Protein "+order[3]+""
					assignment_data['template']['cell_lines']['gfp4']['name'] = "WT-GFP-Protein "+order[3]+""
					assignment_data['template']['primary_anti_body']['mp4']['name'] = "mouse anti-phospho-protein "+order[3]+""
					assignment_data['template']['primary_anti_body']['mp4']['gel_name'] = "P-Protein "+order[3]+""
					assignment_data['template']['model']['western_blot']['cyto']['parser_fixed'][1]['above_marks'][2]['name'] = "protein "+order[3]+""
					
					original_assignment_data = repr(assignment_data)
				sa = StudentAssignment(student = request.user, course = course[0], assignmentID = a.assignmentID, assignmentName= a.assignmentName, token = token1, data = original_assignment_data)
				sa.save()
			assignments = course[0].sassignments.filter(student=request.user)
		else:
			token1 = course[0].sassignments.filter(student=request.user)[0].token
			assignments = course[0].sassignments.filter(student=request.user)
		for a in assignments:
			dictionary = ast.literal_eval(a.data)
			alist.append(dictionary)
		retval = {'list': alist, 'is_auth': True, 'is_selected': alist[0]['id'], 'token': token1}
	else:
		all =[]
		for a in Assignment.objects.all():
			dictionary = ast.literal_eval(a.data)
			all.append(dictionary)
		retval = {'list': all, 'is_auth': False, 'is_selected': all[0]['id'], 'token': token1}
	response = HttpResponse("var get_courses_result = {0};".format(json.dumps(retval)))
	response.set_cookie("scb_username", request.user.username)
	response['Content-Type'] = 'text/javascript'
	return response
	
def post_state(request, **kwargs):
	#import pudb
	#print request.user
	jstr = request.raw_post_data
	jsondata = json.loads(jstr)
	jsonmodel = jsondata['model']
	import random
	token2 = random.randrange(0, 1000000)
	if(UserCourse.objects.filter(user__username = request.user.username).count()>0):
		usercourse = UserCourse.objects.filter(user=request.user)[0]
		course = Course.objects.filter(usercourses = usercourse)
		sassignments = course[0].sassignments.all()
		retval = {'is_anonymous': False, 'valid_token':False, 'token': token2}
		for sa in sassignments:
			for x in jsondata['model']['assignments']['list']:
				#pudb.set_trace()
				if(sa.token == jsondata['token'] and sa.assignmentID == x['id']):
						sa.data = json.loads(json.dumps(x))
						sa.token = token2
						sa.save()
						retval = {'is_anonymous': False, 'valid_token': True, 'token': token2}
	else:
		retval = {'is_anonymous': True, 'valid_token': False, 'token': token2}
	response = HttpResponse("var post_state_result = {0};".format(json.dumps(retval)))
	response.set_cookie("scb_username", request.user.username)
	response['Content-Type'] = 'text/javascript'
	return response

def contact(request, **kwargs):
	print "Content-Type: text/html"     # HTML is following
	print                               # blank line, end of headers
	#pudb.set_trace()
	#method = os.environ['REQUEST_METHOD']
	if request.method == "POST":
		try:
			post = supplements.get_post_dict(request)
		except supplements.MissingData, e:
			print "<h1>Error: %s</h1>" % e.value
			return
		supplements.send_feedback(post)
		return HttpResponse(supplements.success(post))
	else:
		return HttpResponse('POST-only cgi') 
