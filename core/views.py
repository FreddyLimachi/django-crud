from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Product
from .forms import ProductForm, ProductFormEdit, SearchForm

# Create your views here.
def home(request):
    product_form = ProductForm()
    formEdit = ProductFormEdit()
    searchForm = SearchForm()

    return render(request, 'home.html', {
        'form': product_form, 
        'formEdit': formEdit,
        'searchForm': searchForm
    })


def add_product(request):
    if request.method == "POST":

        add_product, created = Product.objects.get_or_create(
            name = request.POST.get('name'),
            amount = request.POST.get('amount'),
            size = request.POST.get('size'),
            price = request.POST.get('price'),
        )

        return JsonResponse({'msg': 'El producto ha sido registrado satisfactoriamente'})
    
    else: return JsonResponse({'msg': 'Error 405, metodo no permitido'})


def get_products(request):

    products = Product.objects.all()

    payload, content = [], {}
    for result in products:
        
        content = {'product_id': result.id, 'name': result.name, 'amount': result.amount,
                'size': result.size, 'price': result.price}
        payload.append(content)
        content = {}


    return JsonResponse(payload, safe=False)

def get_product(request):

    product_id = request.POST.get('product_id')

    product = Product.objects.get(id=product_id)

    payload = {
        'name': product.name,
        'amount': product.amount,
        'size': product.size,
        'price': product.price
    }
    
    return JsonResponse(payload)


def search_product(request):

    name = request.POST.get('name')
   
    products = Product.objects.filter(name__icontains = name)

    payload, content = [], {}
    for result in products:
        
        content = {'product_id': result.id, 'name': result.name, 'amount': result.amount,
                'size': result.size, 'price': result.price}
        payload.append(content)
        content = {}

    return JsonResponse(payload, safe=False)

def update_product(request):
    if request.method == "POST":

        # Aun no funciona esta funcion
        product_id = request.POST.get('product_id')
        product = get_object_or_404(Product, id=product_id)

        formulario = ProductFormEdit(request.POST, instance = product)
        formulario.save()

        return JsonResponse({'msg': 'El producto ha sido actualizado satisfactoriamente'})

    else: return JsonResponse({'msg': 'Error 405, metodo no permitido'})


def delete_product(request):

    if request.method == 'POST':

        product_id = request.POST.get('product_id')
        product = Product.objects.get(id=product_id)
        product.delete()

        return JsonResponse({'msg': 'Registro eliminado satisfactoriamente'})
    
    else: return JsonResponse({'msg': 'Error 405, metodo no permitido'})