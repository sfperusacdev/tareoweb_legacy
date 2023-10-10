
filtro='MES';
$(document).ready(function(){

	$("input[name=RBFiltro]").click(function(){
		filtro=$(this).val();
		//grafBarrasVentas(filtro);
		//grafBarrasCompras(filtro);
		//grafParetoProd(filtro);
		//TortaCatProd(filtro);
	});

	//grafBarrasVentas(filtro);
	//grafBarrasCompras(filtro);
	//grafParetoProd(filtro);
	//TortaCatProd(filtro);
});

function grafBarrasVentas($filtro)
{
	$.ajax({
		url: '../app/controllers/GraficosController.php',
		data:
        {
            accion: 'graficaVentas',
            filtro: $filtro
        },
		dataType: 'json',
		type: 'post',
		success: function(resp){
			//alert(resp);

			Highcharts.chart('chartVenta', {
				chart: {
					type: 'column'
				},
				title: {
					text: 'VENTAS'
				},
				xAxis: {
					type: 'category',
					title:
					{
						text:$filtro
					}
        		//categories:["pruebita"]
        	},
        	yAxis: {
        		title: {
        			text: 'Importe de Ventas'
        		}
        	},
        	legend: {
        		enabled: false
        	},

        	tooltip: {
        		headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        		pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>S/.{point.y:.2f}</b><br/>'
        	},

        	"series": [
        	{
        		"name": "Venta",
        		"colorByPoint": true,
            		//"data":[{name:"hola",y:4}]
            		"data":resp
            		//data:[4]
            	}
            	]
            });
		}
	});
}

function grafBarrasCompras($filtro)
{
	$.ajax({
		url: '../app/controllers/GraficosController.php',
        data:
        {
            accion: 'graficaCompras',
            filtro: $filtro
        },
        dataType: 'json',
        type: 'post',
		success: function(resp){

			Highcharts.chart('chartdiv', {
				chart: {
					type: 'column'
				},
				title: {
					text: 'COMPRAS'
				},
				xAxis: {
					type: 'category',
					title:
					{
						text:$filtro
					}
        		//categories:["pruebita"]
        	},
        	yAxis: {
        		title: {
        			text: 'Importe de Compras'
        		}
        	},
        	legend: {
        		enabled: false
        	},

        	tooltip: {
        		headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        		pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>S/.{point.y:.2f}</b><br/>'
        	},

        	"series": [
        	{
        		"name": "Compra",
        		"colorByPoint": true,
            		//"data":[{name:"hola",y:4}]
            		"data":resp
            		//data:[4]
            	}
            	]
            });

		},
		beforeSend: function () {
			mostrarCargando('Cargando datos...');
		},
		complete: function() {
			cerrarCangando();
		}
	});
}

function grafParetoProd($filtro)
{
	$.ajax({
		url: '../app/controllers/GraficosController.php',
        data:
        {
            accion: 'graficaPareto',
            filtro: $filtro
        },
        dataType: 'json',
        type: 'post',
		success: function(resp){

			Highcharts.chart('chartCV', {
				chart: {
					renderTo: 'container',
					type: 'column'
				},
				title: {
					text: 'PARETO DE VENTAS'
				},
				xAxis: {
					type: 'category',
					crosshair: true
        		//categories:["pruebita"]
        	},
        	yAxis: [{
        		title: {
        			text: 'Importe de Ventas'
        		}
        	},
        	{
        		title: {
        			text: ''
        		},
        		minPadding: 0,
        		maxPadding: 0,
        		max: 100,
        		min: 0,
        		opposite: true,
        		labels: {
        			format: "{value}%"
        		}
        	}],
        	legend: {
        		enabled: false
        	},

        	tooltip: {
                shared: true
        		//headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        		//pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>'
        	},

        	series: [
	        	/*{
    	        	"name": "PRODUCTO",
        	    	"colorByPoint": true,
            		//"data":[{name:"hola",y:4}]
            		"data":resp
            		//data:[4]
            	}*/
            	{
            		type: 'pareto',
            		name: '%',
            		yAxis: 1,
            		zIndex: 10,
            		baseSeries: 1
            	}, {
            		name: 'Importe',
            		type: 'column',
            		zIndex: 2,
            		data: resp
            	}
            	]
            });

		},
		beforeSend: function () {
			mostrarCargando('Cargando datos...');
		},
		complete: function() {
			cerrarCangando();
		}
	});
}

function TortaCatProd($filtro)
{
	$.ajax({
		url: '../app/controllers/GraficosController.php',
        data:
        {
            accion: 'graficaCategoria',
            filtro: $filtro
        },
        dataType: 'json',
        type: 'post',
		success: function(resp){

		$i=0;

		while(resp[$i])
		{
			//alert(resp[$i]['name']);
			$i++;
		};
		while($i>0)
		{
			Highcharts.chart('TortaCP', {
				chart: {
					type: 'pie'
				},
				title: {
					text: 'RANKING DE CATEGORIAS'
				},
				plotOptions: {
					series: {
						dataLabels: {
							enabled: true,
							format: '{point.name}: S/.{point.y:.1f}'
						}
					}
				},

				tooltip: {
					headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
					pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>S/.{point.y:.2f}</b><br/>'
				},

				"series": [
				{
					"name": "Tipo Categoría",
					"colorByPoint": true,
					"data":resp
            }
            ],
            /*"drilldown": {
            	"series": [
            	{
            		"name":resp[$i-1]['name'],
            		"id": resp[$i-1]['name'],
            		"data": resp
            	},
            	{
            		"name": "Firefox",
            		"id": "Firefox",
            		"data": [
            		[
            		"v58.0",
            		1.02
            		],
            		[
            		"v57.0",
            		7.36
            		],
            		[
            		"v56.0",
            		0.35
            		],
            		[
            		"v55.0",
            		0.11
            		],
            		[
            		"v54.0",
            		0.1
            		],
            		[
            		"v52.0",
            		0.95
            		],
            		[
            		"v51.0",
            		0.15
            		],
            		[
            		"v50.0",
            		0.1
            		],
            		[
            		"v48.0",
            		0.31
            		],
            		[
            		"v47.0",
            		0.12
            		]
            		]
            	},
            	{
            		"name": "Internet Explorer",
            		"id": "Internet Explorer",
            		"data": [
            		[
            		"v11.0",
            		6.2
            		],
            		[
            		"v10.0",
            		0.29
            		],
            		[
            		"v9.0",
            		0.27
            		],
            		[
            		"v8.0",
            		0.47
            		]
            		]
            	},
            	{
            		"name": "Safari",
            		"id": "Safari",
            		"data": [
            		[
            		"v11.0",
            		3.39
            		],
            		[
            		"v10.1",
            		0.96
            		],
            		[
            		"v10.0",
            		0.36
            		],
            		[
            		"v9.1",
            		0.54
            		],
            		[
            		"v9.0",
            		0.13
            		],
            		[
            		"v5.1",
            		0.2
            		]
            		]
            	},
            	{
            		"name": "Edge",
            		"id": "Edge",
            		"data": [
            		[
            		"v16",
            		2.6
            		],
            		[
            		"v15",
            		0.92
            		],
            		[
            		"v14",
            		0.4
            		],
            		[
            		"v13",
            		0.1
            		]
            		]
            	},
            	{
            		"name": "Opera",
            		"id": "Opera",
            		"data": [
            		[
            		"v50.0",
            		0.96
            		],
            		[
            		"v49.0",
            		0.82
            		],
            		[
            		"v12.1",
            		0.14
            		]
            		]
            	}
            	]
            }*/
        });
$i--;
}


},
beforeSend: function () {
	mostrarCargando('Cargando datos...');
},
complete: function() {
	cerrarCangando();
}
});
}

function mostrarCargando(msg) {
	$.blockUI({
		message: '<img src="../src/image/loader.gif" style="max-width: 80px;" /><p>'+msg+'</p>',
		overlayCSS: {
			backgroundColor: '#1b2024',
			opacity: 0.8,
			cursor: 'default'
		},
		css: {
			border: 0,
			color: 'black',
			padding: 0,
			backgroundColor: 'transparent',
			cursor: 'default'
		}
	});
}

function cerrarCangando() {
	$.unblockUI();
}
