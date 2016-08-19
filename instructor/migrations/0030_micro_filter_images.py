# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [('instructor', '0029_micro_has_filters'), ]

    operations = [
        migrations.RemoveField(
            model_name='microscopyimagemapping',
            name='filter',
        ),
        migrations.AddField(
            model_name='microscopyimagemapping',
            name='blue_filter_images',
            field=models.ManyToManyField(
                related_name='image_mapping_blue',
                to='instructor.MicroscopyImage'
            ),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='microscopyimagemapping',
            name='green_filter_images',
            field=models.ManyToManyField(
                related_name='image_mapping_green',
                to='instructor.MicroscopyImage'
            ),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='microscopyimagemapping',
            name='red_filter_images',
            field=models.ManyToManyField(
                related_name='image_mapping_red',
                to='instructor.MicroscopyImage'
            ),
            preserve_default=True,
        ),
    ]
