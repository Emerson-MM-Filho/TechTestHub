from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from companies_and_employees_crud.models import CreateAndUpdateTrackedModel


class ApiUser(CreateAndUpdateTrackedModel, AbstractUser):
    """ApiUser model."""

    first_name = models.CharField(_("first name"), max_length=150)
    last_name = models.CharField(_("last name"), max_length=150)
    email = models.EmailField(_("email address"))
    avatar = models.ImageField(upload_to="accounts/avatars", null=True, blank=True)
