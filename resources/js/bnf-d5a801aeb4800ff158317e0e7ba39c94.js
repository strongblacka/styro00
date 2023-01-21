var ERROR_UNEXPECTED = "Ocurrió un error inesperado. Inténtelo de nuevo en unos minutos.";
var ERROR_FORBIDDEN = "Forbidden";
var ERROR_FORBIDDEN_CODE = "403";
var EXITO = "OK";
var ERROR = "ERROR";
var MIN_HEIGHT_BOX = 560;

//función para cerrar el error génerico dentro de una página
function closeGenericError() {

	setTimeout(function() {
        $("#alert-error").fadeOut(0);
		},0);
	setTimeout(function() {
        $("#alert-error-generic").fadeOut(0);
		},0);
	setTimeout(function() {
        $("#alert-success").fadeOut(0);
		},0);
	setTimeout(function() {
        $("#alert-info").fadeOut(0);
		},0);

}

//error genérico ajax.
function ajaxErrorHandler(errorData, status, error, idError, idTitleError, idDescError, showAsError) {
	
	if (showAsError == null) {
		showAsError = true;
	}
	
    $('html, body').animate({scrollTop: 0}, 800);

    if (error == ERROR_FORBIDDEN || error == ERROR_FORBIDDEN_CODE) {	// forbidden
        window.location = appname + "/";
    }
    var msg = "";
    if (errorData !== undefined) {
        if (errorData.useApiMessage) {
            msg = errorData.message;
        } else {
            msg = ERROR_UNEXPECTED;
        }
    } else {
        msg = ERROR_UNEXPECTED
    }

    if (showAsError) {
    	$("#"+idTitleError).text("¡Error!");
    }
	
	$("#"+idDescError).text(msg);
    
	setTimeout(function() {
		$("#"+idError).fadeIn(1500);
    },0);
	setTimeout(function() {
        $("#"+idError).fadeOut(1500);
		},8000);
	stopSpinner()
}

function ajaxSuccessHandler(Info, idInfo,idTitleInfo, idDescInfo) {
    $('html, body').animate({scrollTop: 0}, 900);
	    
    
	$("#"+idTitleInfo).text("¡Éxito!");
	$("#"+idDescInfo).text(Info);
    
	setTimeout(function() {
		$("#"+idInfo).fadeIn(1500);
    },0);
	setTimeout(function() {
        $("#"+idInfo).fadeOut(1500);
		},8000);
}



function inicializarSelectPickerCardPayment(){
	$('.selectpicker-debit').selectpicker({
		size : 6,
		style : 'boton-select',
		iconBase : 'icon',
		tickIcon : 'icon',
		title:"",
		dropupAuto: false

	});
	
	$('.selectpicker-card').selectpicker({
        size : 6,
        style : 'boton-select',
        iconBase : 'icon',
        tickIcon : 'icon',
        dropupAuto: false

    });
	
	//mostramos el segundo div que esta dentro del data-content, para asi al 
	//seleccionar mostrar el primer div que tiene otro diseño, y al desplegar
	//mostrar otro diseño
	//$('ul>li>a>div.row.show-sub-select').removeClass('hidden');
	
	$('.selectpicker-credit').on('changed.bs.select', function (e) {
		$('.btn.dropdown-toggle.bs-placeholder.boton-select').attr('title',"")
	});
	
	$('.selectpicker-card').on('changed.bs.select', function (e) {
		$('.btn.dropdown-toggle.bs-placeholder.boton-select').attr('title',"")
	});
	
	$('.dropdown-select button').mouseover(function() {
		$('.dropdown-select button').attr('title',"")
		
	});
	
}

function inicializarSelectPickerLoanPayment(){
	$('.selectpicker-debit').selectpicker({
		size : 6,
		style : 'boton-select',
		iconBase : 'icon',
		tickIcon : 'icon',
		title:"",
		dropupAuto: false

	});
	
	$('.selectpicker-loan').selectpicker({
        size : 6,
        style : 'boton-select',
        iconBase : 'icon',
        tickIcon : 'icon',
        dropupAuto: false

    });
	
	//mostramos el segundo div que esta dentro del data-content, para asi al 
	//seleccionar mostrar el primer div que tiene otro diseño, y al desplegar
	//mostrar otro diseño
	
	$('.selectpicker-debit').on('changed.bs.select', function (e) {
		$('.btn.dropdown-toggle.bs-placeholder.boton-select').attr('title',"")
	});
	
	$('.selectpicker-loan').on('changed.bs.select', function (e) {
		$('.btn.dropdown-toggle.bs-placeholder.boton-select').attr('title',"")
	});
	
	$('.dropdown-select button').mouseover(function() {
		$('.dropdown-select button').attr('title',"")
		
	});
	
}

function inicializarSelectPicker(){
	$('.selectpicker-debit').selectpicker({
		size : 6,
		style : 'boton-select',
		iconBase : 'icon',
		tickIcon : 'icon',
		title:"",
		dropupAuto: false,
		noneSelectedText: 'No posee cuentas debitables'

	});
	
	$('.selectpicker-credit').selectpicker({
        size : 6,
        style : 'boton-select',
        iconBase : 'icon',
        tickIcon : 'icon',
        dropupAuto: false,
        noneSelectedText: 'No posee cuentas acreditables'

    });
	
	//mostramos el segundo div que esta dentro del data-content, para asi al 
	//seleccionar mostrar el primer div que tiene otro diseño, y al desplegar
	//mostrar otro diseño
	$('ul>li>a>div.row.show-sub-select').removeClass('hidden');
	
	
	$('.selectpicker-credit').on('changed.bs.select', function (e) {
		$('.btn.dropdown-toggle.bs-placeholder.boton-select').attr('title',"")
	});
	
//	Select reason bankn, others
	$('#reason').selectpicker({
        size : 6,
        style : 'boton-select',
        dropupAuto: false,
        

    });
	$('#documentType').selectpicker({
        size : 6,
        style : 'boton-select',
        dropupAuto: false,
        

    });
	
	$('#entity').selectpicker({
        size : 6,
        style : 'boton-select',
        dropupAuto: false,
        

    });
	
	resetSelecPicket('debitAccountHash','creditAccountHash');
	
	$('.selectpicker-debit').on('changed.bs.select', function (e) {
		resetSelecPicket('debitAccountHash','creditAccountHash');
		$('.dropdown-select button').attr('title',"")
	});
	
	$('.dropdown-select button').mouseover(function() {
		$('.dropdown-select button').attr('title',"")
		
	});
}

function resetSelecPicket(IdClonar, IdDestino){
	var $options;
	$options = $("#"+IdClonar+" > option:not(:selected)").clone();
	
	$('#'+IdDestino+' option').remove();
	$('#'+IdDestino).append($options);
	
	if (IdDestino.localeCompare('creditAccountHash') == 0) {
		$('#'+IdDestino+" option[data-show='false'").hide();
	}
	
	$('#'+IdDestino).selectpicker('refresh');
	

	
	$('ul>li>a>div.row.show-sub-select').removeClass('hidden');

	$(".select-debit").find("li[data-original-index]").show();
	$(".select-debit").find("li[data-original-index].selected").hide();
	$(".select-credit").find("li[data-original-index]").show();
	$(".select-credit").find("li[data-original-index].selected").hide();
}


function sendMail(nroTransaccion){
	
	stopSpinner();
	loadSpinner();
	
	$(".icon-option-MAIL").closest("a").addClass("disabled");
	$('#spinner_overlay').removeClass('hidden');
		
	
	var transcaccionToken = $('#transaccionToken').val();
	var tipoTransaccion = $('#tipoTransaccion').val();
	

	
	$.ajax({
        type: "POST",
        url: appname +"/send-mail",
		async: true,
        data: { 
			tx_Token: transcaccionToken,
			tipo_transaccion:tipoTransaccion
		}
    }).done(function (data) {
    	var respuesta = data;
    	if(respuesta.status.toUpperCase() == EXITO){
    		var info = "Email enviado correctamente.";
    		
    		$(".icon-option-MAIL").closest("a").removeClass("disabled");
    		stopSpinner();
    		
    		ajaxSuccessHandler(info, "alert-success","msgTitleSuccess", "msgDescripcionSuccess")
    		
    	}else if(respuesta.status.toUpperCase() == ERROR){
    		$("#msgTitleError").text("¡Error!");
    		$("#msgDescripcionError").text("No se pudo enviar el email, inténtelo de nuevo.");
    		
    		$(".icon-option-MAIL").closest("a").removeClass("disabled");
    		stopSpinner();
    		
    		setTimeout(function() {
    			$("#alert-error").fadeIn(1500);
    	    },0);
    		setTimeout(function() {
    	        $("#alert-error").fadeOut(1500);
    			},3000);
    	}
    	
    	
    	
    	
    }).fail(function (request, status, error) {
    	$('#spinner_overlay').addClass('hidden');
        var errorData = request.responseJSON;
        
        $(".icon-option-MAIL").closest("a").removeClass("disabled");
        stopSpinner();
        
        ajaxErrorHandler(errorData, status, request.status, "alert-error","msgTitleError","msgDescripcionError");

        
        
    });
	
	return false;
	
}

function loadSpinner(){
	 $('.loader-inner').loaders();
	 $('.loader').show();
}

function stopSpinner(){
	 $('.loader').hide();
}

function inicializarSelectPickerPayment(){
	$('.selectpicker-debit').selectpicker({
		size : 6,
		style : 'boton-select',
		iconBase : 'icon',
		tickIcon : 'icon',
		title:"",
		dropupAuto: false

	});
	
	$('.selectpicker-debit').on('changed.bs.select', function (e) {
		resetSelecPicket('debitAccountHash','creditAccountHash');
		$('.dropdown-select button').attr('title',"")
				
	});
	
	$('.dropdown-select button').mouseover(function() {
		$('.dropdown-select button').attr('title',"")
		
	});
}


function changeDebitOption() {		
	$('ul>li>a>div.row.show-sub-select').removeClass('hidden');
	$(document).find("[title='Nothing selected']>span:first").text("No posee tarjetas");
}

//window.print generico si no cuenta con un reporte en pdf
function winPrint() {
    window.print();
}


function clearErrorStep(){
	$('#errorSteps').remove();
}

function redimensionarCajaLateral(){
	var sizeHeight = $("#content_a").height()-$("#content_b").height();
	$("#tab_b").height(sizeHeight);
	
}


function redimensionarCajasLaterales(divLeft, divRight){
	
	var heightRightActual = $("#"+divRight).height();
	var heightLeftActual = $("#"+divLeft).height();
	
	//si el de la derecha es mayor tomamos como referencia ese box para hacer crecer el otro
	// sin tomamos el de la izquierda
	if(heightRightActual > heightLeftActual){
		$("#"+divLeft).height(heightRightActual);
	}else if(heightLeftActual > heightRightActual){
		 $("#"+divRight).height(heightLeftActual);
	}
	
	
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkNuevaBancaCookie() {
    var nuevaBanca = getCookie("nuevaBanca");
    if (nuevaBanca != "") {
        
    } else {
    	$("#bienvenidaModal").modal("show");
    	setCookie("nuevaBanca", "true", 365);
    }
}


function checkPopupCookie(id) {
    var nuevaBanca = getCookie("popup_" + id);
    if (nuevaBanca != "") {
        
    } else {
    	$("#notificacionesModal").modal("show");
    	setCookie("popup_" + id, "true", 365);
    }
}


function redirectToLoginTimer() {
	setTimeout(function () {
	       window.location.href = appname + "/login";
	    }, 5000);
}

function getMovementDetail(idMovimiento, indexMov) {
	var collapseBlockSelector = $('#collapseDetails-'+indexMov);
	var detailsBlockSelector = $('#collapseDetails-'+indexMov+' .mv-detail');
	var iconSelector = $(".mv-detail-icon-"+indexMov);
	if(collapseBlockSelector.hasClass("in")){
		iconSelector.removeClass("fa-chevron-up").addClass("fa-chevron-down");
		return false;
	} else if(detailsBlockSelector.length == 1) {
		iconSelector.removeClass("fa-chevron-down").addClass("fa-chevron-up");
		return false;
	}
	loadSpinner();
	$.ajax({
        type: "GET",
        url: appname +"/accounts/movement/"+idMovimiento+"/details",
        data: { }
    }).done(function (data) {
    	$('#collapseDetails-'+indexMov).html(data);
    	iconSelector.removeClass("fa-chevron-down").addClass("fa-chevron-up");
    	stopSpinner();
    }).fail(function (request, status, error) {
    	stopSpinner();
        var errorData = request.responseJSON;
        ajaxErrorHandler(errorData, status, request.status, "alert-error","msgTitleError","msgDescripcionError");
    });
}

