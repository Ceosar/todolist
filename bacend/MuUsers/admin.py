from django.contrib import admin
from .models import MuUsers

from django.contrib.auth.models import User, Group
from django.contrib import admin

# Отменить регистрацию стандартных моделей User и Group
admin.site.unregister(User)
admin.site.unregister(Group)


@admin.register(MuUsers)  # Используйте декоратор @admin.register
class MuUsersAdmin(admin.ModelAdmin):
    pass