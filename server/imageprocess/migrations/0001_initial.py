# Generated by Django 4.2.10 on 2024-02-26 06:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('img', models.ImageField(upload_to='')),
            ],
        ),
    ]
