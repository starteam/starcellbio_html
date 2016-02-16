# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0020_facs_sample_prep'),
    ]

    operations = [
        migrations.RenameField(
            model_name='flowcytometryhistogram',
            old_name='data',
            new_name='fixed_data',
        ),
        migrations.RemoveField(
            model_name='flowcytometryhistogram',
            name='enabled',
        ),
        migrations.AddField(
            model_name='flowcytometryhistogram',
            name='live_data',
            field=models.TextField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
