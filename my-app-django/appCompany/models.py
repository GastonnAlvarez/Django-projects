from django.db import models

class Company(models.Model):
    name=models.CharField(max_length=50)
    website = models.URLField(max_length=100)
    foundation = models.PositiveSmallIntegerField()

    def __str__(self):
        texto = '{0} {1} {2}'
        return texto.format(self.name,self.website,self.foundation)
