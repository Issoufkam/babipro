from django.contrib.auth.models import AbstractUser
from django.db import models
from phone_field import PhoneField

class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    tel = PhoneField(blank=True, help_text='Contact phone number')
