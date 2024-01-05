from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from accounts.serializers import ApiUserSerializer
from rest_framework.permissions import AllowAny


class AuthToken(ObtainAuthToken):
    """Custom AuthToken view."""

    # any user can get a token
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """Return the token."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)

        user_serializer = ApiUserSerializer(user, many=False)
        return Response({"token": token.key, "user": user_serializer.data})
