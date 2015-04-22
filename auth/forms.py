from __future__ import absolute_import

from django import forms

from backend.models import UserCourse, Course
from django.contrib.auth.models import Group


class SignupForm(forms.Form):

    def save(self, request):
        if self.data.get('account_type') == 'student':
            create_course_records(request, self.data.get('CC'))
        add_to_group(request, self.data.get('account_type'))


def create_course_records(usr, cc_input):
    cc_input = cc_input.replace(' ', '')
    course_codes = cc_input.split(';')
    for course_code in course_codes:
        if Course.objects.filter(code=course_code).count() > 0:
            course = Course.objects.get(code=course_code)
            user_course = UserCourse(course_name=course_code, user=usr, courseID=course)
            user_course.save()


def add_to_group(usr, input):
    g = Group.objects.filter(name=input)
    usr.groups.add(g[0])
    usr.save()
