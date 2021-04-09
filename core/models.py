from django.db import models

# Create your models here.
class Product(models.Model):

    name = models.CharField(max_length=200, verbose_name="Nombre")
    amount = models.IntegerField(verbose_name="Cantidad")
    size = models.CharField(max_length=20, verbose_name = "Tallas")
    price = models.FloatField(verbose_name = "Precio")
    created = models.DateTimeField(auto_now_add = True, verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now = True, verbose_name="Fecha de edición")

    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'
        ordering = ['-created']
    
    def __str__(self):
        return self.name
