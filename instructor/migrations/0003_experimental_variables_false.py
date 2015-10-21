# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0002_instructor_models'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assignment',
            name='has_collection_time',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='assignment',
            name='has_concentration',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='assignment',
            name='has_duration',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='assignment',
            name='has_start_time',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='assignment',
            name='has_temperature',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
