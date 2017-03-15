from django.contrib import admin
from django.forms import ModelForm

# Create your models here.

from django.db import models
from django.contrib.auth.models import User, Group, Permission
from django.contrib.contenttypes.models import ContentType


class Course(models.Model):
    code = models.CharField(max_length=50, primary_key=True)
    course_name = models.TextField()
    ownerID = models.ForeignKey(User, related_name='course_owner', default=1)

    def __unicode__(self):
        return self.course_name


# data refers to JSON for information
class Assignment(models.Model):
    courseID = models.ForeignKey(Course, related_name='assignments')
    assignmentID = models.CharField(max_length=50, primary_key=True)
    assignmentName = models.TextField(max_length=50)
    data = models.TextField()
    ownerID = models.ForeignKey(User, related_name='owner', default=1)
    access = models.CharField(max_length=50, default='public')
    basedOn = models.ForeignKey('Assignment', null=True)

    def __unicode__(self):
        return "{0} ({1})".format(self.assignmentName, self.assignmentID)


class StudentAssignment(models.Model):
    student = models.ForeignKey(User, related_name='student')
    course = models.ForeignKey(Course, related_name='sassignments')
    assignmentID = models.CharField(max_length=50)
    assignmentName = models.TextField(max_length=50)
    token = models.IntegerField()
    data = models.TextField()


class UserCourse(models.Model):
    course_name = models.CharField(max_length=50)
    user = models.ForeignKey(User)
    courseID = models.ForeignKey(Course, related_name='usercourses')


admin.site.register(UserCourse)
admin.site.register(Course)
admin.site.register(Assignment)
admin.site.register(StudentAssignment)
