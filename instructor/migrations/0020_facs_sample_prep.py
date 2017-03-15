# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0019_last_page_1'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='flowcytometrysampleprep',
            name='order',
        ),
        migrations.RemoveField(
            model_name='flowcytometrysampleprep',
            name='treatment',
        ),
        migrations.AddField(
            model_name='flowcytometrysampleprep',
            name='fixed',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='flowcytometrysampleprep',
            name='live',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='flowcytometrysampleprep',
            name='analysis',
            field=models.CharField(max_length=50, choices=[(b'', b'Select Analysis'), (b'Anti', b'Antibody-labeling'), (b'Dye', b'Dye/Stain')]),
            preserve_default=True,
        ),
    ]
