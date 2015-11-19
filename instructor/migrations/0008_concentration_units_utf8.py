# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0007_wb_bands'),
    ]

    operations = [
        migrations.RunSQL("ALTER TABLE instructor_drug MODIFY concentration_unit VARCHAR(50) CHARACTER SET utf8;")
    ]
