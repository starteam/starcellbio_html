from django.db import models

# Create your models here.


from django.db import models
from django.contrib.auth.models import User

class UserAssignments(models.Model):
    user = models.ForeignKey(User, unique=True)
    data = models.TextField()
    timestamp = models.BigIntegerField()