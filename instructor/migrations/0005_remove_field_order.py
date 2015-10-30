# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0004_drug_time_unit'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='treatment',
            options={},
        ),
        migrations.RemoveField(
            model_name='treatment',
            name='order',
        ),
    ]
