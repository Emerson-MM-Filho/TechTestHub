from typing import Dict, List
from django.http import QueryDict

from rest_framework.request import Request
from rest_framework.permissions import (
    BasePermissionMetaclass,
    IsAdminUser,
    IsAuthenticated,
)


class PermissionsByHttpMethodMixin:
    """Mixin to set permissions by HTTP method."""

    request: Request
    permission_classes: List[BasePermissionMetaclass]
    permission_classes_by_method: Dict[str, List[BasePermissionMetaclass]]

    def get_permissions(self) -> List[BasePermissionMetaclass]:
        """Return the permission classes based on the HTTP method."""
        perms_by_method = self.permission_classes_by_method

        permission_classes = perms_by_method.get(self.request.method)
        if permission_classes is None:
            permission_classes = self.permission_classes

        return [permission() for permission in permission_classes]


class EditableByAdminUserMixin(PermissionsByHttpMethodMixin):
    """
    Mixin to set permissions by HTTP method.

    Admin users can create, update and delete objects.
    All users can read objects.
    """

    permission_classes_by_method = {
        "GET": [IsAuthenticated],
        "POST": [IsAdminUser],
        "PUT": [IsAdminUser],
        "PATCH": [IsAdminUser],
        "DELETE": [IsAdminUser],
    }


class AddCompanyToRequestDataMixin:
    """Mixin to add company to request data."""

    def initialize_request(self, request, *args, **kwargs):
        """Initialize request and set company."""
        request = super().initialize_request(request, *args, **kwargs)

        if request.method not in ["POST", "PUT", "PATCH"]:
            return request

        company = request.user.company

        if isinstance(request.data, QueryDict):
            request.data._mutable = True
            request.data["company"] = company.id
            request.data._mutable = False
        else:
            request.data["company"] = company.id

        return request
