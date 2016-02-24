from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User


# Create your models here.
class UserCourse(models.Model):
    course_name = models.CharField(max_length=12)
    user = models.ForeignKey(User)


class Course(models.Model):
    course_name = models.CharField(max_length=12)


admin.site.register(UserCourse)
