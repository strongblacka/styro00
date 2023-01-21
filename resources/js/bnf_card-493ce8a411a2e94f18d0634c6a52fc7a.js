var fechaObject = [];
var lastPosition = "";

function obtenerMesesUnAnhoAtras() {
    customDate = true;
    var currentDate = new Date();

    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();
    var day = currentDate.getDate();

    moment.locale('es', {monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_')});
    //el conteo empieza desde 0:enero, y necesitamos 12 meses atras, es decir menos el mes 0 y menos el mes actual.
    var m1 = (month + 2) % 12;
    var substractYear = 0;
    if (m1 != 1) {
        substractYear = 1;
    }


    var dateStart = "";
    if (month == 10) { // para mes noviembre
        dateStart = moment((year - substractYear) + "-" + (month + 1) + "-" + '01');
    } else {
        dateStart = moment((year - substractYear) + "-" + (m1) + "-" + '01');
    }
    //el mes actual +1
    var m2 = (month + 1);
    var dateEnd = moment(year + '-' + m2 + '-' + '01');

    var monthValues = [];
    var fec = null;
    var fecId = null;

    counter = 1
    while (counter <= 12) {

        counter++;

        if (Number(dateStart.format("DD")) != 1) {
            dateStart.add(1, "day");
        }

        fecId = dateStart.format('DD/MM/YYYY');
        fec = dateStart.format('MMM.YYYY');


        monthValues.push({id: fecId, text: fec});
        dateStart.add(1, 'month');
    }

    //ordenamos descendentemente
    monthValues.sort(function (left, right) {
        return moment.utc(right.id).diff(moment.utc(left.id))

    });
    monthValues.push({id: 0, text: "Personalizado"});
    fechaObject = monthValues;
    //return monthValues;
}


function cargarFiltroFechas(dateInit) {

    if (dateInit == null) {

        var monthYear = fechaObject;
        dateInit = monthYear[0].id;
        var starDate = monthYear[11].id;
        $('#datepicker1').datepicker({
            autoclose: true,
            minViewMode: 0,
            maxViewMode: 0,
            changeMonth: true,
            startDate: starDate,
            endDate: 'now',
            format: 'dd/mm/yyyy',
            language: 'es',
            orientation: 'bottom'
        }).datepicker("setDate", new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        );

        var fechaPicker1 = $('#datepicker1').datepicker('getDate');
        var lastDay = new Date(fechaPicker1.getFullYear(), fechaPicker1.getMonth() + 1, 0);
        var starDate = new Date(fechaPicker1.getFullYear(), fechaPicker1.getMonth(), fechaPicker1.getDate());
        $('#datepicker2').datepicker({
            autoclose: true,
            startDate: starDate,
            minViewMode: 0,
            maxViewMode: 0,
            endDate: 'now',
            format: 'dd/mm/yyyy',
            orientation: 'bottom',
            language: 'es'
        });
        $('#datepicker2').datepicker('update', '1d');

        $('#selectDate').val("0").trigger('change');


    } else {
        customDate = false;
        $('#datepicker1').datepicker('update', dateInit);
        var fechaPicker1 = $('#datepicker1').datepicker('getDate');
        var starDate = new Date(fechaPicker1.getFullYear(), fechaPicker1.getMonth(), fechaPicker1.getDate());
        $('#datepicker2').datepicker('setStartDate', starDate);

        var lastDay = new Date(fechaPicker1.getFullYear(), fechaPicker1.getMonth() + 1, 0);
        var today = new Date();
        if (lastDay > today) {
            $('#datepicker2').datepicker('update', 'today');
        } else {
            $('#datepicker2').datepicker('update', lastDay);
        }
        customDate = true;
    }

    $('#datepicker1').on('changeDate', function () {
        var lasDayNext = null;
        var fechaPicker1 = $('#datepicker1').datepicker('getDate');
        var endDay = new Date(fechaPicker1.getFullYear(), fechaPicker1.getMonth(), fechaPicker1.getDate() + 1);
        var lastDay = new Date(fechaPicker1.getFullYear(), fechaPicker1.getMonth() + 1, 0);
        var today = new Date();
        var islastDayCurrent = fechaPicker1.getDate() == lastDay.getDate();


        $('#datepicker2').datepicker('setStartDate', fechaPicker1);

        if (islastDayCurrent) {
            lastDayNext = new Date(fechaPicker1.getFullYear(), fechaPicker1.getMonth() + 2, 0);
        } else {
            lastDayNext = lastDay;
        }

        var today = new Date();
        if (lastDayNext > today) {
            $('#datepicker2').datepicker('update', '1d');
        } else {
            $('#datepicker2').datepicker('update', lastDayNext);
        }

        if (customDate) {
            $('#selectDate').val("0").trigger('change');
        }


    });

    $('#datepicker2').on('changeDate', function () {
        if (customDate) {
            $('#selectDate').val("0").trigger('change');
        }
    });
}


function checkFilter(url) {
    var fechaInicio = $('#datepicker1').val();
    var fechaFin = $('#datepicker2').val();
    var nroProducto = "";
    if (url == 'account') {
        nroProducto = $('#nroCuenta').val();
    } else if (url == 'card') {
        nroProducto = $('#nroTarjeta').val();
    }

    $('#spinner_overlay').removeClass('hidden');
    $.ajax({
        type: "POST",
        url: appname + "/" + url + "/movements-filter",
        data: {
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
            nro_producto: nroProducto
        }
    }).done(function (data) {
        if (data !== null && data !== undefined && data !== '') {
            $('.table-striped').html('');
            $('#tab_b').html(data);
            $('#spinner_overlay').addClass('hidden');
        }


    }).fail(function (request, status, error) {
        $('#spinner_overlay').addClass('hidden');
        var errorData = request.responseJSON;
        ajaxErrorHandler(errorData, status, request.status, "alert-error", "msgTitleError", "msgDescripcionError");
    });
}


function showOverlay(position) {
    var trId = $('#row-card-' + position);
    var backgroundActual = trId.css('background-color');
    var backgroundOriginal = "";
    if (trId.attr("background-original") == undefined || trId.attr("background-original") == null) {
        trId.attr("background-original", backgroundActual)
    } else {
        backgroundOriginal = trId.attr("background-original");
    }
    //si es gris y le volvio a dar click en el boton volvemos al color original
    if (backgroundActual == "rgba(161, 153, 153, 0.83)") {
        trId.css('background-color', backgroundOriginal);
    } else {
        trId.css('background-color', '#a19999d4');
    }

    $('#tool-boton-' + position).on('focusout', function () {
        var indexTr = $(this).attr("index-tr");
        var tr = $('#row-card-' + indexTr);
        var backgroundOriginal = tr.attr("background-original");

        tr.css("background", backgroundOriginal)
    });
    lastPosition = position;
}

 
 
 
 
 
 