<?php
$ruta="../..";
//session_start();
//if(isset($_SESSION['usuario']) and $_SESSION['EstadoU']==1){
	?>

	<!DOCTYPE html>
	<html lang="es">
	<head>
		<?php include $ruta.'/layouts/dependencias1.php';?>
		<title>Dashboard Modern 2 | Materialize - Material Design Admin Template</title>
		<style type="text/css">
		body{
			width: 100%;
			height: 100%;
			background-size: cover;
			background-attachment: fixed;
		}
		#chartdiv {
			width: 47%;
			height: 350px;
		}
		#chartVenta {
			width: 47%;
			height: 350px;
		}
		#chartCV {
			width: 95%;
			height: 350px;
		}


	</style>
	<!--background: rgb(224, 237, 240);-->


</head>
<?php include $ruta.'/layouts/inicio.php';?>
<?php //require_once $ruta."/layouts/right_sidebar.php"; ?>
<body class="vertical-layout vertical-menu-collapsible page-header-dark vertical-modern-menu 2-columns  " data-open="click" data-menu="vertical-modern-menu" data-col="2-columns">


	<!--<div class="contenedor-general" >
		<div class="col-sm-12" style="padding-top: 10px; padding-bottom: 10px; padding-left: 20px;">
			<input type="button" class="buttonColor btn btn-xs" name="RBFiltro" value="DIA" style="width: 100px; text-align: center;">
			<input type="button" class="btn btn-xs" name="RBFiltro" value="SEMANA" style="width: 100px; text-align: center;">
			<input type="button" class="btn btn-xs" name="RBFiltro" value="MES" style="width: 100px; text-align: center;">
			<input type="button" class="btn btn-xs" name="RBFiltro" value="AÑO" style="width: 100px; text-align: center;">
		</div>

		<div class="col-sm-12" id="chartVenta" style="height: 240px; width: 575px;"></div>
		<div class="col-sm-12" id="chartdiv" style="height: 240px; width: 575px;"></div>
		<div class="col-sm-12" id="chartCV" style="height: 275px; width: 575px;"></div>
		<div class="col-sm-12" id="TortaCP" style="height: 275px; width: 575px;"></div>

		<div class="col-sm-12">
			<div class="text-right">
				<span style="color: black; font-weight: 500;">Designed by: </span> <span style="font-weight: 700; color: blue;">ABANTO & TORRES    .</span>
			</div>
		</div>
	</div>-->
	<!-- Resources -->
	<script src="../plugins/Highcharts/code/highcharts.js"></script>
	<script src="../plugins/Highcharts/code/modules/exporting.js"></script>
	<script src="../plugins/Highcharts/code/modules/export-data.js"></script>
	<script src="../plugins/Highcharts/code/modules/pareto.js"></script>
	<script src="../plugins/Highcharts/code/modules/data.js"></script>
	<script src="../plugins/Highcharts/code/modules/drilldown.js"></script>
	<script type="text/javascript" src="dashboard.js"></script>
</body>
</html>
<?php
/*}else{
	header("location:$ruta/index.php");
}*/
?>
