from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = "Create two users: 1 superuser and 1 normal user"

    def handle(self, *args, **options):
        user_model = get_user_model()

        user_model.objects.create_superuser(
            username="admin_user",
            password="techBix",
            first_name="Gertrude",
            last_name="Goodwin",
            email="gertrude.goodwin@company_1.com",
            avatar="accounts/avatars/gertrude_goodwin.jpg",
        )

        user_model.objects.create_user(
            username="normal_user",
            password="techBix",
            first_name="Lillian",
            last_name="Lamb",
            email="lillian.lamb@company_1.com",
            avatar="accounts/avatars/lillian_lamb.jpg",
        )
