$(document).ready(function(){
	$('#password').on('change',function(){
		$(this).focus();
		if($(this).val()=="")
			$(this).removeClass('password-zise');
		else if(! $(this).hasClass('password-zise'))
			$(this).addClass('password-zise');
	});	
	$('#botonBorrar').on('click',function(){
		$('#password').val('');
	});	
	
});

	var mouseMoved= true;

	var bnf =  [ "A B C D E", 
	                  "1 2 3 4 5 " +
	                  "6 7 8 9 0",
	                  "Borrar","X"];
	
	//randomizar el teclado y crear el teclado
	buildKeyboard = function(detach, attachTo, contrasenaInput, fromJsp, container , newSet){
		if (fromJsp==true){
			container = $('<div />')
			.attr({'id': 'contenedor' + attachTo.attr("id")});
			 newSet = $('<div />')
			.attr('id','botones' + attachTo.attr("id"))
			.attr('name', 'teclado-bnf')
			.addClass('keyboard-keyset')
			.show()
		
		}else if (container == null && newSet == null){
			container = $("#contenedor" +  attachTo.attr("id"));
			newSet = $("#botones" + attachTo.attr("id")); 
		}
		
		if (detach == true){   
			container.empty();
			newSet.empty();
		}
		for ( var i = 0 ; i<4; i++){
			currentSet = $.trim(bnf[i]).replace(/\{(\.?)[\s+]?:[\s+]?(\.?)\}/g,'{$1:$2}');
			keys = currentSet.split(/\s+/);
			if (i<2){
				if (i==1){
					//keys = ['1','2','3','4','5','6','7','8','9','0']
					var laux = ['','','','','','','','','',''];
					for ( key = 0; key < keys.length; key++ ) {
						var bandera = true; 
						while (bandera) {
							var ran_number = Math.floor(Math.random()*10);
							if(laux[ran_number]=="") {
							  laux[ran_number] = keys[key];
							  bandera = false;
							}
							
						}	
					}
				}else{
					//keys = ['A','B','C','D','E']
					var laux = ['','','','',''];
					for ( key = 0; key < keys.length; key++ ) {
						var bandera = true; 
						while (bandera) {
							var ran_number = Math.floor(Math.random()*5);
							if(laux[ran_number]=="") {
							  laux[ran_number] = keys[key];
							  bandera = false;
							}
							
						}	
					}
				}
				keys = laux;
			}
			retorno = agregar(keys, contrasenaInput , newSet , attachTo );
			newSet = retorno[0];
			contrasenaInput = retorno[1];
		}
		
		newSet.appendTo(container);
		container.appendTo(attachTo);		
		container.find('.keyboard-button').mouseover( function () {			
			// mouseenter
			if(mouseMoved){
				var keys = newSet.children();
				for (i=0; i<keys.length-2; i++){
					keys[i].value = '*';
				}
			}
			return false;
		});
		container.find('.keyboard-button').mouseout( function () { 			
			// mouseenter
			mouseMoved= true;
			var keys = newSet.children();
			for (i=0; i<keys.length-2; i++){
				keys[i].value = keys[i].name;
			}
			return false;
		});
		container.find('.keyboard-button').mouseleave( function () { 			
			// mouseenter
			mouseMoved= true;
			var keys = newSet.children();
			for (i=0; i<keys.length-2; i++){
				keys[i].value = keys[i].name;
			}
			return false;
		});
		container.find('.keyboard-button').mousedown( function () { 			
			// mouseenter
			mouseMoved= false;
			var keys = newSet.children();
			for (i=0; i<keys.length-2; i++){
				keys[i].value = '*';
			}
			return false;
		});
		container.find('.keyboard-button').mousemove( function () {
			mouseMoved= true;
		});
		return contrasenaInput;
	}
	
	agregar = function (keys, inputContrasena ,botones ,attach ){
		
		for (var j=0; j<keys.length; j++){
			keyBtn = $('<input />')
			.attr({ 'value': keys[j] , 'id': 'boton', 'name': keys[j] , 'type':'button'})
			//.attr( 'onclick','javascript:clickeado(this)')
			.addClass('keyboard-button nexa-light-gray')
			.show();
			if (keys.length==1){
				keyBtn
				.addClass('keyboard-widekey');
				/*if(keys=="Borrar"){ 
					keyBtn.addClass('pull-right');
					keyBtn.addClass('boton-borrar');
					}*/
				if(keys=="X"){ 
					keyBtn.addClass('pull-left');
					keyBtn.addClass('boton-cerrar');
					}
			}
			keyBtn.mouseup(function(){	
				
				
			 	value = $(this).attr("name");
			      if (value!= "Borrar" && value != "X"){
				      pass = inputContrasena.val();
				      if( pass == "undefined") pass ="";
				      pass = pass.concat(value);
				      inputContrasena.val(pass).trigger('change');				     
			      }else if (value == "Borrar"){
			    	  inputContrasena.val("").trigger('change');
			      }else if(value="X"){
			    	  pass = pass.substring(0,inputContrasena.val().length-1);
			    	  inputContrasena.val(pass).trigger('change');
			      }else{
			      return;
			      }
			    
			      buildKeyboard(true,attach, inputContrasena , false );
			      return false;
		   		})
		   		.appendTo(botones);
			if (j==keys.length-1 || j==keys.length-6){ // last
				if(keys!="X" && keys!="Borrar"){
					botones.append('<br />');
				}
			}
		}

		return [botones, inputContrasena];
	}
	
	
	 
	
	/* Teclado Virtual para BNF - sólo números - */

	var bnf2 =  ["1 2 3 4 5 6 7 8 9 0", "borrar"];
	
	//randomizar el teclado y crear el teclado
	buildKeyboardOnlyNumbers = function(detach, attachTo, contrasenaInput, fromJsp, container , newSet){
		if (fromJsp==true){
			container = $('<div />')
			.attr({'id': 'contenedor' + attachTo.attr("id")});
			
			 newSet = $('<div />')
			.attr('id','botones' + attachTo.attr("id"))
			.attr('name', 'teclado-bnf')
			.addClass('keyboard-keyset')
			.addClass('keyboard-keyset2')
			.show()
		
		}else if (container == null && newSet == null){
			container = $("#contenedor" +  attachTo.attr("id"));
			newSet = $("#botones" + attachTo.attr("id")); 
		}
		
		if (detach == true){   
			container.empty();
			newSet.empty();
		}
		for ( var i = 0 ; i<2; i++){
			currentSet = $.trim(bnf2[i]).replace(/\{(\.?)[\s+]?:[\s+]?(\.?)\}/g,'{$1:$2}');
			keys2 = currentSet.split(/\s+/);
			
			if (i==0){
				//keys = ['1','2','3','4','5','6','7','8','9','0']
				var laux = ['','','','','','','','','',''];
				for ( key = 0; key < keys2.length; key++ ) {
					var bandera = true; 
					while (bandera) {
						var ran_number = Math.floor(Math.random()*10);
						if(laux[ran_number]=="") {
						  laux[ran_number] = keys2[key];
						  bandera = false;
						}
						
					}	
				}
			}
			
			if (i==0){
				keys2 = laux;
			}
			retorno = agregar2(keys2, contrasenaInput , newSet , attachTo);
			newSet = retorno[0];
			contrasenaInput = retorno[1];
		}
		
		
		newSet.appendTo(container);
		container.appendTo(attachTo);
		
		container.mouseover(
				  function () { // mouseenter
					  var keys = newSet.children();
					  for (i=0; i<keys.length-1; i++){
						   keys[i].value = '*';
					    }
					  return false;
				  });
		newSet.mouseover(
				function () { // mouseenter
			  var keys = newSet.children();
			  for (i=0; i<keys.length-1; i++){
				   keys[i].value = '*';
			    }
			  return false;
		  });
		container.mouseleave(
				  function () {  //mouseleave
					  var keys = newSet.children();
					  for (i=0; i<keys.length-1; i++){
						  keys[i].value = keys[i].name;
					    }
					  return false;
				    });
		
		
		$('.keyboard-button[name=borrar]+br').remove();
		$('.keyboard-button[name=borrar]').remove()
		return contrasenaInput;
	}
		
	agregar2 = function (keys, inputContrasena ,botones ,attach ){
		
		
		for (var j=0; j<keys.length; j++){
			keyBtn = $('<input />')
			.attr({ 'value': keys[j] , 'name': keys[j] , 'type':'button'})
			//.attr( 'onclick','javascript:clickeado(this)')
			.addClass('keyboard-button nexa-light-gray ')
			.show();
						
			
			keyBtn.click(function(){
				
			 	value = $(this).attr("name");
			      if (value!= "Borrar"){
				      pass = inputContrasena.val();
				      if( pass == "undefined") pass ="";
				      pass = pass.concat(value);
				      inputContrasena.val(pass);
				      inputContrasena.trigger("change");
			      }else if (value == "Borrar"){
			    	  inputContrasena.val("");
			      }else{
			      return;
			      }
			    
			      buildKeyboardOnlyNumbers(true,attach, inputContrasena , false );
			      return false;
		   		})
		   		.appendTo(botones);
			if (j==keys.length-1 || j==keys.length-6){ // last
				botones.append('<br />');
				
			}
		}
		return [botones, inputContrasena];
	}
	
//	************************************* Teclado para LOGIN ************************************************
	
	buildKeyboardOnlyNumbersLogin = function(detach, attachTo, contrasenaInput, fromJsp, container , newSet, tipo){
		if (fromJsp==true){
			container = $('<div />')
			.attr({'id': 'contenedor' + attachTo.attr("id")})
			.addClass('col-lg-12 col-md-12 col-ms-12 col-xs-12 pdr0');
			
			 newSet = $('<div />')
			.attr('id','botones' + attachTo.attr("id"))
			.attr('name', 'teclado-bnf')
			.addClass('keyboard-keyset-login')
			.addClass('col-lg-6 col-md-6 col-sm-6 col-xs-12')
			.show()
		
		}else if (container == null && newSet == null){
			container = $("#contenedor" +  attachTo.attr("id"));
			newSet = $("#botones" + attachTo.attr("id")); 
		}
		
		if (detach == true){   
			container.empty();
			newSet.empty();
		}
		for ( var i = 0 ; i<2; i++){
			currentSet = $.trim(bnf2[i]).replace(/\{(\.?)[\s+]?:[\s+]?(\.?)\}/g,'{$1:$2}');
			keys2 = currentSet.split(/\s+/);
			
			if (i==0){
				//keys = ['1','2','3','4','5','6','7','8','9','0']
				var laux = ['','','','','','','','','',''];
				for ( key = 0; key < keys2.length; key++ ) {
					var bandera = true; 
					while (bandera) {
						var ran_number = Math.floor(Math.random()*10);
						if(laux[ran_number]=="") {
						  laux[ran_number] = keys2[key];
						  bandera = false;
						}
						
					}	
				}
			}
			
			if (i==0){
				keys2 = laux;
			}
			retorno = agregarLogin(keys2, contrasenaInput , newSet , attachTo,tipo);
			newSet = retorno[0];
			contrasenaInput = retorno[1];
			
		}
		
		
		newSet.appendTo(container);
		container.appendTo(attachTo);
		var botonBorrar = getBotonBorrar(tipo);
		$(botonBorrar).appendTo(container);
		container.mouseover(
				  function () { // mouseenter
					  var keys = newSet.children();
					  for (i=0; i<keys.length-1; i++){
						   keys[i].value = '*';
					    }
					  return false;
				  });
		newSet.mouseover(
				function () { // mouseenter
			  var keys = newSet.children();
			  for (i=0; i<keys.length-1; i++){
				   keys[i].value = '*';
			    }
			  return false;
		  });
		container.mouseleave(
				  function () {  //mouseleave
					  var keys = newSet.children();
					  for (i=0; i<keys.length-1; i++){
						  keys[i].value = keys[i].name;
					    }
					  return false;
				    });
		
		
		$('.keyboard-button-login[name=borrar]+br').remove();
		$('.keyboard-button-login[name=borrar]').remove();
		
		return contrasenaInput;
	}
		
	agregarLogin = function (keys, inputContrasena ,botones ,attach,tipo ){
		
		
		for (var j=0; j<keys.length; j++){
			keyBtn = $('<input />')
			.attr({ 'value': keys[j] , 'name': keys[j] , 'type':'button'})
			//.attr( 'onclick','javascript:clickeado(this)')
			.addClass('nexa-light-gray keyboard-button-login')
			.show();
			
			keyBtn.mouseup(function(){
			 	value = $(this).attr("name");
			      if (value!= "Borrar"){
				      pass = inputContrasena.val();
				      if( pass == "undefined") pass ="";
				      pass = pass.concat(value);
				      inputContrasena.val(pass);
			      }else if (value == "Borrar"){
			    	  inputContrasena.val("");
			      }else{
			      return;
			      }
			    
			      buildKeyboardOnlyNumbersLogin(true,attach, inputContrasena , false,undefined,undefined,tipo);
			      return false;
		   		})
		   		.appendTo(botones);
			if (j==keys.length-1 || j==keys.length-6){ // last
				botones.append('<br />');
				
			}
		}
		return [botones, inputContrasena];
	}
	
	
function getBotonBorrar(tipo){
	//tipo es F o J, para la pestanha de login
	var botonBorrar="<button type='button' name='botonBorrar' id='botonBorrar' class='btn btn-red nexa-light-white login-pass-btn' onclick='vaciarPass("+tipo+")'>Borrar</button>";
	return botonBorrar;
}

function vaciarPass(tipo){
	if(tipo==true)
		$('#password-login').val('');
	else
		$('#password-login2').val('');
}
	