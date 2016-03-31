# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [('instructor', '0024_rename_histogram'), ]

    operations = [
        migrations.CreateModel(
            name='FlowCytometryHistogram',
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
                    'data', models.TextField(
                        null=True,
                        blank=True
                    )
                ),
                (
                    'facs', models.ForeignKey(
                        related_name='histogram',
                        to='instructor.FlowCytometry'
                    )
                ),
            ],
            options={
            },
            bases=(models.Model, ),
        ),
        migrations.RemoveField(
            model_name='flowcytometryhistogrammapping',
            name='kind',
        ),
        migrations.AlterField(
            model_name='flowcytometryhistogrammapping',
            name='fixed_data',
            field=models.ForeignKey(
                related_name='fixed_histogram_mapping',
                blank=True,
                to='instructor.FlowCytometryHistogram',
                null=True
            ),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='flowcytometryhistogrammapping',
            name='live_data',
            field=models.ForeignKey(
                related_name='live_histogram_mapping',
                blank=True,
                to='instructor.FlowCytometryHistogram',
                null=True
            ),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='flowcytometryhistogrammapping',
            name='sample_prep',
            field=models.ForeignKey(
                related_name='histogram_mapping',
                to='instructor.FlowCytometrySamplePrep'
            ),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='flowcytometryhistogrammapping',
            name='strain_protocol',
            field=models.ForeignKey(
                related_name='histogram_mapping',
                to='instructor.StrainTreatment'
            ),
            preserve_default=True,
        ),
    ]
