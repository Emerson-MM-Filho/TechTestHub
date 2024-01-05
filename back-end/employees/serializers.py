# companies serializers
from rest_framework import serializers

from companies.serializers import PositionSerializer
from employees.models import Employee, Vacation


class EmployeeSerializer(serializers.ModelSerializer):
    position = PositionSerializer()

    class Meta:
        model = Employee
        exclude = ("company",)


class EmployeeCreateUpdateSerializer(serializers.ModelSerializer):
    position = serializers.StringRelatedField()

    class Meta:
        model = Employee
        exclude = ("company",)

    def is_valid(self, *, raise_exception=False):
        print(self.initial_data)
        super().is_valid(raise_exception=raise_exception)

        print(self._validated_data)

    def update(self, instance, validated_data):
        print(validated_data)
        return super().update(instance, validated_data)

    def create(self, validated_data):
        return super().create(validated_data)


class VacationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacation
        fields = "__all__"
