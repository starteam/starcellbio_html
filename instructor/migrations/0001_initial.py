# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Assignment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('assignment_id', models.CharField(unique=True, max_length=50)),
                ('name', models.CharField(max_length=50)),
                ('access', models.CharField(default=b'public', max_length=50, choices=[(b'public', b'Public'), (b'private', b'Private'), (b'archived', b'Archived')])),
                ('group_by', models.CharField(default=b'strain', max_length=50, choices=[(b'strain', b'Strain'), (b'protocol', b'Protocol')])),
                ('has_wb', models.BooleanField(default=False)),
                ('has_fc', models.BooleanField(default=False)),
                ('has_micro', models.BooleanField(default=False)),
                ('has_concentration', models.BooleanField(default=True)),
                ('has_temperature', models.BooleanField(default=True)),
                ('has_start_time', models.BooleanField(default=True)),
                ('has_duration', models.BooleanField(default=True)),
                ('has_collection_time', models.BooleanField(default=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='AssignmentText',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=40)),
                ('text', models.TextField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('code', models.CharField(unique=True, max_length=50)),
                ('name', models.CharField(max_length=50)),
                ('owner', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='FlowCytometryHistogram',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('kind', models.CharField(default=b'normal', max_length=50, choices=[(b'normal', b'Normal'), (b's-block', b's-block'), (b'g1-block', b'g1-block'), (b'g2-block', b'g2-block'), (b'alpha-block', b'alpha-block'), (b'2-peak-normal-400', b'2-peak-normal-400'), (b'peak-100-normal-400', b'peak-100-normal-400'), (b'2-peak-uneven-normal-400', b'2-peak-uneven-normal-400'), (b'peak-50-normal-400', b'peak-50-normal-400'), (b'4-peak-normal-400', b'4-peak-normal-400'), (b's-block-normal-400', b's-block-normal-400'), (b'custom', b'Custom')])),
                ('data', models.TextField(null=True, blank=True)),
                ('enabled', models.BooleanField(default=False)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='FlowCytometrySamplePrep',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('treatment', models.CharField(default=b'Fixed', max_length=50, choices=[(b'Fixed', b'Fixed Cells'), (b'Live', b'Live Cells')])),
                ('analysis', models.CharField(default=b'Dye', max_length=50, choices=[(b'Dye', b'Dye/Stain'), (b'Anti', b'Antibody-labeling')])),
                ('condition', models.CharField(max_length=50)),
                ('order', models.IntegerField(default=0)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='MicroscopyImages',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('order', models.IntegerField(default=0)),
                ('objective', models.CharField(default=b'N/A', max_length=50)),
                ('url', models.URLField(max_length=300)),
                ('image', models.FileField(max_length=300, null=True, upload_to=b'microscopy_images')),
                ('filter', models.CharField(default=b'merge', max_length=50, choices=[(b'red', b'Red'), (b'green', b'Green'), (b'blue', b'Blue'), (b'merge', b'All')])),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='MicroscopySamplePrep',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('analysis', models.CharField(default=b'Dye', max_length=50, choices=[(b'Dye', b'Dye/Stain'), (b'IF', b'Antibody-labeling IF'), (b'IHC', b'Antibody-labeling IHC')])),
                ('condition', models.CharField(max_length=50)),
                ('order', models.IntegerField(default=0)),
                ('has_filters', models.BooleanField(default=False)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Protocol',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='StrainProtocol',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('enabled', models.BooleanField(default=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Strains',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Treatments',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('order', models.IntegerField(default=0)),
                ('treatment', models.CharField(max_length=50)),
                ('concentration', models.CharField(max_length=50)),
                ('concentration_unit', models.CharField(max_length=50)),
                ('start_time', models.CharField(max_length=50)),
                ('end_time', models.CharField(max_length=50)),
                ('temperature', models.CharField(max_length=50)),
                ('collection_time', models.CharField(max_length=50)),
                ('protocol', models.ForeignKey(related_name='treatments', to='instructor.Protocol')),
            ],
            options={
                'ordering': ['order'],
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='WesternBlot',
            fields=[
                ('assignment', models.OneToOneField(related_name='western_blot', primary_key=True, serialize=False, to='instructor.Assignment')),
                ('has_whole_cell_lysate', models.BooleanField(default=True)),
                ('has_nuclear_fractination', models.BooleanField(default=True)),
                ('has_cytoplasmic_fractination', models.BooleanField(default=True)),
                ('has_gel_10', models.BooleanField(default=True)),
                ('has_gel_12', models.BooleanField(default=True)),
                ('has_gel_15', models.BooleanField(default=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='WesternBlotAntibody',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('primary', models.CharField(max_length=50)),
                ('secondary', models.CharField(max_length=50)),
                ('western_blot', models.ForeignKey(related_name='antibodies', to='instructor.WesternBlot')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='WesternBlotAntibodyBands',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('wcl_weight', models.FloatField(default=0.0)),
                ('wcl_intensity', models.FloatField(default=0.0)),
                ('nuc_weight', models.FloatField(default=0.0)),
                ('nuc_intensity', models.FloatField(default=0.0)),
                ('cyto_weight', models.FloatField(default=0.0)),
                ('cyto_intensity', models.FloatField(default=0.0)),
                ('is_background', models.BooleanField(default=False)),
                ('antibody', models.ForeignKey(related_name='bands', to='instructor.WesternBlotAntibody')),
                ('strain_protocol', models.ForeignKey(related_name='bands', to='instructor.StrainProtocol')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='strains',
            name='assignment',
            field=models.ForeignKey(related_name='strains', to='instructor.Assignment'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='strainprotocol',
            name='assignment',
            field=models.ForeignKey(related_name='strain_protocol', to='instructor.Assignment'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='strainprotocol',
            name='protocol',
            field=models.ForeignKey(to='instructor.Protocol'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='strainprotocol',
            name='strain',
            field=models.ForeignKey(to='instructor.Strains'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='protocol',
            name='assignment',
            field=models.ForeignKey(related_name='protocols', to='instructor.Assignment'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='microscopysampleprep',
            name='assignment',
            field=models.ForeignKey(related_name='microscopy_sample_prep', to='instructor.Assignment'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='microscopyimages',
            name='sample_prep',
            field=models.ForeignKey(related_name='microscopy_images', to='instructor.MicroscopySamplePrep'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='microscopyimages',
            name='strain_protocol',
            field=models.ForeignKey(related_name='microscopy_images', to='instructor.StrainProtocol'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='flowcytometrysampleprep',
            name='assignment',
            field=models.ForeignKey(related_name='facs_sample_prep', to='instructor.Assignment'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='flowcytometryhistogram',
            name='sample_prep',
            field=models.ForeignKey(related_name='histograms', to='instructor.FlowCytometrySamplePrep'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='flowcytometryhistogram',
            name='strain_protocol',
            field=models.ForeignKey(related_name='histograms', to='instructor.StrainProtocol'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='assignmenttext',
            name='assignment',
            field=models.ForeignKey(related_name='assignment_text', to='instructor.Assignment'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='assignment',
            name='basedOn',
            field=models.ForeignKey(blank=True, to='instructor.Assignment', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='assignment',
            name='course',
            field=models.ForeignKey(related_name='assignments', to='instructor.Course'),
            preserve_default=True,
        ),
    ]
