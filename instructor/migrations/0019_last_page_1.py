# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0018_vars_positive_integers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assignment',
            name='last_enabled_page',
            field=models.IntegerField(default=1, max_length=5),
            preserve_default=True,
        ),
    ]
