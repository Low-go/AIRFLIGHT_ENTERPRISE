from django.shortcuts import render
from rest_framework import viewsets, mixins
from rest_framework.viewsets import GenericViewSet
from .serializers import CompanySerializer, FleetSerializer, ContactSerializer, PartSerializer
from .models import Company, Fleet, Contact, Part

# Disallow delete actions
class CompanyViewSet(mixins.CreateModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.ListModelMixin,
                     GenericViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class FleetViewSet(viewsets.ModelViewSet):
    serializer_class = FleetSerializer

    def get_queryset(self):
        company_id = self.kwargs.get('company_pk')
        return Fleet.objects.filter(company_id=company_id)

class ContactViewSet(viewsets.ModelViewSet):
    serializer_class = ContactSerializer

    def get_queryset(self):
        company_id = self.kwargs.get('company_pk')
        return Contact.objects.filter(company_id=company_id)

class PartViewSet(viewsets.ModelViewSet):
    serializer_class = PartSerializer

    def get_queryset(self):
        fleet_id = self.kwargs.get('fleet_pk')
        return Part.objects.filter(fleet_id=fleet_id)
