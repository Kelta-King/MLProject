from django.db import models

# Create your models here.

class Disease(models.Model):
    diseaseName = models.CharField(unique = True, max_length = 500)
    def __str__(self):
        return self.diseaseName


class Messages(models.Model):
    messageText = models.TextField()
    diseaseName = models.ForeignKey(Disease, on_delete = models.CASCADE)

