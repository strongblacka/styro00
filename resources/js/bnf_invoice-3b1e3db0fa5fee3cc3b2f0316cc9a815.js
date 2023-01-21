var fechaObject=[];
var lastPosition="";

function obtenerDosAnhoAtras(){
	customDate = true;
	var currentDate = new Date();
	
	var year = currentDate.getFullYear();
	var month = currentDate.getMonth();
	var day = currentDate.getDate();
	
	moment.locale('es', {monthsShort : 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_')});
	//el conteo empieza desde 0:enero, y necesitamos 12 meses atras, es decir menos el mes 0 y menos el mes actual.	
	var m1 = (month + 2) % 12;
	var substractYear = 0;
	if (m1 != 1) {
		substractYear = 2;
	}
	

	var dateStart = "";
	if(month == 10){ // para mes noviembre
		dateStart = moment((year-substractYear)+"-"+(month + 1)+"-"+'01');
	}else{
		dateStart = moment((year-substractYear)+"-"+(m1)+"-"+'01');
	}
	//el mes actual +1
	var m2 = (month + 1);
	var dateEnd = moment(year+'-'+m2+'-'+'01');
	
	var monthValues = [];
	var fec=null;
	var fecId=null;

	counter = 1
	while (counter <= 12) {

		counter++;

		if (Number(dateStart.format("DD")) != 1) {
			dateStart.add(1, "day");
		}

		fecId = dateStart.format('DD/MM/YYYY');
		fec= dateStart.format('MMM.YYYY');


		monthValues.push({id:fecId,text:fec});
	}
	
	//ordenamos descendentemente
	monthValues.sort(function (left, right) {
	    return moment.utc(right.id).diff(moment.utc(left.id))

	});
	monthValues.push({id:0,text:"Personalizado"});
	fechaObject = monthValues;
	//return monthValues;
}


function cargarFiltroFechasInvoice(dateInit){
	
		$('#date-own').datepicker({
			format: "mm/yyyy",
			viewMode: "year",
			minViewMode: "year",
			orientation: "bottom",
			autoclose: true,
			starDate: new Date(),
			endDate: new Date()
		}).datepicker("setDate", "0").datepicker('setStartDate','-24m');

		checkFilterTransac();

}

 
 
 
 
 
 