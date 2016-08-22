# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [('instructor', '0029_micro_analysis_names'), ]

    operations = [
        migrations.CreateModel(
            name='MicroscopyGroupedImages',
            fields=[
                (
                    'id', models.AutoField(
                        verbose_name='ID',
                        serialize=False,
                        auto_created=True,
                        primary_key=True
                    )
                ),
                (
                    'blue_filter_image', models.ForeignKey(
                        related_name='grouped_images_blue',
                        blank=True,
                        to='instructor.MicroscopyImage',
                        null=True
                    )
                ),
                (
                    'green_filter_image', models.ForeignKey(
                        related_name='grouped_images_green',
                        blank=True,
                        to='instructor.MicroscopyImage',
                        null=True
                    )
                ),
                (
                    'merge_filter_image', models.ForeignKey(
                        related_name='grouped_images_all',
                        blank=True,
                        to='instructor.MicroscopyImage',
                        null=True
                    )
                ),
                (
                    'red_filter_image', models.ForeignKey(
                        related_name='grouped_images_red',
                        blank=True,
                        to='instructor.MicroscopyImage',
                        null=True
                    )
                ),
            ],
            options={
            },
            bases=(models.Model, ),
        ),
        migrations.RemoveField(
            model_name='microscopyimagemapping',
            name='filter',
        ),
        migrations.AddField(
            model_name='microscopyimagemapping',
            name='grouped_images',
            field=models.ManyToManyField(
                related_name='image_mapping',
                to='instructor.MicroscopyGroupedImages'
            ),
            preserve_default=True,
        ),
    ]
