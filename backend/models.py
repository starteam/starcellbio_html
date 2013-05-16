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


class Statuses(models.Model):
    status = models.CharField(max_length=12);
    code = models.CharField(max_length=4);

    def __unicode__(self):
        return self.status

class StatusesAdmin(admin.ModelAdmin):
    list_display = ('status', 'code')

class Course(models.Model):
    code = models.CharField('Code', max_length=12, unique=True) # used to let students sign up for a course
    owner = models.ForeignKey(
        User) # this person owns the Course and is 'super administrator' - including ability to 'DELETE' course
    administrators = models.ManyToManyField(User,
                                            related_name='admins+') # this people can do anything with the course that 'owner' can
    students = models.ManyToManyField(User,
                                      related_name='students+') # this people have the course in their 'STUDENT' app
    status = models.ForeignKey(Statuses,default=1) # this defines when course can appear in student's UI

    def __unicode__(self):
        return "{0} {1}".format(self.code, self.owner)

class CourseAdmin(admin.ModelAdmin):
    list_display = ('code', 'owner', 'status')


class Assignment(models.Model):
    code = models.CharField(max_length=12, unique=True) # used to setup JSON correctly - may be auto generated?'
    course = models.ForeignKey(Course) # to which course this assignment belongs
    start_date = models.DateTimeField() # time course shows up in students' UI after it is published
    end_date = models.DateTimeField() # time course auto-commits students' work after it is published
    template = models.TextField() # template used to populate students' UI
    status = models.ForeignKey(Statuses, default=1) # this defines when course can appear in student's UI


class StudentAssignment(models.Model):
    student = models.ForeignKey(User, related_name='student')
    assignment = models.ForeignKey(Assignment, related_name='assignment')
    submitted = models.TextField() # this auto-submitts if assignment has end_date on first access after assignment's end_date
    current = models.TextField()

    class Meta:
        unique_together = ('student', 'assignment')


admin.site.register(UserAssignments)
admin.site.register(UserAssignmentsLog)

admin.site.register(Course, CourseAdmin)
admin.site.register(Assignment)
admin.site.register(StudentAssignment)
admin.site.register(Statuses, StatusesAdmin)