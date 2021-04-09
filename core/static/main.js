$(document).ready(() => {
    // variables
    let product_id, row;
    // Llenar tabla de productos
    function product_table () {
        $.ajax({
            url: 'get_products', 
            method: 'GET',
            success: (response) => {
                let template = '';
                response.forEach(record => {                
                    template += `
                        <tr>
                            <td>${record.product_id}</td>
                            <td>${record.name}</td>
                            <td>${record.amount}</td>
                            <td>${record.size}</td>
                            <td>${record.price}</td>
                            <td>
                                <div class='text-center'>
                                <div class='btn-group'>
                                <button class='btn btn-success btn-sm edit-product'>Editar</button>
                                <button class='btn btn-danger btn-sm delete-product'>Eliminar</button>
                                </div>
                                </div>
                            </td>
                        </tr>
                    `
                }); $('#product_table').html(template);
            }
        });
    }; product_table();   

    //Buscar producto 
    $('#search').keyup(() => {
        let search = $('#search').val();
        $.ajax({
            url: 'search_product',
            method: 'POST',
            data: {
                name: search
            },
            success: (response) => {
                let template = '';
                let count = 1;
                response.forEach(record => {                    
                    template += `
                        <tr>
                            <td class="column0">${record.id}</td>
                            <td>
                                <div class='text-center'>
                                    ${ count }
                                </div>
                            </td>
                            <td class="edit-status">${record.name}</td>
                            <td>${record.ip_adress}</td>
                            <td>
                                <div class='text-center'>
                                <div class='btn-group'>
                                <button class='btn btn-success btn-sm edit-product'>Editar</button>
                                <button class='btn btn-danger btn-sm delete-product'>Eliminar</button>
                                </div>
                                </div>
                            </td>
                        </tr>
                    `
                    count+=1;
                });
                if (count==1){
                    template = `
                        <tr>
                            <td class="column0">0</td>
                            <td><div class='text-center'>0</div></td>
                            <td>Sin registro</td>
                            <td>Sin registro</td>
                            <td>Sin acciones</td>
                        </tr>
                    `
                }$('#product_table').html(template);
            }
        })
    })


    // Enviar datos del formulario de productos al servidor
    $('#product_form').on('submit', function(e){                         
        e.preventDefault();
        name = $.trim($('#id_name').val());    
        amount = $.trim($('#id_amount').val());
        size = $.trim($('#id_size').val());    
        price = $.trim($('#id_price').val());    
                       
        $.ajax({
            url: 'add_product',
            method: "POST",
            data: {
                name: name,
                amount: amount,
                size: size,
                price: price
            },    
            success: (response) => {
                product_table(); 
                alert(response.msg);
            }
        });	 
    });


    // Editar producto
    $(document).on("click", ".edit-product", function(){		        
        row = $(this).closest("tr");	        
        product_id = parseInt(row.find('td:eq(0)').text()); //capturo el ID
        $.ajax({
            url: 'get_product',
            method: 'POST',
            data: {product_id: product_id},
            success: (response) => {
                $("#name_edit").val(response.name);
                $("#amount_edit").val(response.amount);
                $("#size_edit").val(response.size);
                $("#price_edit").val(response.price);        
            }            
        })   		            
        $(".modal-header").css("color", "white" );
        $(".modal-title").text("Editar producto");		
        $('#product_modal').modal('show');		   
    });



    // Enviar datos para actualizar un producto
    $('#update_form').submit(function(e){                         
        e.preventDefault();
        name = $.trim($('#name_edit').val());    
        amount = $.trim($('#amount_edit').val());
        size = $.trim($('#size_edit').val());    
        price = $.trim($('#price_edit').val());    
                       
        $.ajax({
            url: 'update_product',
            method: "POST",  
            data:  {
                product_id: product_id,
                name: name,
                amount: amount,
                size: size,
                price: price
            },    
            success: (response) => {
                product_table();
                alert(response.msg);
            }
        });	
        
        $('#product_modal').modal('hide');   
    });

    // Eliminar producto
    $(document).on("click", ".delete-product", function(){
        row = $(this).closest("tr"); 
        product_id = row.find('td:eq(0)').text();	          
        name = row.find('td:eq(1)').text();	
        let request = confirm("¿Está seguro de eliminar el producto "+name+"?");                
        if (request) {            
            $.ajax({
                url: "delete_product",
                method: "POST",  
                data:  {product_id: product_id},    
                success: (response) => {
                    product_table();
                    alert(response.msg);                  
                }
            });	
        }
    });


    // codigo para el csrf token de django
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

});