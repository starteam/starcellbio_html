# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0026_assignment_micro_last_enabled_page'),
    ]

    operations = [
        migrations.CreateModel(
            name='MicroscopyImage',
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
                    'file', models.ImageField(
                        max_length=300,
                        null=True,
                        upload_to=b'microscopy_images'
                    )
                ),
                (
                    'assignment', models.ForeignKey(
                        related_name='image',
                        to='instructor.Assignment'
                    )
                ),
            ],
            options={
            },
            bases=(models.Model, ),
        ),
        migrations.CreateModel(
            name='MicroscopyImageMapping',
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
                    'objective', models.CharField(
                        default=b'N/A',
                        max_length=50
                    )
                ),
                (
                    'filter', models.CharField(
                        default=b'merge',
                        max_length=50,
                        choices=[
                            (b'red', b'Red'), (b'green', b'Green'), (
                                b'blue', b'Blue'
                            ), (b'merge', b'All')
                        ]
                    )
                ),
                (
                    'images', models.ManyToManyField(
                        related_name='image_mapping',
                        to='instructor.MicroscopyImage'
                    )
                ),
                (
                    'sample_prep', models.ForeignKey(
                        related_name='image_mapping',
                        to='instructor.MicroscopySamplePrep'
                    )
                ),
                (
                    'strain_protocol', models.ForeignKey(
                        related_name='image_mapping',
                        to='instructor.StrainTreatment'
                    )
                ),
            ],
            options={
            },
            bases=(models.Model, ),
        ),
        migrations.RemoveField(
            model_name='microscopyimages',
            name='sample_prep',
        ),
        migrations.RemoveField(
            model_name='microscopyimages',
            name='strain_protocol',
        ),
        migrations.DeleteModel(
            name='MicroscopyImages',
        ),
    ]
