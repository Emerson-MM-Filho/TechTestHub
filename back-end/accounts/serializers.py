from rest_framework import serializers
from django.contrib.auth import get_user_model


class ApiUserSerializer(serializers.ModelSerializer):
    """User serializer."""

    isAdmin = serializers.SerializerMethodField("is_admin")

    class Meta:
        """Meta class."""

        model = get_user_model()
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "password",
            "avatar",
            "isAdmin",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def is_admin(self, obj):
        """Return True if user is admin."""
        return obj.is_superuser
