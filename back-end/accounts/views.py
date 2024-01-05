"""View module for handling requests about accounts."""

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from accounts.models import ApiUser
from accounts.serializers import ApiUserSerializer

from rest_framework.permissions import IsAuthenticated


class AccountsView(ModelViewSet):
    """Create, update, delete and list accounts."""

    permission_classes = [
        IsAuthenticated,
    ]
    queryset = ApiUser.objects.all()
    serializer_class = ApiUserSerializer

    @action(detail=False, methods=["GET"])
    def me(self, request) -> Response:
        """Return the current user."""
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
