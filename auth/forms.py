from __future__ import absolute_import

from django import forms

from backend.models import UserCourse, Course, Assignment
from django.contrib.auth.models import User, Group

import StarCellBio.settings as settings

class SignupForm(forms.Form):
	def save(self, request):
		import sys
		import os
		import pudb
# 		pudb.set_trace()
		if(self.data.get('account_type') == 'student'):
			create_course_records(request,self.data.get('CC'))
# 		elif(self.data.get('account_type') == 'instructor'):
		add_to_group(request, self.data.get('account_type'))
        """
        An extension point for subclasses.
        """
        pass








def create_course_records(usr, input):
	import pudb
	#pudb.set_trace()
	input = input.replace(' ', '')
	course_codes = input.split(';')
	for course_code in course_codes:
		if(Course.objects.filter(code = course_code).count()>0):
			course = Course.objects.get(code = course_code)
			user_course = UserCourse(course_name=course_code, user=usr, courseID = course)
			user_course.save()
			print course_code

	# get the data
	
def add_to_group(usr, input):
	import pudb
	#pudb.set_trace()
	g = Group.objects.filter(name=input)
	usr.groups.add(g[0])
	usr.save()
	