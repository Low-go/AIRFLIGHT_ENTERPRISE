from rest_framework import serializers
from .models import Company, Contact, Fleet, Part



class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class FleetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fleet
        fields =  '__all__'

class PartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Part
        fields = '__all__'
