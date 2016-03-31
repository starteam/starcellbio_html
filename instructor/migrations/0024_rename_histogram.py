# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [('instructor', '0023_flowcytometry'), ]

    operations = [
        migrations.CreateModel(
            name='FlowCytometryHistogramMapping',
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
                    'kind', models.CharField(
                        default=b'normal',
                        max_length=50,
                        choices=[
                            (b'normal', b'Normal'), (b's-block', b's-block'), (
                                b'g1-block', b'g1-block'
                            ), (
                                b'g2-block', b'g2-block'
                            ), (
                                b'alpha-block', b'alpha-block'
                            ), (
                                b'2-peak-normal-400', b'2-peak-normal-400'
                            ), (
                                b'peak-100-normal-400', b'peak-100-normal-400'
                            ), (
                                b'2-peak-uneven-normal-400',
                                b'2-peak-uneven-normal-400'
                            ), (
                                b'peak-50-normal-400', b'peak-50-normal-400'
                            ), (b'4-peak-normal-400', b'4-peak-normal-400'), (
                                b's-block-normal-400', b's-block-normal-400'
                            ), (b'custom', b'Custom')
                        ]
                    )
                ),
                (
                    'fixed_data', models.TextField(
                        null=True,
                        blank=True
                    )
                ),
                (
                    'live_data', models.TextField(
                        null=True,
                        blank=True
                    )
                ),
                (
                    'sample_prep', models.ForeignKey(
                        related_name='histograms',
                        to='instructor.FlowCytometrySamplePrep'
                    )
                ),
                (
                    'strain_protocol', models.ForeignKey(
                        related_name='histograms',
                        to='instructor.StrainTreatment'
                    )
                ),
            ],
            options={
            },
            bases=(models.Model, ),
        ),
        migrations.RemoveField(
            model_name='flowcytometryhistogram',
            name='sample_prep',
        ),
        migrations.RemoveField(
            model_name='flowcytometryhistogram',
            name='strain_protocol',
        ),
        migrations.DeleteModel(
            name='FlowCytometryHistogram',
        ),
    ]
