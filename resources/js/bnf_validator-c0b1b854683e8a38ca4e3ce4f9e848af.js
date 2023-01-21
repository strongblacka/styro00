const REGEX_SPECIAL_CHARACTERS_NUMBER = "^[áéíóúñÑ0-9/&\b]|[.]|[-]|[,]|[:]|[;]|[']|[´]|[{]|[}]|[[]|[]]|[/]+$i";
const REGEX_SPECIAL_CHARACTERS = "^[áéíóúñÑ/&\b]|[.]|[-]|[,]|[:]|[;]|[']|[´]|[{]|[}]|[[]|[]]|[/]+$i";
const REGEX_LETTERS = "^[a-zA-Z0-9 ]+$";
const REGEX_NOT_ALFANUMERIC = /[^a-zA-Z0-9 .]/g;
const REGEX_NOT_ALFANUMERIC_EXTENDED = /[^a-zA-Z0-9\s_\-\.@]/g;
const REGEX_NOT_ALFA = /[^a-zA-Z\s_\-\.]/g;
const REGEX_NOT_NUMBERS = /[^0-9]/g;
const REGEX_NUMBERS_ONLY = "^[0-9]+$";
const REGEX_EMAIL = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
function validarCampos() {
	if ($("#saveAccount").is(":checked")) {
		var alias = $('#aliasCuenta').val();
		if (alias == "" || alias == undefined || alias == null) {
			$('#span-error-alias').removeClass('hidden');
			$('#span-icon-alias').removeClass('hidden');
			return false;
		} else {
			$('#span-error-alias').addClass('hidden');
			$('#span-icon-alias').addClass('hidden');
		}
	}
	return true;

}

function validarEmail(email) {
	if (!REGEX_EMAIL.test(email)) {
		return true;
	}
}



function vaciarTeclado(){
	$('#password').on('keypress keydown keyup',function(){
		$(this).val('');
	});
}


function validacionesInputSelect(tipo){
	$("#saveAccount").change(function (){
	    if($("#favouriteCode").find(":selected").index() == "0"){	
	    	if($("#saveAccount").is(":checked")){
	    		$("#divAlias").removeClass("hidden");
	    	}else{
	    		$("#divAlias").addClass("hidden");
	    	}
	    }
    	});    
	    
	    $('.dropdown-select').change(function(e){
	    	var id = $(this).attr('id');
	    	if(id == 'reason'){
                $('#div-reason-content').addClass('col-lg-12');
                $('#div-reason-content').removeClass('col-lg-11');
            }
	        $('#span-error-'+id).addClass('hidden');
	        $('#div-'+id).addClass('hidden');
	        
	        $('.dropdown-select').each(function(index, value){
	        	var val= $(this).val();
	        	if(val !== null && val !== '' && val !== undefined){
	        		$(this).siblings('span.help-block.input-error').addClass('hidden');
	        		return;
	        	}
	        });
	    });
	    if(tipo==null || tipo == undefined){
	    	$('input[type=text]').on('focusout', function(){
		    	$(this).siblings('span.help-block.input-error').addClass('hidden');
		    	$(this).siblings('span.icon-error-span-other').addClass('hidden');
		    	
		    });
	    }else{
	    	$('input[type=text]').on('focusout', function(){
		    	$(this).siblings('span.help-block.input-error').addClass('hidden');
		    	$(this).siblings('span.icon-error-span-other').addClass('hidden');
		    	var parent = $(this).parent();
		    	parent.addClass("has-success-nothing");
		    });
	    }
	    
	   
	    

	    $(".reg-alfanumeric, .reg-charac-number").on('input', function(event){
	    	var text = $(this).val();
	    	text = text.replace(REGEX_NOT_ALFANUMERIC, "");
	    	$(this).val(text);
        });
	    
	    $(".reg-number").on('input', function(event){
	    	var text = $(this).val();
	    	text = text.replace(REGEX_NOT_NUMBERS, "");	    	
	    	$(this).val(text);
        });
	    
	    $(".reg-alfanumeric-extended").on('input', function(event){
	    	var text = $(this).val();
	    	text = text.replace(REGEX_NOT_ALFANUMERIC_EXTENDED, "");
	    	$(this).val(text);
        });
	    
	    $(".reg-charac").on('input', function(event){
	    	var text = $(this).val();
	    	text = text.replace(REGEX_NOT_ALFA, "");
	    	$(this).val(text);
        });
	    
	
	    
	    $('[data-inputmask]').inputmask('999-99-9999999',{ 'placeholder': '',
	    	onBeforeMask: function (value, opts) {
	    	    var processedValue = value.replace(/^0/g, "");
	    	    return processedValue;
	    	  }
	    });
	    
}


function deleteBenef(tipoBenef, uuid, nroCuenta){
	
	var texto = "<span class='nexa-light-gray'>Desea eliminar el benficiario con Cuenta Nro.: "+nroCuenta+"</span>";
	$('#modalBodyBeneficiario').html(texto);
	$('#tipo-contacto').val(tipoBenef);
	$('#uuidBenef').val(uuid);
	$('#deleteModal').modal('show');
}

function validatorInputPassword(){
	
	$(".reg-number").on('keypress', function(event){
    	var regex = new RegExp(REGEX_NUMBERS_ONLY);
	    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
	    if (!regex.test(key)) {
	       event.preventDefault();
	       return false;
	    }
    });
	
	$("#repeatNewPassword").on('change', function(event){
    	var pass = $("#newPassword").val();
    	var repeatPass = $(this).val();
    	if(repeatPass.length == 5 && pass.indexOf(repeatPass) != 0){
    		$("#div-repeatPass").append("<span class='help-block input-error' id='repeatPasswordError' data-type='display-error'></span>");
	    	$("#repeatPasswordError").html("Las contraseñas no coinciden.");
	    	return false;
    	}else if(repeatPass!=null || repeatPass != "" || repeatPass !=undefined){
	    	$("#repeatPasswordError").remove();
	    	return true;
    	}
    	//passwordValido(pass,repeatPass,"div-repeatPass");
    });
	
	$('input[type=password]').on('focusout', function(){
		$(this).siblings('span.help-block.input-error').not("span#repeatPasswordError").remove();	
		//$(this).siblings('span.help-block.input-error').not("span#repeatPasswordError").addClass('hidden');
	    	$(this).siblings('span.icon-error-span-other').addClass('hidden');
	    	var parent = $(this).parent();
	    	parent.addClass("has-success-nothing");
	    });
	
	/*Validación de longitud de contraseñas*/
	
	$("#passwordAct").change(function(event){
    	var val = $(this).val();
    	var count = val.length;
    	if(count!=="" && count>5){
    		$("#div-Pass").append("<span class='help-block input-error' id='PasswordError' data-type='display-error'></span>");
	    	$("#PasswordError").html("Sólo se permiten 5 dígitos.");
    	}
    	
    });
	
	$("#newPassword").change(function(event){
    	var val = $(this).val();
    	var count = val.length;
    	if(count!=="" && count>5){
    		$("#div-newPass").append("<span class='help-block input-error' id='newPasswordError' data-type='display-error'></span>");
	    	$("#newPasswordError").html("Sólo se permiten 5 dígitos.");
    	}
    	
    });
	
	$("#repeatNewPassword").change(function(event){
    	var val = $(this).val();
    	var count = val.length;
    	if(count!=="" && count>5){
    		$("#div-repeatPass").append("<span class='help-block input-error' id='repeatPasswordError' data-type='display-error'></span>");
	    	$("#repeatPasswordError").html("Sólo se permiten 5 dígitos.");
    	}
    	
    });
    	
}



function passwordValido(pass,repeatPass,divError){

	ocultarTeclado();
	
	pass = $("#newPassword").val();
	repeatPass = $("#repeatNewPassword").val();

	
	$("[data-type='display-error']").remove();
	
	 var error = false;
	 
	 if (pass == null || pass == "" || pass.length != 5) {
		 	$("#div-newPas").append("<span class='help-block input-error' id='newPasswordError' data-type='display-error'></span>");
	    	$("#newPasswordError").text("Las contraseñas deben tener 5 carácteres de longitud.");
	    	
	    	error = true;
	 }
	 
	 if (repeatPass == null || repeatPass == "" || repeatPass.length != 5) {
		 	$("#div-repeatPass").append("<span class='help-block input-error' id='repeatPasswordError' data-type='display-error'></span>");
	    	$("#repeatPasswordError").text("Las contraseñas deben tener 5 carácteres de longitud.");
	    	
	    	error = true;
	 }
	
	
	 if (!error && repeatPass !== pass) {
	    	$("#"+divError).append("<span class='help-block input-error' id='repeatPasswordError' data-type='display-error'></span>");
	    	$("#repeatPasswordError").text("Las contraseñas no coinciden.");
	    	
	    	error = true;
	 }
	 
	 if(error == false){
		 	$("#newPasswordError").remove();
	    	$("#repeatPasswordError").remove();
	 }
	 
	 return !error;
}

