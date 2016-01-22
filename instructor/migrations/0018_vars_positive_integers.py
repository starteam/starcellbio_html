# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0017_last_enabled_page_default'),
    ]

    operations = [
        migrations.AlterField(
            model_name='collectiontime',
            name='time',
            field=models.PositiveIntegerField(max_length=20, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='drug',
            name='concentration',
            field=models.PositiveIntegerField(max_length=50, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='drug',
            name='duration',
            field=models.PositiveIntegerField(max_length=50, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='drug',
            name='start_time',
            field=models.PositiveIntegerField(max_length=50, null=True, blank=True),
            preserve_default=True,
        ),
    ]
