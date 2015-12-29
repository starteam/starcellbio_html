# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0012_change_variables_to_int'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignment',
            name='last_enabled_page',
            field=models.IntegerField(default=1, max_length=5),
            preserve_default=True,
        ),
    ]
