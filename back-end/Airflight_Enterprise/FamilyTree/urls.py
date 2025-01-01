from django.urls import path, include
from rest_framework_nested.routers import DefaultRouter, NestedDefaultRouter
from .views import CompanyViewSet, FleetViewSet, ContactViewSet, PartViewSet

# Main router for companies
router = DefaultRouter()
router.register(r'companies', CompanyViewSet, basename='company')

# Nested router for companies -> contacts and companies -> fleets
companies_router = NestedDefaultRouter(router, r'companies', lookup='company')
companies_router.register(r'contacts', ContactViewSet, basename='company-contacts')
companies_router.register(r'fleets', FleetViewSet, basename='company-fleets')

# Nested router for fleets -> parts
fleets_router = NestedDefaultRouter(companies_router, r'fleets', lookup='fleet')
fleets_router.register(r'parts', PartViewSet, basename='fleet-parts')

# Final URL patterns
urlpatterns = [
    path('', include(router.urls)),
    path('', include(companies_router.urls)),
    path('', include(fleets_router.urls)),
]
