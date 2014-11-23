from django.db import models
from django.contrib.auth.models import User, Group, Permission
from django.contrib import admin

# Constants

ACCESS = (
    ('public', 'Public'),
    ('private', 'Private'),
    ('archived', 'Archived')
)
PUBLIC = 'public'

GROUP_BY = (
    ('strain', 'Strain'),
    ('protocol', 'Protocol'),

)

STRAIN = 'strain'

# Common Models


class Course(models.Model):
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=50)
    owner = models.ForeignKey(User)

    def __unicode__(self):
        return "{0} ({1})".format(self.name, self.code)


class Assignment(models.Model):
    course = models.ForeignKey(Course, related_name='assignments')
    assignment_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=50)
    access = models.CharField(max_length=50, choices=ACCESS, default=PUBLIC)
    basedOn = models.ForeignKey("Assignment", null=True, blank=True)
    group_by = models.CharField(max_length=50, choices=GROUP_BY, default=STRAIN)


# Experiment setup


class Strains(models.Model):
    assignment = models.ForeignKey(Assignment, related_name='strains')
    name = models.CharField(max_length=50)

    def __unicode__(self):
        return self.name


class Protocol(models.Model):
    assignment = models.ForeignKey(Assignment, related_name='protocols')
    name = models.CharField(max_length=50)

    def __unicode__(self):
        return self.name


class StrainProtocol(models.Model):
    assignment = models.ForeignKey(Assignment, related_name='strain_protocol')
    strain = models.ForeignKey(Strains)
    protocol = models.ForeignKey(Protocol)
    enabled = models.BooleanField(default=True)


class Treatments(models.Model):
    protocol = models.ForeignKey(Protocol, related_name='treatments')
    order = models.IntegerField(default=0)
    treatment = models.CharField(max_length=50)
    concentration = models.CharField(max_length=50)
    concentration_unit = models.CharField(max_length=50)
    start_time = models.CharField(max_length=50)
    end_time = models.CharField(max_length=50)
    temperature = models.CharField(max_length=50)
    collection_time = models.CharField(max_length=50)


admin.site.register(Course)
admin.site.register(Assignment)
admin.site.register(Protocol)
admin.site.register(Strains)
admin.site.register(StrainProtocol)
admin.site.register(Treatments)




