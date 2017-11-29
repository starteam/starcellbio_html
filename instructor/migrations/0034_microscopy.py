# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [('instructor', '0033_micro_condition_blank'), ]

    operations = [
        migrations.CreateModel(
            name='Microscopy',
            fields=[
                (
                    'id', models.AutoField(
                        verbose_name='ID',
                        serialize=False,
                        auto_created=True,
                        primary_key=True
                    )
                ),
                ('scroll_position', models.IntegerField(default=0)),
                (
                    'assignment', models.OneToOneField(
                        to='instructor.Assignment'
                    )
                ),
            ],
            options={
            },
            bases=(models.Model, ),
        ),
    ]
