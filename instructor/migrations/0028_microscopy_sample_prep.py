# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [('instructor', '0027_microscopy_image_mapping'), ]

    operations = [
        migrations.RemoveField(
            model_name='microscopysampleprep',
            name='analysis',
        ),
        migrations.AddField(
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
                    ), (b'DYE-FLU', b'dye/stain (fluorescence)'), (
                        b'DYE-BF', b'dye/stain (brightfield)'
                    ), (
                        b'FLUOR', b'fluorescence'
                    ), (b'BF', b'brightfield')
                ]
            ),
            preserve_default=True,
        ),
    ]
