# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CollectionTime',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('time', models.CharField(max_length=20, null=True, blank=True)),
                ('units', models.CharField(max_length=10, null=True, blank=True)),
                ('assignment', models.ForeignKey(related_name='collection_time', to='instructor.Assignment')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Drug',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('concentration', models.CharField(max_length=50, null=True, blank=True)),
                ('concentration_unit', models.CharField(max_length=50, null=True, blank=True)),
                ('start_time', models.CharField(max_length=50, null=True, blank=True)),
                ('duration', models.CharField(max_length=50, null=True, blank=True)),
                ('assignment', models.ForeignKey(related_name='drug', to='instructor.Assignment')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='StrainTreatment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('enabled', models.BooleanField(default=True)),
                ('assignment', models.ForeignKey(related_name='strain_treatment', to='instructor.Assignment')),
                ('strain', models.ForeignKey(to='instructor.Strains')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Temperature',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('degrees', models.CharField(max_length=10, null=True, blank=True)),
                ('assignment', models.ForeignKey(related_name='temperature', to='instructor.Assignment')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Treatment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('order', models.IntegerField(default=0)),
                ('assignment', models.ForeignKey(related_name='treatment', to='instructor.Assignment')),
                ('collection_time', models.ForeignKey(blank=True, to='instructor.CollectionTime', null=True)),
                ('drug', models.ForeignKey(to='instructor.Drug')),
                ('temperature', models.ForeignKey(blank=True, to='instructor.Temperature', null=True)),
            ],
            options={
                'ordering': ['order'],
            },
            bases=(models.Model,),
        ),
        migrations.RemoveField(
            model_name='protocol',
            name='assignment',
        ),
        migrations.RemoveField(
            model_name='strainprotocol',
            name='assignment',
        ),
        migrations.RemoveField(
            model_name='strainprotocol',
            name='protocol',
        ),
        migrations.RemoveField(
            model_name='strainprotocol',
            name='strain',
        ),
        migrations.RemoveField(
            model_name='treatments',
            name='protocol',
        ),
        migrations.DeleteModel(
            name='Protocol',
        ),
        migrations.DeleteModel(
            name='Treatments',
        ),
        migrations.AddField(
            model_name='straintreatment',
            name='treatment',
            field=models.ForeignKey(to='instructor.Treatment'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='flowcytometryhistogram',
            name='strain_protocol',
            field=models.ForeignKey(related_name='histograms', to='instructor.StrainTreatment'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='microscopyimages',
            name='strain_protocol',
            field=models.ForeignKey(related_name='microscopy_images', to='instructor.StrainTreatment'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='westernblotantibodybands',
            name='strain_protocol',
            field=models.ForeignKey(related_name='bands', to='instructor.StrainTreatment'),
            preserve_default=True,
        ),
        migrations.DeleteModel(
            name='StrainProtocol',
        ),
    ]
