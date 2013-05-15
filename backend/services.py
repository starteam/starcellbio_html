from django.contrib.auth.models import User
from backend.models import Course, Assignment, StudentAssignment
from tastypie import fields
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from tastypie.authorization import DjangoAuthorization, Authorization


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'auth/user'
        excludes = ['email', 'password', 'is_superuser']
        authorization = DjangoAuthorization()


class CourseResource(ModelResource):
    owner = fields.ForeignKey(UserResource, 'owner')

    class Meta:
        queryset = Course.objects.all()
        resource_name = 'scb/course'
        authorization = Authorization() # needs to have better authorization


class AssignmentResource(ModelResource):
    course = fields.ForeignKey(CourseResource, 'course')

    class Meta:
        queryset = Assignment.objects.all()
        resource_name = 'scb/assignment'
        authorization = DjangoAuthorization()


class StudentAssignmentResource(ModelResource):
    student = fields.ForeignKey(User, 'student')
    assignment = fields.ForeignKey(AssignmentResource, 'assignment')

    class Meta:
        queryset = StudentAssignment.objects.all()
        resource_name = 'scb/studentassignment'
        authorization = DjangoAuthorization()

