# users/serializers.py

from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'password', 'email', 'role', 'full_name', 'phone_number', 'date_of_birth', 'address', 'registration_date']
        extra_kwargs = {
            'password': {'write_only': True},
            'user_id': {'read_only': True},
            'registration_date': {'read_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data.get('role', 'passenger'),
            full_name=validated_data.get('full_name', ''),
            phone_number=validated_data.get('phone_number', None),
            date_of_birth=validated_data.get('date_of_birth', None),
            address=validated_data.get('address', ''),
        )
        return user
