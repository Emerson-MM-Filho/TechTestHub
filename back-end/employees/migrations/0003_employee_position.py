# Generated by Django 4.2.3 on 2023-07-16 20:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0002_employee_avatar'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='position',
            field=models.CharField(default='Any', max_length=100),
            preserve_default=False,
        ),
    ]
