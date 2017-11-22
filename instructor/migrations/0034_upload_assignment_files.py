# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0033_micro_condition_blank'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignment',
            name='files',
            field=models.TextField(default=b''),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='assignment',
            name='text',
            field=models.TextField(default=b''),
            preserve_default=True,
        ),
    ]
