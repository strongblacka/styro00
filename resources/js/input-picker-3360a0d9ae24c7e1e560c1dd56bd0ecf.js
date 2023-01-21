$(function(){
    $('.spinner .btn:first-of-type').on('click', function() {
      var btn = $(this);
      var input = btn.closest('.spinner').find('input');
      if (input.attr('max') == undefined || parseInt(input.val()) < parseInt(input.attr('max'))) {    
        input.val(parseInt(input.val(), 10) + 1);
      } else {
        btn.next("disabled", true);
      }
      checkInpValue();
    });
    $('.spinner .btn:last-of-type').on('click', function() {
      var btn = $(this);
      var input = btn.closest('.spinner').find('input');
      if (input.attr('min') == undefined || parseInt(input.val()) > parseInt(input.attr('min'))) {    
        input.val(parseInt(input.val(), 10) - 1);
      } else {
        btn.prev("disabled", true);
      }
      checkInpValue();
    });
})

function checkInpValue(){
	var value = $("#cantidadCuotas").val();
	if(value != '1'){
		$("#amount").val('');
		//$("#amount").attr('disabled', true);
	}else{
		$("#amount").val('');
		//$("#amount").attr('disabled', false);
	}
}