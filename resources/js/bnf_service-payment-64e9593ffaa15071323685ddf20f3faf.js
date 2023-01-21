//por default A esta activo
var TABS = {pestA:{activo: true}, pestB:{activo: ''},actual:''}

function getLiquidacion(urlDetail, uuid){
	var idLiquidacion = $('#liquidationId').val();
	
	if (!idLiquidacion) {
		 $('.icon-error-span').removeClass('hidden');
		 return;
	}
	
	var url = "/"+urlDetail;
	
	loadSpinner();
	$.ajax({
        type: "POST",
        url: appname +url,
        data: { 
			id_liquidacion: idLiquidacion,
			uuid: uuid
		}
    }).done(function (data) {
    	$('#btn-next').removeClass('hidden');
    	if(data !== null && data !== undefined && data !== ''){
    		$('#VUE-detail').html('');
    		$('#VUE-detail').html(data);
    		stopSpinner();
    	}
    	
    }).fail(function (request, status, error) {
    	stopSpinner();
        var errorData = request.responseJSON;
        ajaxErrorHandler(errorData, status, request.status, "alert-error","msgTitleError","msgDescripcionError");
    });
}

function getSubServicios(idGroup,idServiceGroup){
var url = "/clasification/service";
	var uuidInstance = $("#instanceId").val();
	loadSpinner();
	$.ajax({
        type: "POST",
        url: appname +url,
        data: { 
			id_categoria: idGroup,
			id_servicio: idServiceGroup,
			uuid: uuidInstance
		}
    }).done(function (data) {
    	if(idServiceGroup == null || idServiceGroup == undefined){
    		$('#id-clasification').addClass('hidden');
    		$('#id-sub-service').removeClass("hidden");
        	$('#id-sub-service').html(data);
    	}else{
    		$('#id-sub-service').addClass('hidden');
    		$('#id-service').removeClass("hidden");
        	$('#id-service').html(data);
    	}
    	
    	stopSpinner();
    }).fail(function (request, status, error) {
    	stopSpinner();
        var errorData = request.responseJSON;
        ajaxErrorHandler(errorData, status, request.status, "alert-error","msgTitleError","msgDescripcionError");
    });
	
}

function back(destination){
	if(destination ==="C"){
		$('#id-clasification').removeClass("hidden");
		$('#id-sub-service').addClass("hidden");
		$('#id-service').addClass("hidden")
	}else if(destination ==="SB"){
		$('#id-clasification').addClass("hidden");
		$('#id-sub-service').removeClass("hidden");
		$('#id-service').addClass("hidden")
	}
	
}

//función que marcará cual pestaña debe estar activa
function checkTab(actual){
	//list-sub-service-a
	TABS.actual = actual;

	 if(TABS.pestA.activo == true){
		 $('.list-'+actual+'-a').find('a').click();
		 
    }else if(TABS.pestB.activo == true){
		 $('.list-'+actual+'-b').find('a').click();
    }
	
	 $('.list-'+actual+'-a').on('click',function(){
		    TABS.pestA.activo = true;
		    TABS.pestB.activo = false;
		 
		  });
	 $('.list-'+actual+'-b').on('click',function(){
		    TABS.pestB.activo = true;
		    TABS.pestA.activo = false;
		 
		  });
		 
}
