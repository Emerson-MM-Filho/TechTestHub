# companies serializers
from rest_framework import serializers

from companies.models import Company, Position


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ("id", "name")


class PositionSerializerWithCompany(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ("id", "name", "company")


class CompanySerializer(serializers.ModelSerializer):
    positions = serializers.SerializerMethodField()

    class Meta:
        model = Company
        exclude = ("user",)

    def get_positions(self, obj):
        return PositionSerializer(obj.positions.all(), many=True).data
