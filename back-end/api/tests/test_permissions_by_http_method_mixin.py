from django.test import RequestFactory, TestCase
from api.mixins import PermissionsByHttpMethodMixin
from rest_framework.request import Request
from rest_framework.permissions import IsAdminUser, IsAuthenticated


class TestBaseView(TestCase):
    def setUp(self):
        class DummyView(PermissionsByHttpMethodMixin):
            permission_classes_by_method = {
                "GET": [IsAuthenticated],
                "POST": [IsAuthenticated, IsAdminUser],
                "PUT": [IsAuthenticated, IsAdminUser],
                "PATCH": [IsAuthenticated, IsAdminUser],
                "DELETE": [IsAuthenticated, IsAdminUser],
            }

        self.dummy_view = DummyView()

    def test_get_permissions_for_get_method(self):
        """Test that the correct permissions are returned for GET method"""

        mocked_request = RequestFactory().get("/")
        self.dummy_view.request = Request(mocked_request)

        permissions = self.dummy_view.get_permissions()

        # Assert
        self.assertIsInstance(permissions[0], IsAuthenticated)
        self.assertEqual(len(permissions), 1)

    def test_get_permissions_for_post_method(self):
        """Test that the correct permissions are returned for POST method"""

        mocked_request = RequestFactory().post("/")
        self.dummy_view.request = Request(mocked_request)

        permissions = self.dummy_view.get_permissions()

        # Assert
        self.assertIsInstance(permissions[0], IsAuthenticated)
        self.assertIsInstance(permissions[1], IsAdminUser)
        self.assertEqual(len(permissions), 2)

    def test_get_permissions_for_put_method(self):
        """Test that the correct permissions are returned for PUT method"""

        mocked_request = RequestFactory().put("/")
        self.dummy_view.request = Request(mocked_request)

        permissions = self.dummy_view.get_permissions()

        # Assert
        self.assertIsInstance(permissions[0], IsAuthenticated)
        self.assertIsInstance(permissions[1], IsAdminUser)
        self.assertEqual(len(permissions), 2)

    def test_get_permissions_for_patch_method(self):
        """Test that the correct permissions are returned for PATCH method"""

        mocked_request = RequestFactory().patch("/")
        self.dummy_view.request = Request(mocked_request)

        permissions = self.dummy_view.get_permissions()

        # Assert
        self.assertIsInstance(permissions[0], IsAuthenticated)
        self.assertIsInstance(permissions[1], IsAdminUser)
        self.assertEqual(len(permissions), 2)

    def test_get_permissions_for_delete_method(self):
        """Test that the correct permissions are returned for DELETE method"""

        mocked_request = RequestFactory().delete("/")
        self.dummy_view.request = Request(mocked_request)

        permissions = self.dummy_view.get_permissions()

        # Assert
        self.assertIsInstance(permissions[0], IsAuthenticated)
        self.assertIsInstance(permissions[1], IsAdminUser)
        self.assertEqual(len(permissions), 2)

    def test_permission_by_method_not_found(self):
        """Test that the default permissions are returned
        when the method is not found
        """

        mocked_request = RequestFactory().post("/")

        class DummyView(PermissionsByHttpMethodMixin):
            permission_classes = [IsAuthenticated]
            permission_classes_by_method = {
                "GET": [IsAuthenticated],
            }

            request = Request(mocked_request)

        permissions = DummyView().get_permissions()

        # Assert
        self.assertIsInstance(permissions[0], IsAuthenticated)
        self.assertEqual(len(permissions), 1)
