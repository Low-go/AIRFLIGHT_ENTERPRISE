
from rest_framework import viewset
from company_tree.models import Company, Contact, Fleet, Aircraft, Part, Note
from .serializers import CompanySerializer, ContactSerializer, FleetSerializer, AircraftSerializer, PartSerializer, NoteSerializer

class CompanyViewSet(viewset.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class ContactViewset(viewset.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class FleetViewset(viewset.ModelViewSet):
    queryset = Fleet.objects.all()
    serializer_class = FleetSerializer

class AirCraftViewset(viewset.ModelViewSet):
    queryset = Aircraft.objects.all()
    serializer_class = AircraftSerializer

class PartViewset(viewset.ModelViewSet):
    queryset = Part.objects.all()
    serializer_class = PartSerializer

class NoteViewset(viewset.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
