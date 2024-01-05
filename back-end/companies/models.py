from django.db import models
from django.contrib.auth import get_user_model

from companies_and_employees_crud.models import CreateAndUpdateTrackedModel


class Company(CreateAndUpdateTrackedModel):
    """Represents a company."""

    name = models.CharField(max_length=100)
    user = models.OneToOneField(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="company",
    )

    def __str__(self):
        return self.name


class Position(CreateAndUpdateTrackedModel):
    """Represents a position."""

    name = models.CharField(max_length=100)
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="positions",
    )

    def __str__(self):
        return self.name
