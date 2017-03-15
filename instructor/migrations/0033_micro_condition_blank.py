# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [('instructor', '0032_grouped_images_on_delete'), ]

    operations = [
        migrations.AlterField(
            model_name='microscopysampleprep',
            name='condition',
            field=models.CharField(
                max_length=50,
                null=True,
                blank=True
            ),
            preserve_default=True,
        ),
    ]
