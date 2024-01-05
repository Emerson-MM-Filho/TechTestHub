from django.db import models

from companies_and_employees_crud.models import CreateAndUpdateTrackedModel


class Employee(CreateAndUpdateTrackedModel):
    """Represents an employee of a company."""

    name = models.CharField(max_length=100)
    avatar = models.ImageField(upload_to="employees/avatars", null=True, blank=True)
    position = models.ForeignKey(
        "companies.Position",
        on_delete=models.SET_NULL,
        related_name="employees",
        null=True,
        blank=True,
    )
    email = models.EmailField()
    company = models.ForeignKey("companies.Company", on_delete=models.CASCADE)
    join_date = models.DateField()
    leave_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name


class Vacation(CreateAndUpdateTrackedModel):
    """Represents a vacation of an employee."""

    employee = models.ForeignKey(
        "Employee", on_delete=models.CASCADE, related_name="vacations"
    )
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"{self.employee} vacation from {self.start_date} to {self.end_date}"
