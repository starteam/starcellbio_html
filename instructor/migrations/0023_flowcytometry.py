# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [('instructor', '0022_last_enabled_page'), ]

    operations = [
        migrations.CreateModel(
            name='FlowCytometry',
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
                    'scale', models.CharField(
                        default=b'linear',
                        max_length=50,
                        choices=[
                            (b'linear', b'Linear'), (
                                b'log', b'Logarithmic Scale'
                            )
                        ]
                    )
                ),
                ('xrange', models.IntegerField(default=200)),
                (
                    'tick_values', models.CharField(
                        default=b'50,100,150',
                        max_length=50
                    )
                ),
                (
                    'assignment', models.ForeignKey(
                        related_name='flow_cytometry',
                        to='instructor.Assignment'
                    )
                ),
            ],
            options={
            },
            bases=(models.Model, ),
        ),
    ]
