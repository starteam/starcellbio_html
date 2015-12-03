# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0011_assignment_access_private'),
    ]

    operations = [
        migrations.AlterField(
            model_name='drug',
            name='concentration',
            field=models.IntegerField(max_length=50, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='drug',
            name='duration',
            field=models.IntegerField(max_length=50, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='drug',
            name='start_time',
            field=models.IntegerField(max_length=50, null=True, blank=True),
            preserve_default=True,
        ),
    ]
