from django.test import TestCase
from employees.models import Employee


class TestEmployeeModel(TestCase):
    fixtures = ["initial_data.json"]

    def test_str_thunder_method(self):
        """Test that the __str__ method returns the correct string."""
        employee = Employee.objects.get(pk=1)
        self.assertEqual(str(employee), employee.name)
