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
        unique_together = ('user', 'course')


class UserAssignmentsLog(models.Model):
    user = models.ForeignKey(User)
    course = models.CharField(max_length=12)
    data = models.FileField(upload_to='logs')
    timestamp = models.BigIntegerField(null=True)

    class Meta:
        unique_together = ('user', 'course')


COURSE_STATUS_CHOICES = ( ('PRIV', 'Private'), ('PUBL', 'Public'), ('ARCH', 'Archived'))
COURSE_STATUS_CHOICE_DEFAULT = 'PRIV'


class Course(models.Model):
    code = models.CharField('Code',max_length=12, unique=True) # used to let students sign up for a course
    owner = models.ForeignKey(User) # this person owns the Course and is 'super administrator' - including ability to 'DELETE' course
    administrators = models.ManyToManyField(User, related_name='admins+') # this people can do anything with the course that 'owner' can
    students = models.ManyToManyField(User, related_name='students+') # this people have the course in their 'STUDENT' app
    status = models.CharField(max_length=4, choices=COURSE_STATUS_CHOICES, default=COURSE_STATUS_CHOICE_DEFAULT) # this defines when course can appear in student's UI

class Assignment(models.Model):
    code = models.CharField(max_length=12, unique=True) # used to setup JSON correctly - may be auto generated?'
    course = models.ForeignKey(Course) # to which course this assignment belongs
    start_date = models.DateTimeField() # time course shows up in students' UI after it is published
    end_date = models.DateTimeField() # time course auto-commits students' work after it is published
    template = models.TextField() # template used to populate students' UI
    status = models.CharField(max_length=4, choices=COURSE_STATUS_CHOICES, default=COURSE_STATUS_CHOICE_DEFAULT) #status of assignment

class StudentAssignment(models.Model):
    student = models.ForeignKey(User , related_name='student')
    assignment = models.ForeignKey(Assignment, related_name='assignment')
    submitted = models.TextField() # this auto-submitts if assignment has end_date on first access after assignment's end_date
    current = models.TextField()

    class Meta:
        unique_together = ('student', 'assignment')

admin.site.register(UserAssignments)
admin.site.register(UserAssignmentsLog)

admin.site.register(Course)
admin.site.register(Assignment)
admin.site.register(StudentAssignment)