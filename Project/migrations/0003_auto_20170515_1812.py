# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-05-15 15:12
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Project', '0002_auto_20170515_1750'),
    ]

    operations = [
        migrations.RenameField(
            model_name='commentproblem',
            old_name='comment',
            new_name='problem',
        ),
    ]