# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0034_upload_assignment_files'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='flowcytometry',
            name='tick_values',
        ),
        migrations.AddField(
            model_name='flowcytometry',
            name='yrange',
            field=models.IntegerField(default=100),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='flowcytometry',
            name='scale',
            field=models.CharField(default=b'linear', max_length=50, choices=[(b'linear', b'Linear'), (b'log', b'Logarithmic')]),
            preserve_default=True,
        ),
    ]
