from __future__ import absolute_import

from django import forms

from backend.models import UserCourse, Course, Assignment
from django.contrib.auth.models import User

import StarCellBio.settings as settings

class SignupForm(forms.Form):
	def save(self, request):
		import sys
		import os
		import pudb
		create_course_records(request,self.data.get('CC'))
        """
        An extension point for subclasses.
        """
        pass








def create_course_records(usr, course_code):
	if(Course.objects.filter(code = course_code).count()>0):
		course = Course.objects.get(code = course_code)
		user_course = UserCourse(course_name=course_code, user=usr, courseID = course)
		user_course.save()
		print course_code

	# get the data