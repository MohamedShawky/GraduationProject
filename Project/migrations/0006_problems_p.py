# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-05-17 04:33
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Project', '0005_auto_20170517_0702'),
    ]

    operations = [
        migrations.AddField(
            model_name='problems',
            name='p',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Project.Profile'),
        ),
    ]
