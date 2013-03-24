from django.db import models
from django.contrib import admin

# Create your models here.

from django.db import models
from django.contrib.auth.models import User

class UserAssignments(models.Model):
    user = models.ForeignKey(User, unique=True)
    data = models.TextField()
    timestamp = models.BigIntegerField(null=True)

admin.site.register(UserAssignments)
