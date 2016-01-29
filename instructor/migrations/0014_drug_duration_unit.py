# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0013_assignment_last_enabled_page'),
    ]

    operations = [
        migrations.AddField(
            model_name='drug',
            name='duration_unit',
            field=models.CharField(max_length=50, null=True, blank=True),
            preserve_default=True,
        ),
    ]
