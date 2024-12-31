from django.db import models

# Create your models here.

class Company(models.Model):
    company_name = models.CharField(max_length = 70)
    phone_number = models.CharField(max_length=19, blank=True) # optional phone number
    notes = models.TextField(blank=True, null=True)


class Contact(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='contacts')
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    role = models.CharField(max_length=30)
    email = models.EmailField(max_length = 254)
    notes = models.TextField(blank=True, null=True)

class Fleet(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='fleets')
    model = models.CharField(max_length=50)
    fabrication_date = models.DateField(null=True, blank=True) # optional
    notes = models.TextField(blank=True, null=True)

# Most fields are optional. employer can try to get as much info as he 
# wants but it is not required
class Part(models.Model):
    fleet = models.ForeignKey(Fleet, on_delete=models.CASCADE, related_name='parts')
    name = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    part_number_identifier = models.CharField(max_length=50, blank=True, null=True)
    expected_lifespan = models.IntegerField(blank=True, null=True) # need to get back to this one and adjust it
    manufacturer = models.CharField(max_length=100, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
