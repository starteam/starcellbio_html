from django.contrib.auth.models import User
from backend.models import Course, Assignment, StudentAssignment
from tastypie import fields
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from tastypie.authorization import DjangoAuthorization


class UserResource(ModelResource):
    class Meta:
        #import pudb
        #pudb.set_trace()
        queryset = User.objects.all()
        resource_name = 'auth/user'
        excludes = ['email', 'password', 'is_superuser']
        authorization = DjangoAuthorization()


class CourseResource(ModelResource):
    owner = fields.ForeignKey(UserResource, 'owner')

    class Meta:
        #import pudb
        #pudb.set_trace()
        queryset = Course.objects.all()
        resource_name = 'scb/course'
        authorization = DjangoAuthorization()


class AssignmentResource(ModelResource):
    course = fields.ForeignKey(CourseResource, 'course')

    class Meta:
        #import pudb
        #pudb.set_trace()
        queryset = Assignment.objects.all()
        resource_name = 'scb/assignment'
        authorization = DjangoAuthorization()


class StudentAssignmentResource(ModelResource):
    student = fields.ForeignKey(User, 'student')
    assignment = fields.ForeignKey(AssignmentResource, 'assignment')

    class Meta:
        #import pudb
        #pudb.set_trace()
        queryset = StudentAssignment.objects.all()
        resource_name = 'scb/studentassignment'
        authorization = DjangoAuthorization()

