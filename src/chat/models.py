from django.db import models

class MembersChatt(models.Model):
    name = models.CharField(max_length=10)