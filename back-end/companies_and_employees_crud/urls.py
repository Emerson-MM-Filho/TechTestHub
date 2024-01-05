"""
URL configuration for companies_and_employees_crud project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from accounts.views import AccountsView
from api.views import AuthToken
from companies.views import CompaniesView, PositionsView
from employees.views import EmployeesView

api_router = DefaultRouter()
api_router.register(r"company", CompaniesView)
api_router.register(r"position", PositionsView)
api_router.register(r"employee", EmployeesView)
api_router.register(r"account", AccountsView)

# Apps urls

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", AuthToken.as_view()),
    # include apps urls
    path("api/", include(api_router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
