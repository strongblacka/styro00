var LONG_MAX_DECIMALES_MONTO=2;
var LONG_MAX_DECIMALES_MONTO_COTIZACION=4;

/**
 * @param elem (jquery) input to format
 * @param decimals (boolean) if the element accepts decimals
 */
var generalBasePath = $('#generalBaseUrl').val();
function formatAmount(elem, decimals) {

    var value = elem.val()
    value = value.replace(/\./g, '')
    value = value.replace(/,/g, '.')
    value = value.replace(/[^0-9\.]+/g, '')

    var number = value.split('.')
    var formattedString = number[0].replace(/\B(?=(\d{3})+\b)/g, ".")

    if (decimals) {
        if (value.indexOf('.') > 0 && value.indexOf('.') == value.length - 1) {
            formattedString += ','
        } else if (number[1] !== undefined) {
            //formattedString += ',' + parseInt(number[1].substring(0, 2))
            formattedString += ',' + number[1].substring(0, 2)
        }
    }

    elem.val(formattedString)
}

/**
 * @param amount (number) amount to format
 * @param currency (Moneda)
 *
 * @returns string formatted amount
 */
function formatAmountString(amount, currencyCode) {
    var number = '' + amount
    number = number.split('.')
    var formattedString = number[0].replace(/\B(?=(\d{3})+\b)/g, ".")

    if (currencyCode != 6900) {
        if (number[1] !== undefined) {
            number[1] += '0'
            formattedString += ',' + parseInt(number[1].substring(0, 2))
        } else {
            formattedString += ',00'
        }
    }

    return formattedString
}

function centerIndicator(height) {
    $('#indicator').height(height)
}

function checkErrorStatus(data, msj){
	var url = appname + "session-invalid"
	
	if(data.status == 403){
		window.location.href = url;
	}else{
		ajaxErrorHandler(null, null, null, "alert-error","msgTitleError","msgDescripcionError");
	}
}

$("input.inp-pass").focus(function () {
    $(this).prop("type", "password");
});


/**********
 * 	funciones para favoritos
 */
$(".action .icon-favorites:not(.isFavourite)").on('click', function(event){
	event.stopImmediatePropagation();
	var display = $(".content-model-favorit").css('display');
	if(display == 'none'){
		$(".content-model-favorit").slideDown(400);
	}else{
		$(".content-model-favorit").slideUp(400);
	}
});
$(document).on('click',function(){
	if($('.content-model-favorit').is(':visible')){
		$(".content-model-favorit").slideUp(400);
	}
	$(".content-list-opFav").slideUp(300);
})
$('.content-model-favorit').on('click', function(event){
	event.stopImmediatePropagation();
})
function saveDetailHtml(){
	var htmlDetail = $('.info-transaction').html();
	var path = generalBasePath + 'favorito/save/data'; 
	$.ajax({
        url: path,
        method: 'POST',
        data: {'htmlData' : htmlDetail},
        success: function (data, status, xhr) {
            
        },
        error: function (xhr, status, error) {
        	checkErrorStatus(xhr);
        }
    })
}

function getDetailHtml(){
	var path = generalBasePath + 'favorito/get/data'; 
	$.ajax({
        url: path,
        method: 'GET',
        success: function (data, status, xhr) {
            $('.favorit-info .details-info').html(data);
        },
        error: function (xhr, status, error) {
        	checkErrorStatus(xhr);
        }
    })
}

function resetDetailHtml(){
	var path = generalBasePath + 'favorito/reset/data'; 
	$.ajax({
        url: path,
        method: 'GET',
        success: function (data, status, xhr) {
            
        },
        error: function (xhr, status, error) {
        	checkErrorStatus(xhr);
        }
    })
}

function deleteFavouriteFromList(element){
	
	var favouriteId = $(element).closest(".movement").attr('data-favourite-id');
	
	var path = generalBasePath + 'favorito/delete/list'; 
	
	$.ajax({
        url: path,
        data: {favoritoId : favouriteId},
        method: 'POST',
        success: function (data, status, xhr) {
            if(data == 'ok'){
            	$(element).parent().remove();    
            	setTimeout(function(){ 
            		if($('#favorite-list').children().length == 0 ){
                		$('#favorite-list').html('<div class="row no-movements"><div class="col-md-12 align-center">No hay Operaciones Favoritas guardadas para mostrar</div></div>')
                		$("#btn-save-fav").addClass('notActive');
                	}
            	}, 200);
            		
            }
        },
        error: function (xhr, status, error) {
        	checkErrorStatus(xhr);
        }
    })
}

$('.fav-delete').on('click', function(event){
	event.stopImmediatePropagation();
	deleteFavouriteFromList($(this));
});

$('.btn-save-favourit').on('click', function(){
	var nroOp = $('#nroOperacion').val();
	var path = generalBasePath + 'favorito/register';
	var name = $('#inp-name-fav').val();
	if(name != '' && (name.length < 50)){
		$('#inp-fav-emty-messaje').hide();
		$.ajax({
	        url: path,
	        method: 'POST',
	        data : {numberOperation : nroOp, name : name},
	        success: function (data) {
	        	if(data.estado == 'ACTIVO'){
	        		$('.favorit-info .details-info').slideUp(300);
	                $('.favorit-info .form-favorite').slideUp();
	                $('.favorit-info .favouriteMessageConfirm').slideDown(300);
	        	}else{
	        		//TODO
	        	}
	        },
	        error: function (xhr, status, error) {
	        	checkErrorStatus(xhr);
	        }
	    })
	}else{
		if(name == ''){
			$('#inp-fav-emty-messaje').html('Debe asignar un nombre a la operación');
			$('#inp-fav-emty-messaje').show();
		}else{
			$('#inp-fav-emty-messaje').html('El nombre es muy extenso.');
			$('#inp-fav-emty-messaje').show();
		}
		
	}
})

$(".content-start span").on('click', function (event) {
	event.stopImmediatePropagation();
            if ($(".content-list-opFav").css('display') == 'none') {
                $(".content-list-opFav").slideDown(300);
            } else {
                $(".content-list-opFav").slideUp(300);
            }
        })

        
$('.item-fav-list').on('click', function (event) {
    event.stopPropagation();
    var path = generalBasePath + 'favorito/type/validation';
    var fields = {
        idFavourite: $(this).attr('data-favourite-id'),
        type: $(this).attr('data-type')
    }
    var $form = $('<form>', {
        action: path,
        method: 'post'
    }).append(
            $.map(fields, function (val, key) {
                return $('<input>').attr({
                    type: "hidden",
                    name: key,
                    value: val
                })
            })
    )
    $form.appendTo('body').submit();
});



/************************/

function downloadFile(blob, fileName, type){

	var typeAplication;
	
	switch(type) {
	    case 'txt':
	    	typeAplication = "text/plain";
	        break;
	    case 'xls':
	    	typeAplication = "application/vnd.ms-excel";
	        break;
	    case 'pdf':
	    	typeAplication = "application/pdf";
	        break;
	}
	
    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;
    var options = {
			type: typeAplication
		};
    if (isIE) {
        // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
        //window.navigator.msSaveBlob(blob, filename);
    	var file = new Blob([blob], options);
        window.navigator.msSaveBlob(file, fileName);
        //window.navigator.msSaveOrOpenBlob(file, fileName);
    } else{
    	var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        //link.target = '_blank'
        document.body.appendChild(link);
        link.click();
    }  
}

function printFile(blob, fileName, type){

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;
    var options = {
			type: "application/pdf"
		};
    if (isIE) {
        // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
        //window.navigator.msSaveBlob(blob, filename);
    	var file = new Blob([blob], options);
        //window.navigator.msSaveBlob(file, fileName);
        window.navigator.msSaveOrOpenBlob(file, fileName);
    }else{
    	var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.open = fileName;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
    }  
}

function getErrorAjax(msj){
	$('html, body').animate({scrollTop: 0}, 800);

   
    var msg = "";
    if (msj !== undefined) {
        msg = msj;
    } else {
        msg = ERROR_UNEXPECTED
    }

	$("#"+idTitleError).text("¡Error!");
	$("#"+idDescError).text(msg);
    
	setTimeout(function() {
		$("#"+idError).fadeIn(1500);
    },0);
	setTimeout(function() {
        $("#"+idError).fadeOut(1500);
		},8000);
	stopSpinner()
}

$('input.numberException').on('keyup', function(){
    var val = $(this).val();
    var value = val.replace(/[^0-9]+/g, '');
    $(this).val(value);
})

function maxLength(){
	$('.numeroLiquidacion').on("input", function (e) {
			var num = $(this).val();
			
			if ($(this).hasClass("numeroLiquidacion")) {
				num = num.substring(0,12);
			}
			$(this).val(num);
	});
}

/*
 * FORMATEADOR DE ENTEROS Y DECIMALES DE ACUERDO A LA MONEDA
 * Para utilizar esta función, el jsp debe tener un input hidden con el
 * id="codigo-moneda-local" value="{bean.moneda.codigo}"
 * y el input a formatear debe tener una clase llamada importe
 */
function formatInput(){
	$('.importe').on("input", function (e) {
		var num = $(this).val();
		

		
		var codMoneda=$("#codigo-moneda-local").val();
		codMoneda = $.trim(codMoneda);
		var moneda=getMonedaDetails(codMoneda);
		var inputPattern=moneda.inputPattern;
		var formatPattern=moneda.formatPattern;
		var numCleaned=num.replace(inputPattern, "");
		if(codMoneda==="GS"){
			var numFormated=formatMontoDecimal(numCleaned);
		}else{
			var numFormated=formatMontoDecimalCotizacion(numCleaned);
		}
	    $(this).val(numFormated);
	});
}


function getMonedaDetails(codMoneda){
	var moneda= new Object();
	switch (codMoneda) {
	case 'GS':
		moneda.descripcion='Guaraníes';
		moneda.formato="0,0";
		moneda.formatPattern=/\D/g;
		moneda.inputPattern=/\D/g;
		break;
	case 'USD':
		moneda.descripcion='Dólares';
		moneda.formato="0,0.00";
		moneda.formatPattern=/^[0-9]+([,][0-9]+)?$/g;
		moneda.inputPattern=/[^0-9,]/g;
		break;
	case 'EUR':
		moneda.descripcion='Euros';
		moneda.formato="0,0.00";
		moneda.formatPattern=/^[0-9]+([,][0-9]+)?$/g;
		moneda.inputPattern=/[^0-9,]/g;
		break;
	case 'BRL':
		moneda.descripcion='REALES';
		moneda.formato="0,0.00";
		moneda.formatPattern=/^[0-9]+([,][0-9]+)?$/g;
		moneda.inputPattern=/[^0-9,]/g;
		break;
	case 'ARS':
		moneda.descripcion='PESO ARGENTINO';
		moneda.formato="0,0.00";
		moneda.formatPattern=/^[0-9]+([,][0-9]+)?$/g;
		moneda.inputPattern=/[^0-9,]/g;
		break;
	default:
		moneda.descripcion='Moneda no registrada';
		moneda.formato="0,0.00";
		moneda.formatPattern=/^[0-9]+([,][0-9]+)?$/g;
		moneda.inputPattern=/[^0-9,]/g;
		break;
	}
	return moneda;
}

function format(input)
{
	var num = input.replace(/\./g,'');
	if(!isNaN(num)){
		num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
		num = num.split('').reverse().join('').replace(/^[\.]/,'');
		input = num;
	}else{ 		
		input = "-1";
	}
	return input;
}

function formatMontoDecimal(num){
	var separador=num.split(",");
	var decimal;
	var entero;
	if(separador.length>2){
		entero=separador[0];
		decimal=separador[1];
		entero=format(entero);
		num=entero+","+decimal;
	}else if(separador.length===2){
		entero=separador[0];
		decimal=separador[1];
		if(decimal.length>0 && decimal.length<=LONG_MAX_DECIMALES_MONTO){
			entero=format(entero);
			num=entero+","+decimal;
		}else if(decimal.length>LONG_MAX_DECIMALES_MONTO){
			decimal=decimal.slice(0,-1);
			entero=format(entero);
			num=entero+","+decimal;
		}if(decimal.length===0){
			num=format(entero);
			num=num+",";
		}	
	}else{
		num=format(num);
	}
	return num;
}


function formatMontoDecimalCotizacion(num){
	var separador=num.split(",");
	var decimal;
	var entero;
	if(separador.length>2){
		entero=separador[0];
		decimal=separador[1];
		entero=format(entero);
		num=entero+","+decimal;
	}else if(separador.length===2){
		entero=separador[0];
		decimal=separador[1];
		if(decimal.length>0 && decimal.length<=LONG_MAX_DECIMALES_MONTO_COTIZACION){
			entero=format(entero);
			num=entero+","+decimal;
		}else if(decimal.length>LONG_MAX_DECIMALES_MONTO_COTIZACION){
			decimal=decimal.slice(0,-1);
			entero=format(entero);
			num=entero+","+decimal;
		}if(decimal.length===0){
			num=format(entero);
			num=num+",";
		}	
	}else{
		num=format(num);
	}
	return num;
}

function validacionMail(){
	let msg = '';
	if(validarEmail($('#password-recovery-mail').val())){
		msg = "Direccion de E-mail no corresponde al formato nombre@dominio.extension";
	}
	$('#password-recovery-mail-error').text(msg);
}

 
