# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [('instructor', '0031_micro_objective'), ]

    operations = [
        migrations.AlterField(
            model_name='microscopygroupedimages',
            name='blue_filter_image',
            field=models.ForeignKey(
                related_name='grouped_images_blue',
                on_delete=django.db.models.deletion.SET_NULL,
                blank=True,
                to='instructor.MicroscopyImage',
                null=True
            ),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='microscopygroupedimages',
            name='green_filter_image',
            field=models.ForeignKey(
                related_name='grouped_images_green',
                on_delete=django.db.models.deletion.SET_NULL,
                blank=True,
                to='instructor.MicroscopyImage',
                null=True
            ),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='microscopygroupedimages',
            name='merge_filter_image',
            field=models.ForeignKey(
                related_name='grouped_images_all',
                on_delete=django.db.models.deletion.SET_NULL,
                blank=True,
                to='instructor.MicroscopyImage',
                null=True
            ),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='microscopygroupedimages',
            name='red_filter_image',
            field=models.ForeignKey(
                related_name='grouped_images_red',
                on_delete=django.db.models.deletion.SET_NULL,
                blank=True,
                to='instructor.MicroscopyImage',
                null=True
            ),
            preserve_default=True,
        ),
    ]
