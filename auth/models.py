from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User
from django.forms import ModelForm

#Create your models here.
class UserCourse(models.Model):
	course_name = models.CharField(max_length=12)
	user = models.ForeignKey(User)
#     courseID = models.ForeignKey(Course)
    
class Course(models.Model):
	course_name = models.CharField(max_length=12)
#
# class Assignment(models.Model):
# 	courseID = models.ForeignKey(Course)
# 	course_name = models.CharField(max_length=12)
# 	data = models.TextField()
# 	
# 	

admin.site.register(UserCourse)