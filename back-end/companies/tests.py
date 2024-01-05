from django.test import TestCase
from companies.models import Company


class TestCompanyModel(TestCase):
    fixtures = ["initial_data.json"]

    def test_str_thunder_method(self):
        """Test that the __str__ method returns the correct string."""
        company = Company.objects.get(pk=1)
        self.assertEqual(str(company), company.name)
