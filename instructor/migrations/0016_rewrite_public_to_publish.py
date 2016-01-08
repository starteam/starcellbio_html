# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


def rewrite_publish(apps, schema_editor):
    Assignment = apps.get_model('instructor', 'Assignment')
    for assignment in Assignment.objects.all():
        if assignment.access == 'public':
            assignment.access = 'published'
            assignment.save()

def reverse_func(apps, schema_editor):
    Assignment = apps.get_model('instructor', 'Assignment')
    for assignment in Assignment.objects.all():
        if assignment.access == 'published':
            assignment.access = 'public'
            assignment.save()



class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0015_published_assignment'),
    ]

    operations = [
        migrations.RunPython(rewrite_publish, reverse_func)
    ]
