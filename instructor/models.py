from django.db import models
from django.contrib.auth.models import User, Group, Permission

# Constants

ACCESS = (
    ('public', 'Public'),
    ('private', 'Private'),
    ('archived', 'Archived')
)
PUBLIC = 'public'


GROUP_BY = (
    ('strain','Strain'),
    ('protocol','Protocol'),

)

STRAIN = 'strain'

# Common Models


class Course(models.Model):
    code = models.CharField(max_length=50, unique=True)
    name = models.TextField()
    owner = models.ForeignKey(User)


class Assignment(models.Model):
    course = models.ForeignKey(Course, related_name='assignments')
    assignment_id = models.CharField(max_length=50, unique=True)
    name = models.TextField()
    access = models.CharField(max_length=50, choices=ACCESS, default=PUBLIC)
    basedOn = models.ForeignKey("Assignment", null=True)
    group_by = models.CharField(max_length=50, choices=GROUP_BY, default=STRAIN)

# Experiment setup


class Strains(models.Model):
    assignment = models.ForeignKey(Assignment, related_name='strains')
    name = models.TextField()


class Protocol(models.Model):
    assignment = models.ForeignKey(Assignment, related_name='protocols')
    name = models.TextField()


class StrainProtocol(models.Model):
    assignment = models.ForeignKey(Assignment, related_name='strain_protocol')
    strain = models.ForeignKey(Strains)
    protocol = models.ForeignKey(Protocol)
    enabled = models.BooleanField(default=True)


class Treatments(models.Model):
    protocol = models.ForeignKey(Protocol, related_name='treatments')
    order = models.IntegerField(default=0)
    treatment = models.TextField()
    concentration = models.FloatField()
    concentration_unit = models.TextField()
    start_time = models.TextField()
    end_time = models.TextField()
    temperature = models.TextField()
    collection_time = models.TextField()


