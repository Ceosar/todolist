from django.contrib.auth.hashers import check_password
from django.db import models
from django.contrib.auth.hashers import make_password

class MuUsers(models.Model):
    email = models.CharField(max_length=100, verbose_name="Email", null=False, unique=True, blank=False)
    password = models.CharField(max_length=128, verbose_name="Password", null=False, blank=False)
    phone = models.CharField(max_length=20, verbose_name="Phone", null=False, unique=True, blank=False)
    name = models.CharField(max_length=50, verbose_name="Имя", null=True, blank=True)
    soName = models.CharField(max_length=50, verbose_name="Фамилия", null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.password.startswith('pbkdf2_sha256$'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} {self.soName} {self.email}"

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    class Meta:
        ordering = ['email']
        verbose_name = 'User'
        verbose_name_plural = 'Users'
