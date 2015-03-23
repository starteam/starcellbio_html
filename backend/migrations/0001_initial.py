# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Assignment',
            fields=[
                ('assignmentID', models.CharField(max_length=50, serialize=False, primary_key=True)),
                ('assignmentName', models.TextField(max_length=50)),
                ('data', models.TextField()),
                ('access', models.CharField(default=b'public', max_length=50)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('code', models.CharField(max_length=50, serialize=False, primary_key=True)),
                ('course_name', models.TextField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='StudentAssignment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('assignmentID', models.CharField(max_length=50)),
                ('assignmentName', models.TextField(max_length=50)),
                ('token', models.IntegerField()),
                ('data', models.TextField()),
                ('course', models.ForeignKey(related_name='sassignments', to='backend.Course')),
                ('student', models.ForeignKey(related_name='student', to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='UserCourse',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('course_name', models.CharField(max_length=50)),
                ('courseID', models.ForeignKey(related_name='usercourses', to='backend.Course')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='assignment',
            name='courseID',
            field=models.ForeignKey(related_name='assignments', to='backend.Course'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='assignment',
            name='ownerID',
            field=models.ForeignKey(related_name='owner', default=1, to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
    ]
