from django.contrib import admin
from .models import CustomUser
# Register your models here.
class CustomUserAdmin(admin.ModelAdmin):
    utilisater = ("nom", "prenoms", "numero de telephone", "email")
admin.site.register(CustomUser, CustomUserAdmin)
