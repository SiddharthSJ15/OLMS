# Generated by Django 5.0.4 on 2024-05-08 08:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0026_quizquestions_right_ans'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quizquestions',
            name='right_ans',
            field=models.CharField(max_length=200),
        ),
    ]
