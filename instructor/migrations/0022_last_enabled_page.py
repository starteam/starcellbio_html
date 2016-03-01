# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [('instructor', '0021_fixed_live_histogram'), ]

    operations = [
        migrations.RemoveField(
            model_name='assignment',
            name='last_enabled_page',
        ),
        migrations.AddField(
            model_name='assignment',
            name='facs_last_enabled_page',
            field=models.CharField(
                default=b'facs_sample_prep',
                max_length=25
            ),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='assignment',
            name='last_page_name',
            field=models.CharField(
                default=b'course',
                max_length=25
            ),
            preserve_default=True,
        ),
    ]
