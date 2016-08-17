# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [('instructor', '0028_microscopy_sample_prep'), ]

    operations = [
        migrations.AddField(
            model_name='microscopysampleprep',
            name='has_all',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='microscopysampleprep',
            name='has_blue',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='microscopysampleprep',
            name='has_green',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='microscopysampleprep',
            name='has_red',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
