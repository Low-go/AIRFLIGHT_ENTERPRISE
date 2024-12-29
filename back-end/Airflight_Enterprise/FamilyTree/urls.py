from django.urls import path, include
from rest_framework import routers
from .views import CompanyViewSet, FleetViewSet, ContactViewSet, PartViewSet

# router definition
router = routers.DefaultRouter()
router.register(r'companies', CompanyViewSet)
router.register(r'fleets', FleetViewSet)
router.register(r'contacts', ContactViewSet)
router.register(r'parts', PartViewSet)

urlpatterns = [
    path('', include(router.urls)),
]