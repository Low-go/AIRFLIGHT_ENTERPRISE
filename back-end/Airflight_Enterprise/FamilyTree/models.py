from django.db import models

# Create your models here.

# this is a test class over here
class Teacher(models.Model):
    name = models.CharField(max_length = 80)
    age = models.IntegerField()