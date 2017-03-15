# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [('instructor', '0028_microscopy_sample_prep'), ]

    operations = [
        migrations.AlterField(
            model_name='microscopysampleprep',
            name='micro_analysis',
            field=models.CharField(
                default=b'',
                max_length=50,
                choices=[
                    (b'', b'Select Analysis'), (
                        b'IF', b'Antibody-labeling IF'
                    ), (
                        b'IHC', b'Antibody-labeling IHC'
                    ), (b'DYE-FLU', b'Dye/stain (fluorescence)'), (
                        b'DYE-BF', b'Dye/stain (brightfield)'
                    ), (
                        b'FLUOR', b'Fluorescence'
                    ), (b'BF', b'Brightfield')
                ]
            ),
            preserve_default=True,
        ),
    ]
