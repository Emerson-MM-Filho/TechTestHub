# Generated by Django 4.2.3 on 2023-07-16 15:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0004_alter_apiuser_avatar"),
    ]

    operations = [
        migrations.AlterField(
            model_name="apiuser",
            name="avatar",
            field=models.ImageField(
                blank=True, null=True, upload_to="accounts/avatars"
            ),
        ),
    ]
