from django.db import models

class User(models.Model):
    """
    first_name, name, email, username, password
    """
    first_name = models.CharField(max_length=100)
    name = models.CharField(max_length=100, default='Default Name')
    email = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.username

    
class Active_user(models.Model):
    """
    username
    """
    username = models.CharField(max_length=100)

    def __str__(self):
        return self.username