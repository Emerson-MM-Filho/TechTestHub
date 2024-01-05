"""View module for handling requests about companies."""

from rest_framework.viewsets import ModelViewSet

from api.mixins import EditableByAdminUserMixin, AddCompanyToRequestDataMixin
from companies.models import Company, Position
from companies.serializers import (
    CompanySerializer,
    PositionSerializerWithCompany,
)


class CompaniesView(EditableByAdminUserMixin, ModelViewSet):
    """Create, update, delete and list companies."""

    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    def get_queryset(self):
        """Return queryset based on request user."""
        return self.queryset.filter(user=self.request.user)


class PositionsView(
    AddCompanyToRequestDataMixin, EditableByAdminUserMixin, ModelViewSet
):
    """Create, update, delete and list positions."""

    queryset = Position.objects.all()
    serializer_class = PositionSerializerWithCompany

    def get_queryset(self):
        """Return queryset based on request user."""
        return self.queryset.filter(company__user=self.request.user)

    def initialize_request(self, request, *args, **kwargs):
        """Initialize request and set company."""
        request = super().initialize_request(request, *args, **kwargs)

        if request.method in ["POST", "PUT", "PATCH"]:
            company = request.user.company
            request.data["company"] = company.id

        return request
