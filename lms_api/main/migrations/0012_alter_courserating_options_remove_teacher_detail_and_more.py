# Generated by Django 5.0.4 on 2024-05-06 09:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_alter_studentcourseenrollment_course_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='courserating',
            options={'verbose_name_plural': '7. Course Rating'},
        ),
        migrations.RemoveField(
            model_name='teacher',
            name='detail',
        ),
        migrations.AddField(
            model_name='teacher',
            name='profile_img',
            field=models.ImageField(null=True, upload_to='teacher_profile_imgs/'),
        ),
    ]
