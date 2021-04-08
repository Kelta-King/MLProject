from django.db import models

# Create your models here.

class Disease(models.Model):
    diseaseName = models.CharField(unique = True, max_length = 500)
    modelPath = models.CharField(max_length = 1000, null = True)
    def __str__(self):
        return self.diseaseName


class Messages(models.Model):
    messageText = models.TextField()
    expectedReply = models.CharField(max_length = 2000, null = True)
    diseaseName = models.ForeignKey(Disease, on_delete = models.CASCADE)

    def __str__(self):
        return self.messageText

