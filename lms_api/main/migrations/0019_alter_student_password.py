# Generated by Django 5.0.4 on 2024-05-07 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0018_student_profile_img_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='password',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]