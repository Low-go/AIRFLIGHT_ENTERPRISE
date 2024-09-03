from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=200)

#foreign keys will define the tree structured nature of the database

class Contact(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='contacts')
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    role = models.CharField(max_length=100)

class Fleet(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='fleets')
    name = models.CharField(max_length=200)

class Aircraft(models.Model):
    fleet = models.ForeignKey(Fleet, on_delete=models.CASCADE, related_name='aircraft')
    name = models.CharField(max_length=200)
    model = models.CharField(max_length=100)
    image = models.ImageField(upload_to='aircraft_images/', blank=True, null=True)

class Part(models.Model):
    aircraft = models.ForeignKey(Aircraft, on_delete=models.CASCADE, related_name='parts')
    name = models.CharField(max_length=200)


class Note(models.Model):
    aircraft = models.ForeignKey(Aircraft, on_delete=models.CASCADE, related_name='notes')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
