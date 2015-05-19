from __future__ import absolute_import

from django import forms

from backend.models import UserCourse, Course
from django.contrib.auth.models import Group


class SignupForm(forms.Form):

    account_type = forms.ChoiceField(
        choices=(('student', 'Student'), ('instructor', 'Instructor')),
        required=True, label="Account Type",
        widget=forms.RadioSelect
    )

    def clean(self):
        super(SignupForm, self).clean()
        form_course_codes = self.data.get('course_code').replace(' ', '')
        course_codes = form_course_codes.split(';')
        # Instructors do not have course codes
        if self.data.get('account_type') == 'instructor':
            return
        for course_code in course_codes:
            # Allow empty course codes in list
            if not course_code:
                raise forms.ValidationError('Empty course code.')
            try:
                Course.objects.get(code=course_code)
            except Course.DoesNotExist:
                raise forms.ValidationError('No course match the entered code.')
            # Later we could have the admin assign a unique code to an
            # instructor for registering
            # and compare that value against form's course_code

    def save(self, request):
        if self.data.get('account_type') == 'student':
            create_course_records(request, self.data.get('course_code'))
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
