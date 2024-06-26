from django.db import models
from django.contrib.auth.hashers import make_password

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    email = models.EmailField(max_length=254, unique=True)
    password = models.CharField(max_length=128)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    registration_date = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=10, choices=[
        ('passenger', 'Passenger'),
        ('driver', 'Driver'),
        ('admin', 'Admin'),
        ('supervisor', 'Supervisor')
    ], default='passenger')

    class Meta:
        db_table = 'users'

    def save(self, *args, **kwargs):
        if not self.pk or self.password != User.objects.get(pk=self.pk).password:
            self.password = make_password(self.password)
        super(User, self).save(*args, **kwargs)
