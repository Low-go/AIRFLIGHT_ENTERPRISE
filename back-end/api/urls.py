from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CompanyViewSet, ContactViewSet, FleetViewSet, AircraftViewSet, PartViewSet, NoteViewSet

router = DefaultRouter()
router.register(r'companies', CompanyViewSet)
router.register(r'contacts', ContactViewSet)
router.register(r'fleets', FleetViewSet)
router.register(r'aircraft', AircraftViewSet)
router.register(r'parts', PartViewSet)
router.register(r'notes', NoteViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]