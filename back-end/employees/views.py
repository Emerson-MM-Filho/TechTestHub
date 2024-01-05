"""View module for handling requests about employees."""

from django.http import QueryDict
from rest_framework.views import Response
from rest_framework.viewsets import ModelViewSet

from api.mixins import EditableByAdminUserMixin, AddCompanyToRequestDataMixin
from employees.models import Employee
from employees.serializers import (
    EmployeeSerializer,
    EmployeeCreateUpdateSerializer,
    VacationSerializer,
)

from rest_framework.decorators import action


class EmployeesView(
    EditableByAdminUserMixin, AddCompanyToRequestDataMixin, ModelViewSet
):
    """Create, update, delete and list employees."""

    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        return super().get_queryset().filter(company__user=self.request.user)

    def get_serializer_class(self):
        if self.request.method in ("POST", "PUT", "PATCH"):
            return EmployeeCreateUpdateSerializer

        return super().get_serializer_class()

    @action(detail=True, methods=["GET", "POST"], url_path="vacations")
    def vacations(self, request, pk=None):
        """List or create vacations of an employee."""
        if request.method == "GET":
            return self.get_vacations(request, pk=pk)

        return self.create_vacation(request, pk=pk)

    def get_vacations(self, request, pk=None):
        """Get vacations of an employee."""
        employee = self.get_object()
        vacations = employee.vacations.all()

        return Response(VacationSerializer(vacations, many=True).data)

    def create_vacation(self, request, pk=None):
        """Create a vacation for an employee."""
        employee = self.get_object()

        # Add employee to request data
        if isinstance(request.data, QueryDict):
            request.data._mutable = True
            request.data["employee"] = employee.id
            request.data._mutable = False
        else:
            request.data["employee"] = employee.id

        vacation = VacationSerializer(data=request.data)
        vacation.is_valid(raise_exception=True)
        vacation.save(employee=employee)

        return Response(vacation.data)
