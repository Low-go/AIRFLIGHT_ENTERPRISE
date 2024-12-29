from django.shortcuts import render
from rest_framework import viewsets

# import local data
from .serializers import CompanySerializer, FleetSerializer, ContactSerializer, PartSerializer
from .models import Company, Fleet, Contact, Part

# ViewSets for API endpoint.

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class FleetViewSet(viewsets.ModelViewSet):
    queryset = Fleet.objects.all()
    serializer_class = FleetSerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class PartViewSet(viewsets.ModelViewSet):
    queryset = Part.objects.all()
    serializer_class = PartSerializer

