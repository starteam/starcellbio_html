# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [('instructor', '0025_create_facs_histogram'), ]

    operations = [
        migrations.AddField(
            model_name='assignment',
            name='micro_last_enabled_page',
            field=models.CharField(
                default=b'micro_sample_prep',
                max_length=25
            ),
            preserve_default=True,
        ),
    ]
