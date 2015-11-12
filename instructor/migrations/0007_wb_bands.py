# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0006_lysate_type_default'),
    ]

    operations = [
        migrations.CreateModel(
            name='WesternBlotBands',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('intensity', models.FloatField(default=0.0)),
                ('weight', models.FloatField(default=0.0)),
                ('lysate_type', models.CharField(max_length=50, choices=[(b'wc', b'Whole Cell'), (b'nuc', b'Nuclear'), (b'cyto', b'Cytoplasmic')])),
                ('antibody', models.ForeignKey(related_name='bands', to='instructor.WesternBlotAntibody')),
                ('strain_protocol', models.ForeignKey(related_name='bands', to='instructor.StrainTreatment')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.RemoveField(
            model_name='westernblotantibodybands',
            name='antibody',
        ),
        migrations.RemoveField(
            model_name='westernblotantibodybands',
            name='strain_protocol',
        ),
        migrations.DeleteModel(
            name='WesternBlotAntibodyBands',
        ),
        migrations.AddField(
            model_name='westernblotantibody',
            name='cyto_weight',
            field=models.CharField(default=b'0', max_length=50),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='westernblotantibody',
            name='nuc_weight',
            field=models.CharField(default=b'0', max_length=50),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='westernblotantibody',
            name='wc_weight',
            field=models.CharField(default=b'0', max_length=50),
            preserve_default=True,
        ),
    ]
