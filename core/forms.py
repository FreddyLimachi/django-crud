from django import forms
from .models import Product

class ProductForm(forms.Form):
    name = forms.CharField(label=False, required=True, widget=forms.TextInput(attrs={'placeholder': 'Producto'}))
    amount = forms.IntegerField(label=False, required=True, widget=forms.TextInput(attrs={'placeholder': 'Cantidad'}))
    size = forms.CharField(label=False, required=True, widget=forms.TextInput(attrs={'placeholder': 'Talla'}))
    price = forms.CharField(label=False, required=True, widget=forms.TextInput(attrs={'placeholder': 'Precio'}))


class ProductFormEdit(forms.ModelForm):
    class Meta:
        model = Product
        
        fields = ['name','amount','size','price']

        labels = {
            'name': False,
            'amount': False,
            'size': False,
            'price': False
        }

        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Producto', 'id': 'name_edit'}),
            'amount': forms.NumberInput(attrs={'placeholder': 'Cantidad', 'id': 'amount_edit'}),
            'size': forms.TextInput(attrs={'placeholder': 'Talla', 'id': 'size_edit'}),
            'price': forms.TextInput(attrs={'placeholder': 'price', 'id': 'price_edit'}),
        }

class SearchForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name']
        labels = {
            'name': False,
        }

        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Buscar por nombre', 'id': 'search', 'type': 'search'}),
        }