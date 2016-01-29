# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0014_drug_duration_unit'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assignment',
            name='access',
            field=models.CharField(default=b'private', max_length=50, choices=[(b'published', b'Published'), (b'private', b'Private'), (b'archived', b'Archived')]),
            preserve_default=True,
        ),
    ]
