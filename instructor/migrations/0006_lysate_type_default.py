# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0005_remove_field_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='westernblot',
            name='has_cytoplasmic_fractination',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='westernblot',
            name='has_nuclear_fractination',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
