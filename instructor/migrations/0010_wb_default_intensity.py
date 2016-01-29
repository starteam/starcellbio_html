# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0009_protein_weight_default'),
    ]

    operations = [
        migrations.AlterField(
            model_name='westernblotbands',
            name='intensity',
            field=models.FloatField(default=1.0),
            preserve_default=True,
        ),
    ]
