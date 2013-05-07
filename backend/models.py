from django.db import models
from django.contrib import admin

# Create your models here.

from django.db import models
from django.contrib.auth.models import User

class UserAssignments(models.Model):
    user = models.ForeignKey(User)
    course = models.CharField(max_length=12)
    data = models.TextField()
    timestamp = models.BigIntegerField(null=True)

    class Meta:
        unique_together = ('user','course')

class UserAssignmentsLog(models.Model):
    user = models.ForeignKey(User)
    course = models.CharField(max_length=12)
    data = models.FileField(upload_to='logs')
    timestamp = models.BigIntegerField(null=True)

    class Meta:
        unique_together = ('user','course')

admin.site.register(UserAssignments)
admin.site.register(UserAssignmentsLog)
