# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [('instructor', '0030_micro_grouped_images'), ]

    operations = [
        migrations.RemoveField(
            model_name='microscopyimagemapping',
            name='objective',
        ),
        migrations.AddField(
            model_name='microscopyimage',
            name='objective',
            field=models.CharField(
                default=b'',
                max_length=50,
                blank=True
            ),
            preserve_default=True,
        ),
    ]
