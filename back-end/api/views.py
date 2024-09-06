from django.shortcuts import render
from rest_framework import viewset
from company_tree.models import Company, Contact, Fleet, Aircraft, Part, Note
from .serializers import CompanySerializer, ContactSerializer, FleetSerializer, AircraftSerializer, PartSerializer, NoteSerializer
