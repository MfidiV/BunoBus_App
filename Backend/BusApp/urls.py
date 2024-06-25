# users/urls.py

from django.urls import path
from .views import UserCreateView

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='user-register'),
    # Add more endpoints as needed
]
