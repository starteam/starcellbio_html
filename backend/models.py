from django.db import models
from django.contrib import admin

# Create your models here.

from django.db import models
from django.contrib.auth.models import User

class UserAssignments(models.Model):
    user = models.ForeignKey(User, unique=True)
    data = models.TextField()
    timestamp = models.BigIntegerField(null=True)

class UserAssignmentsLog(models.Model):
    user = models.ForeignKey(User)
    data = models.FileField(upload_to='logs')
    timestamp = models.BigIntegerField(null=True)

admin.site.register(UserAssignments)
