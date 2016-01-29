# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignment',
            name='basedOn',
            field=models.ForeignKey(to='backend.Assignment', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='course',
            name='ownerID',
            field=models.ForeignKey(related_name='course_owner', default=1, to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
    ]
