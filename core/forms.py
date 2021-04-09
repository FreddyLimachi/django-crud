from django import forms

class ProductForm(forms.Form):
    name = forms.CharField(label=False, required=True, widget=forms.TextInput(attrs={'placeholder': 'Producto'}))
    amount = forms.IntegerField(label=False, required=True, widget=forms.TextInput(attrs={'placeholder': 'Cantidad'}))
    size = forms.CharField(label=False, required=True, widget=forms.TextInput(attrs={'placeholder': 'Talla'}))
    price = forms.CharField(label=False, required=True, widget=forms.TextInput(attrs={'placeholder': 'Precio'}))
