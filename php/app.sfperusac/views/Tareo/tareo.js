//variables para determinar la empresa que se seleccionó
var codigoSeleccionado;
var filtoLista;
var select = '10';
var fini;
var ffin;
var estado = 'TO';
var tipo = 'TAR';
var cultivo = 'N';
var url;
var data_export;
//variable para determinar la tabla
var tablaTareos, tablaDTareos, tablaDDTareos;
var filename = "Tareo.xlsx";

$(document).ready(function () {
	///$("#full").html(getActualFullDate());
	//  $("#hour").html(getActualHour());
	// $("#date").html(getActualDate());
	//alert(url);
	url=geturl();
list_cultivo();

	$('#liTar').addClass('active');
	$('#FechaInicio').formatter({
		'pattern': '{{9999}}-{{99}}-{{99}}'
	});
	$('#TAR_Fecha').formatter({
		'pattern': '{{9999}}-{{99}}-{{99}}'
	});
	$('#FechaFin').formatter({
		'pattern': '{{9999}}-{{99}}-{{99}}'
	});

	$('#FechaInicio').val(getActualDate());
	fini = getActualDate().replace('-', '').replace('-', '');
	$('#FechaFin').val(getActualDate());
	ffin = getActualDate().replace('-', '').replace('-', '');

	

	//fini = '20200529';
	//ffin = '20200529';
	activarBtnTO();
	//listarTareo();
	if(sessionStorage.getItem("dominio")=='FFP' || sessionStorage.getItem("dominio")=='VALLEPAMPA')
	{
		
		$('#btnEnviar').removeClass('blue');
		$('#btnEnviar').addClass('amber');
		$('#btnExportarA2').hide();
	}else{
		$('#btnEnviar').removeClass('amber');
		$('#btnEnviar').addClass('blue');
	}
	$('#btnExportarA').click(function () {
		
		//export_excel();
		//doit("xlsx");
		save();
	});
	$('#btnExportarA2').click(function () {
		
		//export_excel();
		//doit("xlsx");
		Excelv2();
	});
	$("#btn_cerrar_proceso").on("click", function() {
        $('#modalProceso').modal('close');
     });
	$('#btnEnviar').click(function () {
		if(sessionStorage.getItem("dominio")=='FFP' || sessionStorage.getItem("dominio")=='VALLEPAMPA')
		{
			upload_tareo();
		}else{
			mostrarProceso($(this).attr('codigo'),$(this).attr('det_id'),$(this).attr('ddt_id'),$(this).attr('hinicio'),$(this).attr('hfin'),$(this).attr('horas'),$(this).attr('rendimiento'),$(this).attr('idtrabajador'));

		}
	});

	//Accion de BOTONES de formulario Empresa
	$('#btnAplica').click(function () {
		estado = $('#TAR_Estado').val();
		fini = $('#FechaInicio').val().replace('-', '').replace('-', '');
		ffin = $('#FechaFin').val().replace('-', '').replace('-', '');
		cultivo = $('#TAR_Cultivo').val();
		//alert(estado + fini +ffin +tipo);
		listarTareo();
		activar();
	});
	$('#btnCancel').click(function () {
		$('#tareomodal').modal('close');
	});
	$('#btnCancelTareo').click(function () {
		$('#modalTareo').modal('close');
	});
	$('#btnFiltro').click(function () {
		$('#tareomodal').modal('open');
	});
	$('#btnAplicaTareo').click(function () {
		cambiarFecha_tareo($('#TAR_Codigo').val(),sessionStorage.getItem("username"),$('#TAR_Fecha').val());
	});

	$('#btnToKilogramos').click(function () {
		toKilos($('#FechaInicio').val(),$('#TAR_Cultivo').val(),sessionStorage.getItem("username"));	

	});
	$('#btnToHoras').click(function () {
		obtenerhoras($('#FechaInicio').val(),$('#txtHInicio').val(),$('#txtHInicioReceso').val(),$('#txtHFinReceso').val(),$('#txtTHoras').val(),$('#TAR_Cultivo').val(),sessionStorage.getItem("username"));	

	});
	$('#btnExportDay').click(function () {
		upload_tareo();
	});

	var calcDataTableHeight = function () {
		return $(window).height() - 330 + "px";
	};
	construyetabla();

	function addZero(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}

	function getActualFullDate() {
		var d = new Date();
		var day = addZero(d.getDate());
		var month = addZero(d.getMonth() + 1);
		var year = addZero(d.getFullYear());
		var h = addZero(d.getHours());
		var m = addZero(d.getMinutes());
		var s = addZero(d.getSeconds());
		return day + ". " + month + ". " + year + " (" + h + ":" + m + ")";
	}
	function getActualHour() {
		var d = new Date();
		var h = addZero(d.getHours());
		var m = addZero(d.getMinutes());
		var s = addZero(d.getSeconds());
		return h + ":" + m + ":" + s;
	}

	function getActualDate() {
		var d = new Date();
		var day = addZero(d.getDate());
		var month = addZero(d.getMonth() + 1);
		var year = addZero(d.getFullYear());
		return year + "-" + month + "-" + day;
	}

	function construyetabla() {

		switch (tipo) {
			case 'TAR':
				tablaTareos = $('#tablaTareos').DataTable({

					/*sScrollY: calcDataTableHeight(),
					scrollCollapse: true,*/
					paging: true,
					info: true,
					responsive: true,
					bSort: true,
					lengthMenu: [[10, 30, 50, -1], [10, 30, 50, 'Todos']],
					bProcessing: true,
					scrollX: true,
					pageLength: select,
					columnDefs: [{
						orderable: false,
						targets: [3, 4]
					}],
					language: {

						lengthMenu: "Mostrar _MENU_ registros por p&aacutegina",
						// "lengthMenu": '<div class="dataTables_legth" id="page-length-option_length"><label>Show <select name="page-length-option_length" aria-controls="page-length-option" class=""><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="-1">All</option></select> entries</label></div>',
						info: "P&aacutegina _PAGE_ of _PAGES_",
						"sProcessing": "Procesando...",

						// "sLengthMenu":     "Mostrar _MENU_ registros",

						"sZeroRecords": "No se encontraron resultados",

						"sEmptyTable": "Ningún dato disponible en esta tabla",

						"sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
						"sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",

						"sInfoFiltered": "(filtrado de un total de _MAX_ registros)",

						"sInfoPostFix": "",

						"sSearch": "Buscar:",

						"sUrl": "",

						"sInfoThousands": ",",

						"sLoadingRecords": "Cargando...",


						"oPaginate": {

							"sFirst": "Primero",

							"sLast": "Último",

							"sNext": "Siguiente",

							"sPrevious": "Anterior"

						},

						"oAria": {

							"sSortAscending": ": Activar para ordenar la columna de manera ascendente",

							"sSortDescending": ": Activar para ordenar la columna de manera descendente"

						}


					}

				});
				break;
			case 'DTA':
				tablaDTareos = $('#tablaDTareos').DataTable({

					/*sScrollY: calcDataTableHeight(),
					scrollCollapse: true,*/
					paging: true,
					info: true,
					responsive: true,
					bSort: true,
					lengthMenu: [[10, 30, 50, -1], [10, 30, 50, 'Todos']],
					bProcessing: true,
					scrollX: true,
					pageLength: select,
					columnDefs: [{
						orderable: false,
						targets: [3, 4]
					}],
					language: {

						lengthMenu: "Mostrar _MENU_ registros por p&aacutegina",
						// "lengthMenu": '<div class="dataTables_legth" id="page-length-option_length"><label>Show <select name="page-length-option_length" aria-controls="page-length-option" class=""><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="-1">All</option></select> entries</label></div>',
						info: "P&aacutegina _PAGE_ of _PAGES_",
						"sProcessing": "Procesando...",

						// "sLengthMenu":     "Mostrar _MENU_ registros",

						"sZeroRecords": "No se encontraron resultados",

						"sEmptyTable": "Ningún dato disponible en esta tabla",

						"sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
						"sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",

						"sInfoFiltered": "(filtrado de un total de _MAX_ registros)",

						"sInfoPostFix": "",

						"sSearch": "Buscar:",

						"sUrl": "",

						"sInfoThousands": ",",

						"sLoadingRecords": "Cargando...",


						"oPaginate": {

							"sFirst": "Primero",

							"sLast": "Último",

							"sNext": "Siguiente",

							"sPrevious": "Anterior"

						},

						"oAria": {

							"sSortAscending": ": Activar para ordenar la columna de manera ascendente",

							"sSortDescending": ": Activar para ordenar la columna de manera descendente"

						}


					}

				});
				break;
			case 'DDT':
				tablaDDTareos = $('#tablaDDTareos').DataTable({

					/*sScrollY: calcDataTableHeight(),
					scrollCollapse: true,*/
					paging: true,
					info: true,
					responsive: true,
					bSort: true,
					lengthMenu: [[10, 30, 50, -1], [10, 30, 50, 'Todos']],
					bProcessing: true,
					scrollX: true,
					pageLength: select,
					columnDefs: [{
						orderable: false,
						targets: [3, 4]
					}],
					language: {

						lengthMenu: "Mostrar _MENU_ registros por p&aacutegina",
						// "lengthMenu": '<div class="dataTables_legth" id="page-length-option_length"><label>Show <select name="page-length-option_length" aria-controls="page-length-option" class=""><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="-1">All</option></select> entries</label></div>',
						info: "P&aacutegina _PAGE_ of _PAGES_",
						"sProcessing": "Procesando...",

						// "sLengthMenu":     "Mostrar _MENU_ registros",

						"sZeroRecords": "No se encontraron resultados",

						"sEmptyTable": "Ningún dato disponible en esta tabla",

						"sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
						"sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",

						"sInfoFiltered": "(filtrado de un total de _MAX_ registros)",

						"sInfoPostFix": "",

						"sSearch": "Buscar:",

						"sUrl": "",

						"sInfoThousands": ",",

						"sLoadingRecords": "Cargando...",


						"oPaginate": {

							"sFirst": "Primero",

							"sLast": "Último",

							"sNext": "Siguiente",

							"sPrevious": "Anterior"

						},

						"oAria": {

							"sSortAscending": ": Activar para ordenar la columna de manera ascendente",

							"sSortDescending": ": Activar para ordenar la columna de manera descendente"

						}


					}

				});
				break;
		}

		// Custom search tareo
		function filterGlobaltareo() {
			tablaTareos.search($("#global_filter_tareo").val(), $("#global_regex").prop("checked"), $("#global_smart").prop("checked")).draw();
		}

		$("input#global_filter_tareo").on("keyup click", function () {
			filterGlobaltareo();
		});

		// Custom search dtareo
		function filterGlobaldtareo() {
			tablaDTareos.search($("#global_filter_dtareo").val(), $("#global_regex").prop("checked"), $("#global_smart").prop("checked")).draw();
		}

		$("input#global_filter_dtareo").on("keyup click", function () {
			filterGlobaldtareo();
		});

		// Custom search ddtareo
		function filterGlobalddtareo() {
			tablaDDTareos.search($("#global_filter_ddtareo").val(), $("#global_regex").prop("checked"), $("#global_smart").prop("checked")).draw();
		}

		$("input#global_filter_ddtareo").on("keyup click", function () {
			filterGlobalddtareo();
		});
		$('#tablaTareos_length').val(select);
		//$('#tablaCultivoVariedades_length').formSelect();

	}

	/* if ($(".app-page .dataTables_scrollBody").length > 0) {
		var ps_datatable_body = new PerfectScrollbar(".app-page .dataTables_scrollBody", {
		  // theme: "dark"
		});
	 }
	*/

	// Modals Popup
	$(".modal").modal({
		dismissible: false,
		onOpenEnd: function () {

		}
	});


	$('#tabTAREO').click(function () {
		tipo = 'TAR';
		estado = 'TO';
		activarBtnTO();
		desactivarBtnPE();
		desactivarBtnAP();
		desactivarBtnEx();
		desactivarBtnAN();
		if (tablaTareos == 'undefined') {

			construyetabla();
		}

		listarTareo();
	});
	$('#tabDTAREO').click(function () {
		tipo = 'DTA';
		estado = 'TO';
		activarBtnTO();
		desactivarBtnPE();
		desactivarBtnAP();
		desactivarBtnEx();
		desactivarBtnAN();
		//alert(tablaDTareos);
		if (typeof (tablaDTareos) == 'undefined') {

			construyetabla();
		}
		listarTareo();
	});
	$('#tabDDTAREO').click(function () {
		tipo = 'DDT';
		estado = 'TO';
		activarBtnTO();
		desactivarBtnPE();
		desactivarBtnAP();
		desactivarBtnEx();
		desactivarBtnAN();
		if (typeof (tablaDDTareos) == 'undefined') {

			construyetabla();
		}
		listarTareo();
	});

	//botones para listar
	$('#btnTAR_All,#btnDTAR_All,#btnDDTAR_All').click(function () {
		activarBtnTO();
		desactivarBtnPE();
		desactivarBtnAP();
		desactivarBtnEx();
		desactivarBtnAN();
		estado = 'TO';
		listarTareo();
	})
	$('#btnTAR_PE,#btnDTAR_PE,#btnDDTAR_PE').click(function () {
		activarBtnPE();
		desactivarBtnTO();
		desactivarBtnAP();
		desactivarBtnEx();
		desactivarBtnAN();
		estado = 'PE';
		listarTareo();
	})
	$('#btnTAR_AP,#btnDTAR_AP,#btnDDTAR_AP').click(function () {
		activarBtnAP();
		desactivarBtnTO();
		desactivarBtnPE();
		desactivarBtnEx();
		desactivarBtnAN();
		estado = 'AP';
		listarTareo();
	})
	$('#btnTAR_EX,#btnDTAR_EX,#btnDDTAR_EX').click(function () {
		activarBtnEx();
		desactivarBtnTO();
		desactivarBtnAP();
		desactivarBtnPE();
		desactivarBtnAN();
		estado = 'EX';
		listarTareo();
	})
	$('#btnTAR_AN,#btnDTAR_AN,#btnDDTAR_AN').click(function () {
		activarBtnAN();
		desactivarBtnTO();
		desactivarBtnAP();
		desactivarBtnEx();
		desactivarBtnPE();
		estado = 'AN';
		listarTareo();
	})


	$(document).on("change", ".dataTables_length select", function(){
		select = $(this).val();
	});


});
$(document).on('click', '.btnExporta', function (e) {
	send_tareo($(this).attr('codigo'));
});

$(document).on('click', '.btnEditarTareo', function (e) {
	codigoSeleccionado = $(this).attr('codigo');
	usuario = $(this).attr('usuario');
	documento = $(this).attr('documento');
	fecha = $(this).attr('fecha');
	mostrarTareo(codigoSeleccionado,usuario,documento,fecha);
	
});

$(document).on('click', '.btnAprobar', function (e) {
	
	aprobar_tareo($(this).attr('codigo'),sessionStorage.getItem("username"));
});

$(document).on('click', '.btnPendiente', function (e) {
	pendiente_tareo($(this).attr('codigo'),sessionStorage.getItem("username"));
});
$(document).on('click', '.btnEliminar', function (e) {
	eliminar_tareo($(this).attr('codigo'),sessionStorage.getItem("username"));
});

$(document).on('click', '.btnEditarTrabajador', function (e) {

});
function activar() {
	switch (estado) {
		case 'TO':
			activarBtnTO();
			desactivarBtnPE();
			desactivarBtnAP();
			desactivarBtnEx();
			desactivarBtnAN();
			break;
		case 'PE':
			activarBtnPE();
			desactivarBtnTO();
			desactivarBtnAP();
			desactivarBtnEx();
			desactivarBtnAN();
			break;
		case 'AP':
			activarBtnAP();
			desactivarBtnPE();
			desactivarBtnTO();
			desactivarBtnEx();
			desactivarBtnAN();
			break;
		case 'EX':
			activarBtnEx();
			desactivarBtnPE();
			desactivarBtnTO();
			desactivarBtnAP();
			desactivarBtnAN();
			break;
		case 'AN':
			activarBtnAN();
			desactivarBtnPE();
			desactivarBtnTO();
			desactivarBtnEx();
			desactivarBtnAP();
			break;
	}
}


//activar botones listar
function activarBtnTO() {
	switch (tipo) {
		case 'TAR':
			$('#btnTAR_All').removeClass('white');
			$('#btnTAR_All').css('color', 'white');
			$('#btnTAR_All').addClass('deep-purple darken-1');
			break;
		case 'DTA':
			$('#btnDTAR_All').removeClass('white');
			$('#btnDTAR_All').css('color', 'white');
			$('#btnDTAR_All').addClass('deep-purple darken-1');
			break;
		case 'DDT':
			$('#btnDDTAR_All').removeClass('white');
			$('#btnDDTAR_All').css('color', 'white');
			$('#btnDDTAR_All').addClass('deep-purple darken-1');
			break;
	}

}
function activarBtnPE() {
	switch (tipo) {
		case 'TAR':
			$('#btnTAR_PE').removeClass('white');
			$('#btnTAR_PE').css('color', 'white');
			$('#btnTAR_PE').addClass('orange');
			break;
		case 'DTA':
			$('#btnDTAR_PE').removeClass('white');
			$('#btnDTAR_PE').css('color', 'white');
			$('#btnDTAR_PE').addClass('orange');
			break;
		case 'DDT':
			$('#btnDDTAR_PE').removeClass('white');
			$('#btnDDTAR_PE').css('color', 'white');
			$('#btnDDTAR_PE').addClass('orange');
			break;
	}

}
function activarBtnAP() {
	switch (tipo) {
		case 'TAR':
			$('#btnTAR_AP').removeClass('white');
			$('#btnTAR_AP').css('color', 'white');
			$('#btnTAR_AP').addClass('green darken-3');
			break;
		case 'DTA':
			$('#btnDTAR_AP').removeClass('white');
			$('#btnDTAR_AP').css('color', 'white');
			$('#btnDTAR_AP').addClass('green darken-3');
			break;
		case 'DDT':
			$('#btnDDTAR_AP').removeClass('white');
			$('#btnDDTAR_AP').css('color', 'white');
			$('#btnDDTAR_AP').addClass('green darken-3');
			break;
	}

}

function activarBtnEx() {
	switch (tipo) {
		case 'TAR':
			$('#btnTAR_EX').removeClass('white');
			$('#btnTAR_EX').css('color', 'white');
			$('#btnTAR_EX').addClass('light-blue darken-4');
			break;
		case 'DTA':
			$('#btnDTAR_EX').removeClass('white');
			$('#btnDTAR_EX').css('color', 'white');
			$('#btnDTAR_EX').addClass('light-blue darken-4');
			break;
		case 'DDT':
			$('#btnDDTAR_EX').removeClass('white');
			$('#btnDDTAR_EX').css('color', 'white');
			$('#btnDDTAR_EX').addClass('light-blue darken-4');
			break;
	}
}
function activarBtnAN() {
	switch (tipo) {
		case 'TAR':
			$('#btnTAR_AN').removeClass('white');
			$('#btnTAR_AN').css('color', 'white');
			$('#btnTAR_AN').addClass('red');
			break;
		case 'DTA':
			$('#btnDTAR_AN').removeClass('white');
			$('#btnDTAR_AN').css('color', 'white');
			$('#btnDTAR_AN').addClass('red');
			break;
		case 'DDT':
			$('#btnDDTAR_AN').removeClass('white');
			$('#btnDDTAR_AN').css('color', 'white');
			$('#btnDDTAR_AN').addClass('red');
			break;
	}
}


//desactivar botones
function desactivarBtnTO() {
	switch (tipo) {
		case 'TAR':
			$('#btnTAR_All').addClass('white');
			$('#btnTAR_All').css('color', 'black');
			$('#btnTAR_All').removeClass('deep-purple darken-1');
			break;
		case 'DTA':
			$('#btnDTAR_All').addClass('white');
			$('#btnDTAR_All').css('color', 'black');
			$('#btnDTAR_All').removeClass('deep-purple darken-1');
			break;
		case 'DDT':
			$('#btnDDTAR_All').addClass('white');
			$('#btnDDTAR_All').css('color', 'black');
			$('#btnDDTAR_All').removeClass('deep-purple darken-1');
			break;
	}

}
function desactivarBtnAP() {
	switch (tipo) {
		case 'TAR':
			$('#btnTAR_AP').addClass('white');
			$('#btnTAR_AP').css('color', 'black');
			$('#btnTAR_AP').removeClass('green darken-3');
			break;
		case 'DTA':
			$('#btnDTAR_AP').addClass('white');
			$('#btnDTAR_AP').css('color', 'black');
			$('#btnDTAR_AP').removeClass('green darken-3');
			break;
		case 'DDT':
			$('#btnDDTAR_AP').addClass('white');
			$('#btnDDTAR_AP').css('color', 'black');
			$('#btnDDTAR_AP').removeClass('green darken-3');
			break;
	}

}

function desactivarBtnPE() {
	switch (tipo) {
		case 'TAR':
			$('#btnTAR_PE').addClass('white');
			$('#btnTAR_PE').css('color', 'black');
			$('#btnTAR_PE').removeClass('orange');
			break;
		case 'DTA':
			$('#btnDTAR_PE').addClass('white');
			$('#btnDTAR_PE').css('color', 'black');
			$('#btnDTAR_PE').removeClass('orange');
			break;
		case 'DDT':
			$('#btnDDTAR_PE').addClass('white');
			$('#btnDDTAR_PE').css('color', 'black');
			$('#btnDDTAR_PE').removeClass('orange');
			break;
	}

}
function desactivarBtnEx() {
	switch (tipo) {
		case 'TAR':
			$('#btnTAR_EX').addClass('white');
			$('#btnTAR_EX').css('color', 'black');
			$('#btnTAR_EX').removeClass('light-blue darken-4');
			break;
		case 'DTA':
			$('#btnDTAR_EX').addClass('white');
			$('#btnDTAR_EX').css('color', 'black');
			$('#btnDTAR_EX').removeClass('light-blue darken-4');
			break;
		case 'DDT':
			$('#btnDDTAR_EX').addClass('white');
			$('#btnDDTAR_EX').css('color', 'black');
			$('#btnDDTAR_EX').removeClass('light-blue darken-4');
			break;
	}
}
function desactivarBtnAN() {
	switch (tipo) {
		case 'TAR':
			$('#btnTAR_AN').addClass('white');
			$('#btnTAR_AN').css('color', 'black');
			$('#btnTAR_AN').removeClass('red');
			break;
		case 'DTA':
			$('#btnDTAR_AN').addClass('white');
			$('#btnDTAR_AN').css('color', 'black');
			$('#btnDTAR_AN').removeClass('red');
			break;
		case 'DDT':
			$('#btnDDTAR_AN').addClass('white');
			$('#btnDDTAR_AN').css('color', 'black');
			$('#btnDDTAR_AN').removeClass('red');
			break;
	}
}


//funcion para mostrar botones de accion en la tabla tareos
var _acciones_tareo = function (codigo,usuario,documento,fecha,estado) {
	cadena = '';
	if(estado=='PE' )
	{
		cadena = '<button title="Editar" codigo="' + codigo + '" usuario="' + usuario + '" documento="' + documento + '" fecha="' + fecha + '" class="mb-2 btn-floating waves-effect waves-light gradient-45deg-blue-indigo gradient-shadow border-round btn-small btnEditarTareo" type="button" style="margin-right: 5px;"><i class="material-icons white-text">edit</i>' +
		'</button><button title="Eliminar" codigo="' + codigo + '" class="mb-2 btn-floating waves-effect waves-light red gradient-shadow border-round btn-small btnEliminar" type="button" style="margin-right: 5px;"><i class="material-icons white-text">delete</i></button>'+
		'<button title="Aprobar" codigo="' + codigo + '" class="mb-2 btn-floating waves-effect waves-light green gradient-shadow border-round btn-small btnAprobar" type="button" style="margin-right: 5px;"><i class="material-icons white-text">check</i></button>';

	}
	if(estado=='AP')
	{
		cadena = '<button title="Editar" codigo="' + codigo + '" usuario="' + usuario + '" documento="' + documento + '" fecha="' + fecha + '" class="mb-2 btn-floating waves-effect waves-light gradient-45deg-blue-indigo gradient-shadow border-round btn-small btnEditarTareo" type="button" style="margin-right: 5px;"><i class="material-icons white-text">edit</i>' +
		'</button><button title="Eliminar" codigo="' + codigo + '" class="mb-2 btn-floating waves-effect waves-light red gradient-shadow border-round btn-small btnEliminar" type="button" style="margin-right: 5px;"><i class="material-icons white-text">delete</i></button>'+
		'</button><button title="Exportar" codigo="' + codigo + '" class="mb-2 btn-floating waves-effect waves-light blue gradient-shadow border-round btn-small btnExporta" type="button" style="margin-right: 5px;"><i class="material-icons white-text">send</i></button>'+
		'<button title="Pendiente" codigo="' + codigo + '" class="mb-2 btn-floating waves-effect waves-light amber gradient-shadow border-round btn-small btnPendiente" type="button" style="margin-right: 5px;"><i class="material-icons white-text">replay</i></button>';

	}


	if(sessionStorage.getItem("dominio")=='FFP' || sessionStorage.getItem("dominio")=='VALLEPAMPA')
	{
		cadena = '<button title="Editar" codigo="' + codigo + '" usuario="' + usuario + '" documento="' + documento + '" fecha="' + fecha + '" class="mb-2 btn-floating waves-effect waves-light gradient-45deg-blue-indigo gradient-shadow border-round btn-small btnEditarTareo" type="button" style="margin-right: 5px;"><i class="material-icons white-text">edit</i>' +
		'</button><button title="Eliminar" codigo="' + codigo + '" class="mb-2 btn-floating waves-effect waves-light red gradient-shadow border-round btn-small btnEliminar" type="button" style="margin-right: 5px;"><i class="material-icons white-text">delete</i></button>';
		
	
	}

	return cadena;
	
}

var _acciones_trabajador = function (codigo,det_id,ddt_id,hinicio,hfin,horas,rendimiento,idtrabajador,estado) {
	cadenadd='';
	if(estado=='PE' )
		{
			cadenadd = '<button title="Editar" codigo="' + codigo + '" det_id="' + det_id + '" ddt_id="' + ddt_id + '" hinicio="' + hinicio + '" hfin="' + hfin + '"  horas="' + horas + '" rendimiento="' + rendimiento + '" idtrabajador="' + idtrabajador + '"  class="mb-2 btn-floating waves-effect waves-light gradient-45deg-blue-indigo gradient-shadow border-round btn-small btnEditarTrabajador" type="button" style="margin-right: 5px;"><i class="material-icons white-text">edit</i></button>' +
	       '<button title="Eliminar" codigo="' + codigo + '" det_id="' + det_id + '" ddt_id="' + ddt_id +'" idtrabajador="' + idtrabajador + '"  class="mb-2 btn-floating waves-effect waves-light red gradient-shadow border-round btn-small btnEliminar" type="button" style="margin-right: 5px;"><i class="material-icons white-text">delete</i></button>';
	
		}
	if(sessionStorage.getItem("dominio")=='FFP' || sessionStorage.getItem("dominio")=='VALLEPAMPA')
		{
			cadenadd = '';
		
		}
		return cadenadd;

		}
//funcion para mostrar botones de cambio de estado en la tabla empresa
var _cambState = function (codigo, state) {
	if (state == 1) {
		return '<button title="Anular" codigo="' + codigo + '" class="mb-2 btn-floating waves-effect waves-light red gradient-shadow border-round btn-small btnAnular" type="button" style="margin-right: 5px;"><i class="material-icons white-text">close</i></button>';
	} else {
		return '<button title="Activar" codigo="' + codigo + '" class="mb-2 btn-floating waves-effect waves-light green gradient-shadow border-round btn-small btnActivar" type="button" style="margin-right: 5px;"><i class="material-icons white-text">check</i></button>';
	}
}

function list_cultivo() {

    $.ajax({
        async: false,
        type: "POST",
        url: url,
        dataType: 'json',
        data: {
            controller: 'Cultivo',
            accion: 'listar_app',
            
        },
        success: function (resp) {
            console.log(resp);
            if (resp.length == 0) {
                M.toast({ html: 'Error al listar cultivo' });
            } else {
                $(resp).each(function (i, e) {
                    var option = $(document.createElement('option'));
                    option.text(e.descripcion);
                    option.val(e.idcultivo);
                    $("#TAR_Cultivo").append(option);

                });
                $('#TAR_Cultivo').formSelect();
            }

        }
    }).fail(function (jqXHR, textStatus, errorThrown) {

        alert('Error!!' + errorThrown);

    });
}

//funcion para cargar datos de TAREOS
function listarTareo() {
	//alert(tablaTareos +'-'+ tablaDTareos + '-'+ tablaDDTareos);
	swal({
		title: "Listar: Tareos",
		html:true,
		text:'<br><br> <div style="width: 100px;height: 100px;"> <div id="loader-wrapper" ><div id="loader"></div></div> </div><br><br>',                   
		confirmButtonClass: "btn-danger",
		confirmButtonText: "Espere un momento...",
		closeOnConfirm: false,
		closeOnCancel: false
		},function (isConfirm) {
		  if (isConfirm) {
			return false;
		  } 
		});

	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		data: {
			controller: 'Tareo',
			accion: 'listar',
			fini: fini,
			ffin: ffin,
			estado: estado,
			tipo: tipo,
			cultivo: cultivo
		},
		success: function (resp) {

			switch (tipo) {
				case 'TAR':
					tablaTareos.clear().draw(false);
					data_export= Array();
					data_export.push(['ITEM','IDUSUARIO','IDTRABAJADOR','NOMBRES','PLANILLA','DOCUMENTO',
					'CANT.','ESTADO','TURNO','SEMANA','EQUIPO','FECHA EJECUCION']);
					$(resp).each(function (i, e) {
						filename=e.documento+" "+e.codigo_usuario+"["+e.fechaejecucion+"].xlsx";
						fila = [i + 1, e.codigo_usuario, e.idtrabajador, e.nombres, e.idplanilla, e.documento, e.cantidad, e.estado,
						e.tar_turno, e.semana, e.imei, e.fechaejecucion, _acciones_tareo(e.idtareo,e.codigo_usuario,e.documento,e.fechaejecucion,e.estado)];
						tablaTareos.row.add(fila).draw(true);
						row=[i + 1, e.codigo_usuario, e.idtrabajador, e.nombres, e.idplanilla, e.documento, e.cantidad, e.estado,
							e.tar_turno, e.semana, e.imei, e.fechaejecucion];
						data_export.push(row);
					});
					swal.close();
					break;
				case 'DTA':
					tablaDTareos.clear().draw(false);
					data_export= Array();
					data_export.push(['ITEM','IDUSUARIO','DOCUMENTO','PLANILLA','CULTIVO','VARIEDAD','ACTIVIDAD','LABOR','CONSUMIDOR','CANT.','ESTADO','EQUIPO','FECHA EJECUCION','OPCIONES']);
					$(resp).each(function (i, e) {

						fila = [i + 1, e.codigo_usuario, e.documento, e.idplanilla, e.cultivo, e.variedad, e.actividad, e.labor, e.consumidor, e.cantidad, e.estado,
							e.imei, e.fechaejecucion,''];
						tablaDTareos.row.add(fila).draw(true);
						row=[i + 1, e.codigo_usuario, e.documento, e.idplanilla, e.cultivo, e.variedad, e.actividad, e.labor, e.consumidor, e.cantidad, e.estado,
							e.imei, e.fechaejecucion];
						data_export.push(row);

					});
					swal.close();
					break;
				case 'DDT':

					tablaDDTareos.clear().draw(false);
					data_export= Array();
					data_export.push(['ITEM','IDUSUARIO','DOCUMENTO','PLANILLA','CULTIVO','VARIEDAD','ACTIVIDAD','LABOR','CONSUMIDOR','IDTRABAJADOR','NRO. DOC','TRABAJADOR','HORAS','RENDIMIENTO','H. INICIO','H. FIN',
					'H. EXTRA','CONCEPTO','BONO','ESTADO','EQUIPO','FECHA EJECUCION']);
					
					$(resp).each(function (i, e) {
						fila = [i + 1, e.codigo_usuario, e.documento, e.idplanilla, e.cultivo, e.variedad, e.actividad, e.labor, e.consumidor, e.idtrabajador, e.nrodocumento, e.nombres,
						e.num_horas, e.rendimiento, e.hinicio, e.hfin, e.hor_extra, e.tconcepto, e.bono, e.estado,
						e.imei, e.fechaejecucion, _acciones_trabajador(e.idtareo,e.det_id,e.ddt_id,e.hinicio,e.hfin,e.num_horas,e.rendimiento,e.idtrabajador,e.estado)];
						tablaDDTareos.row.add(fila).draw(true);
						row=[i + 1, e.codigo_usuario, e.documento, e.idplanilla, e.cultivo, e.variedad, e.actividad, e.labor, e.consumidor, e.idtrabajador, e.nrodocumento, e.nombres,
							e.num_horas, e.rendimiento, e.hinicio, e.hfin, e.hor_extra, e.tconcepto, e.bono, e.estado,
							e.imei, e.fechaejecucion];
						data_export.push(row);
					});
					swal.close();
					break;
			}


		}
	});
}
function datenum(v, date1904) {
	if(date1904) v+=1462;
	var epoch = Date.parse(v);
	return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}
 
function sheet_from_array_of_arrays(data, opts) {
	var ws = {};
	var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
	for(var R = 0; R != data.length; ++R) {
		for(var C = 0; C != data[R].length; ++C) {
			if(range.s.r > R) range.s.r = R;
			if(range.s.c > C) range.s.c = C;
			if(range.e.r < R) range.e.r = R;
			if(range.e.c < C) range.e.c = C;
			var cell = {v: data[R][C] };
			if(cell.v == null) continue;
			var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
			
			if(typeof cell.v === 'number') cell.t = 'n';
			else if(typeof cell.v === 'boolean') cell.t = 'b';
			else if(cell.v instanceof Date) {
				cell.t = 'n'; cell.z = XLSX.SSF._table[14];
				cell.v = datenum(cell.v);
			}
			else cell.t = 's';
			
			if(C == 0){
				cell.s={
					font:{
						bold:true
					}
				}
			}
			if(R == 0){
				cell.s={
					fill:{
						fgColor:{ rgb: "0137123" }
					},
					font:{
						bold:true,
						color:{ rgb: "FFFFFFFF" }
					},
					length:{
						width:200
					},
				}
			}
			
			ws[cell_ref] = cell;
		}
	}
	if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
	return ws;
}
 

function Workbook() {
	if(!(this instanceof Workbook)) return new Workbook();
	this.SheetNames = [];
	this.Sheets = {};
}
 

function s2ab(s) {
	var buf = new ArrayBuffer(s.length);
	var view = new Uint8Array(buf);
	for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
	return buf;
}

function save(){
	/* original data */
	var data = data_export;
	var ws_name = "TablaTareos";
	 
	var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
	 
	/* add worksheet to workbook */
	wb.SheetNames.push(ws_name);
	wb.Sheets[ws_name] = ws;
	var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});

	saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), filename)
}

function read_(){
	/* set up XMLHttpRequest */
	var url = "sample.xlsx";
	var oReq = new XMLHttpRequest();
	oReq.open("GET", url, true);
	oReq.responseType = "arraybuffer";

	oReq.onload = function(e) {
		var arraybuffer = oReq.response;

		/* convert data to binary string */
		var data = new Uint8Array(arraybuffer);
		var arr = new Array();
		for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
		var bstr = arr.join("");

		/* Call XLSX */
		var workbook = XLSX.read(bstr, {type:"binary"});
		console.log(workbook);
		/* DO SOMETHING WITH workbook HERE */

		var first_sheet_name = workbook.SheetNames[0];
		var address_of_cell = 'A1';

		/* Get worksheet */
		var worksheet = workbook.Sheets[first_sheet_name];
		
		/* Find desired cell */
		var desired_cell = worksheet[address_of_cell];

		/* Get the value */
		var desired_value = desired_cell.v;
	  
	  
		var wb = new Workbook(), ws = worksheet;
	 
		/* add worksheet to workbook */
		wb.SheetNames.push("new");
		wb.Sheets["new"] = ws;
		var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});

		saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "sample.xlsx")
	}

	oReq.send();
}
//Descargar información de servidor
function upload_tareo()
{
    swal({
    title: "Exportando: Tareos",
    html:true,
    text:'<br><br> <div style="width: 100px;height: 100px;"> <div id="loader-wrapper" ><div id="loader"></div></div> </div><br><br>',                   
    confirmButtonClass: "btn-danger",
    confirmButtonText: "Espere un momento...",
    closeOnConfirm: false,
    closeOnCancel: false
    },function (isConfirm) {
      if (isConfirm) {
        return false;
      } 
    });
//alert(url + codigoEmp +codigoSuc + ruta+metodo_exter+header+ tabla);
       
        
 if(sessionStorage.getItem("dominio")=='FFP' || sessionStorage.getItem("dominio")=='VALLEPAMPA')
 {
	 $.ajax({
            url: url,
            method: "POST",
            data:{
                controller: 'IntegraSIDIGE',
                accion: 'exportar_tareo',
                fini: fini,
                ffin: ffin,
                estado:estado
                      },
            dataType:"json",
            success:function(r){
console.log(r.respuesta);
				if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error'){
                    console.log(r);
                    swal("Envío exitoso", "Los tareos fueron exportados con éxito", "success");
                    //swal.close();
					listarTareo();
                
                }else{
                      if( (r.respuesta).substr(0,5)=='Error')
                      {
                        swal("Error", r.respuesta, "error");
                      }else{
                          swal("Error", "Ocurrió un error", "error");
                      }

                    }
                
					




                }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
				   //alert( 'Error!!' + errorThrown );
				   console.log(jqXHR);
                    //swal("Error", "Ocurrió un error: " + errorThrown, "error");
                    listarTareo();
        });
	} else {
		
		$.ajax({
			url: url,
			method: "POST",
			data: {
				controller: 'Tareo',
				accion: 'sendTareo_xdia',
				fechaprogramacion: fini,
				cultivo: cultivo
			},
			dataType: "json",
			success: function (r) {
				
				$(r).each(function (i, e) {
					
					if (e.mensaje != '' && (e.mensaje).substr(0, 5) != 'Error') {
						console.log(e);
						swal("Envío exitoso", "Los tareos fueron exportados con éxito", "success");
						listarTareo();

					} else {
						if ((e.mensaje).substr(0, 5) == 'Error') {
							swal("Error", e.mensaje, "error");
						} else {
							swal("Error", "Ocurrió un error", "error");
						}

					}

					

				});

			}
		}).fail(function (jqXHR, textStatus, errorThrown) {
			// alert( 'Error!!' + errorThrown );
			console.log(jqXHR);
			swal("Error", "Ocurrió un error: " + errorThrown, "error");

		});
	}






	//.done(function (response) {
	//    console.log(response);
	// }
	//);

	/*.fail( function( jqXHR, textStatus, errorThrown ) {
			alert( 'Error!!' + errorThrown );});*/




}

function send_tareo(codigo) {
	// alert(ruta + tabla + JSON.stringify(header));
	swal({
		title: "Exportando: Tareo",
		html: true,
		text: '<br><br> <div style="width: 100px;height: 100px;"> <div id="loader-wrapper" ><div id="loader"></div></div> </div><br><br>',
		confirmButtonClass: "btn-danger",
		confirmButtonText: "Espere un momento...",
		closeOnConfirm: false,
		closeOnCancel: false
	}, function (isConfirm) {
		if (isConfirm) {
			return false;
		}
	});
	//alert(url + codigoEmp +codigoSuc + ruta+metodo_exter+header+ tabla);

	if (sessionStorage.getItem("dominio") == 'FFP' || sessionStorage.getItem("dominio") == 'VALLEPAMPA') {

	} else {


		$.ajax({
			url: url,
			method: "POST",
			data: {
				controller: 'Tareo',
				accion: 'sendTareo',
				idtareo: codigo
			},
			dataType: "json",
			success: function (r) {

				$(r).each(function (i, e) {
					
					if (e.mensaje != '' && (e.mensaje).substr(0, 5) != 'Error') {
						console.log(e);
						swal("Envío exitoso", "El tareo fue exportado con éxito", "success");
						listarTareo();

					} else {
						if ((e.mensaje).substr(0, 5) == 'Error') {
							swal("Error", e.mensaje, "error");
						} else {
							swal("Error", "Ocurrió un error", "error");
						}

					}

				
			});

			}
		}).fail(function (jqXHR, textStatus, errorThrown) {
			// alert( 'Error!!' + errorThrown );
			console.log(jqXHR);
			swal("Error", "Ocurrió un error: " + errorThrown, "error");

		});
	}

}

function mostrarTareo(codigo,usuario,documento,fecha){
	
	$('#modalTareo').modal('open');
	$('#inputTARCodigo').addClass('active');
    $('#inputTARUsario').addClass('active');
	$('#inputTARDocumento').addClass('active');
	$('#inputTARFecha').addClass('active');
	$('#TAR_Codigo').val(codigo);
	$('#TAR_Usuario').val(usuario);
	$('#TAR_Documento').val(documento);
	$('#TAR_Fecha').val(fecha);
	$('#TAR_Fecha').focus();
}

function cambiarFecha_tareo(codigo,usuario,fecha) {
	
	swal({
	  title: "¿Desea modificar esta tareo?",
	  text: "Al aceptar el registro será modificado",
	  type: "warning",
	  showCancelButton: true,
	  confirmButtonClass: "btn-danger",
	  confirmButtonText: "Sí, Modificar!",
	  cancelButtonText: "No, cancelar!",
	  closeOnConfirm: false,
	  closeOnCancel: false
	},function (isConfirm) {
	  if (isConfirm) {
		
			  $.ajax({
				  type:"POST",
				  url:url,
				  data:{
					  controller:'Tareo',
					  accion: 'actualizaFecha',
					  idtareo: codigo,
					  idusuario: usuario,
					  fecha: fecha
				  },
				  dataType:'json',
				  success:function(r){
		   
					  if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error') {
						  swal("Modificado!", "El registro fue modificado.", "success");
						  listarTareo();
					  }else{
					  if (r.respuesta!='' ){
						  swal("Error", r.respuesta.substr(6,100), "error");
					  }else{
					   swal("Error", "Ocurrió un error", "error");
					  }
						  
					  }
				  }
			  }).fail( function( jqXHR, textStatus, errorThrown ) {
		  alert( 'Error!!' + errorThrown );
		  });
	  } else {
			  swal("Cancelled", "Operación Cancelada! :)", "error");
	  }
	});
  
  }
  
  function eliminar_tareo(codigo,usuario) {
	  
	swal({
	  title: "¿Desea eliminar este tareo?",
	  text: "Al aceptar el registro será eliminado junto con sus dependencias",
	  type: "warning",
	  showCancelButton: true,
	  confirmButtonClass: "btn-danger",
	  confirmButtonText: "Sí, Eliminar!",
	  cancelButtonText: "No, Cancelar!",
	  closeOnConfirm: false,
	  closeOnCancel: false
	},function (isConfirm) {
	  if (isConfirm) {
		
			  $.ajax({
				  type:"POST",
				  url:url,
				  data:{
					  controller:'Tareo',
					  accion: 'eliminarTareo',
					  idtareo: codigo,
					  idusuario: usuario,
				  },
				  dataType:'json',
				  success:function(r){
		   
					  if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error') {
						  swal("Eliminado!", "El registro fue eliminado.", "success");
						  listarTareo();
					  }else{
					  if (r.respuesta!='' ){
						  swal("Error", r.respuesta.substr(6,100), "error");
					  }else{
					   swal("Error", "Ocurrió un error", "error");
					  }
						  
					  }
				  }
			  }).fail( function( jqXHR, textStatus, errorThrown ) {
		  alert( 'Error!!' + errorThrown );
		  });
	  } else {
			  swal("Cancelled", "Operación Cancelada! :)", "error");
	  }
	});

}

function aprobar_tareo(codigo,usuario) {
	
	swal({
	  title: "¿Desea aprobar este tareo?",
	  text: "Al aceptar el registro será aprobado",
	  type: "warning",
	  showCancelButton: true,
	  confirmButtonClass: "btn-danger",
	  confirmButtonText: "Sí, Aprobar!",
	  cancelButtonText: "No, Cancelar!",
	  closeOnConfirm: false,
	  closeOnCancel: false
	},function (isConfirm) {
	  if (isConfirm) {
		
			  $.ajax({
				  type:"POST",
				  url:url,
				  data:{
					  controller:'Tareo',
					  accion: 'cambiaEstado',
					  idtareo: codigo,
					  idusuario: usuario,
					  idestado: 'AP',
					  observaciones: ''
				  },
				  dataType:'json',
				  success:function(r){
		   
					  if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error') {
						  swal("Aprobado!", "El registro fue aprobado.", "success");
						  listarTareo();
					  }else{
					  if (r.respuesta!='' ){
						  swal("Error", r.respuesta.substr(6,100), "error");
					  }else{
					   swal("Error", "Ocurrió un error", "error");
					  }
						  
					  }
				  }
			  }).fail( function( jqXHR, textStatus, errorThrown ) {
		  alert( 'Error!!' + errorThrown );
		  });
	  } else {
			  swal("Cancelled", "Operación Cancelada! :)", "error");
	  }
	});
  
  }

  function pendiente_tareo(codigo,usuario) {
	
	swal({
	  title: "¿Desea volver a pendiente este tareo?",
	  text: "Al aceptar el registro será regresado a pendiente",
	  type: "warning",
	  showCancelButton: true,
	  confirmButtonClass: "btn-danger",
	  confirmButtonText: "Sí, Pendiente!",
	  cancelButtonText: "No, Cancelar!",
	  closeOnConfirm: false,
	  closeOnCancel: false
	},function (isConfirm) {
	  if (isConfirm) {
		
			  $.ajax({
				  type:"POST",
				  url:url,
				  data:{
					  controller:'Tareo',
					  accion: 'cambiaEstado',
					  idtareo: codigo,
					  idusuario: usuario,
					  idestado: 'PE',
					  observaciones: ''
				  },
				  dataType:'json',
				  success:function(r){
		   
					  if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error') {
						  swal("Actualizado!", "El registro fue actualizado.", "success");
						  listarTareo();
					  }else{
					  if (r.respuesta!='' ){
						  swal("Error", r.respuesta.substr(6,100), "error");
					  }else{
					   swal("Error", "Ocurrió un error", "error");
					  }
						  
					  }
				  }
			  }).fail( function( jqXHR, textStatus, errorThrown ) {
		  alert( 'Error!!' + errorThrown );
		  });
	  } else {
			  swal("Cancelled", "Operación Cancelada! :)", "error");
	  }
	});
  
  }

  function mostrarProceso(codigo,det_id,ddt_id,hinicio,hfin,horas,rendimiento,idtrabajador){
	

	if($('#FechaInicio').val() !='' && $('#TAR_Cultivo').val() !='N'){
		$('#modalProceso').modal('open');
		$('#txtFecha').addClass('active');
		$('#txtFecha_p2').addClass('active');
    	$('#txtCultivo').addClass('active');
		$('#txtCultivo_p2').addClass('active');
		$('#txtFecha').val($('#FechaInicio').val()) ;
		$('#txtFecha_p2').val($('#FechaInicio').val()) ;
		$('#txtFecha_p3').val($('#FechaInicio').val()) ;
		$('#txtCultivo').val($('select[name="TAR_Cultivo"] option:selected').text());
		$('#txtCultivo_p2').val($('select[name="TAR_Cultivo"] option:selected').text());
		$('#txtCultivo_p3').val($('select[name="TAR_Cultivo"] option:selected').text());
		$('#txtHInicio').val('06:30:00.0000000');
		$('#txtHInicioReceso').val('12:00:00.0000000');
		$('#txtHFinReceso').val('13:00:00.0000000');
		$('#txtTHoras').val('9.6');
		
	}else{
		swal({
			title: "Fecha y/o Cultivo errados",
			text: "Corregir a partir de filtro de búsqueda",
			type: "warning",
			
			showCancelButton: false,
			confirmButtonClass: "btn-danger",
			confirmButtonText: "ok",
			closeOnConfirm: true,
			closeOnCancel: false
		});
	}
	

}
function toKilos(fecha,cultivo,usuario){
	
	swal({
		title: "Convirtiendo a Kilogramos",
		html: true,
		text: '<br><br> <div style="width: 100px;height: 100px;"> <div id="loader-wrapper" ><div id="loader"></div></div> </div><br><br>',
		confirmButtonClass: "btn-danger",
		confirmButtonText: "Espere un momento...",
		closeOnConfirm: false,
		closeOnCancel: false
	}, function (isConfirm) {
		if (isConfirm) {
			return false;
		}
	});
	//alert(url + codigoEmp +codigoSuc + ruta+metodo_exter+header+ tabla);
		$.ajax({
			url: url,
			method: "POST",
			data: {
				controller: 'Tareo',
				accion: 'convertir_akilos',
				fejecucion: fecha,
				idcultivo: cultivo,
				idusuario: usuario,
			},
			dataType: "json",
			success: function (r) {
				
				$(r).each(function (i, e) {
					
					if (e.respuesta != '' && (e.respuesta).substr(0, 5) != 'Error') {
						console.log(e);
						swal("Operación exitosa", "La conversión fue realizada con éxito", "success");

					} else {
						if ((e.respuesta).substr(0, 5) == 'Error') {
							swal("Error", e.respuesta, "error");
						} else {
							swal("Error", "Ocurrió un error", "error");
						}

					}

					

				});

			}
		}).fail(function (jqXHR, textStatus, errorThrown) {
			// alert( 'Error!!' + errorThrown );
			console.log(jqXHR);
			swal("Error", "Ocurrió un error: " + errorThrown, "error");

		});
	

}

function obtenerhoras(fejecucion,hinicio,hinicio_receso,hfin_receso,thoras,idcultivo,idusuario){
	
	swal({
		title: "Obtener horas acorde con los rendimientos",
		html: true,
		text: '<br><br> <div style="width: 100px;height: 100px;"> <div id="loader-wrapper" ><div id="loader"></div></div> </div><br><br>',
		confirmButtonClass: "btn-danger",
		confirmButtonText: "Espere un momento...",
		closeOnConfirm: false,
		closeOnCancel: false
	}, function (isConfirm) {
		if (isConfirm) {
			return false;
		}
	});
	//alert(url + codigoEmp +codigoSuc + ruta+metodo_exter+header+ tabla);
		$.ajax({
			url: url,
			method: "POST",
			data: {
				controller: 'Tareo',
				accion: 'convertir_rend_horas',
				fejecucion: fejecucion,
				hinicio: hinicio,
				hinicio_receso: hinicio_receso,
				hfin_receso: hfin_receso,
				thoras: thoras,
				idcultivo: idcultivo,
				idusuario: idusuario
			},
			dataType: "json",
			success: function (r) {
				
				$(r).each(function (i, e) {
					
					if (e.respuesta != '' && (e.respuesta).substr(0, 5) != 'Error') {
						console.log(e);
						swal("Operación exitosa", "La conversión fue realizada con éxito", "success");

					} else {
						if ((e.respuesta).substr(0, 5) == 'Error') {
							swal("Error", e.respuesta, "error");
						} else {
							swal("Error", "Ocurrió un error", "error");
						}

					}

					

				});

			}
		}).fail(function (jqXHR, textStatus, errorThrown) {
			// alert( 'Error!!' + errorThrown );
			console.log(jqXHR);
			swal("Error", "Ocurrió un error: " + errorThrown, "error");

		});
	

}

function Excelv2() {
	swal({
		title: "Exportando tareos",
		html: true,
		text: '<br><br> <div style="width: 100px;height: 100px;"> <div id="loader-wrapper" ><div id="loader"></div></div> </div><br><br>',
		confirmButtonClass: "btn-danger",
		confirmButtonText: "Espere un momento...",
		closeOnConfirm: false,
		closeOnCancel: false
	}, function (isConfirm) {
		if (isConfirm) {
			return false;
		}
	});

	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		data: {
			controller: 'Tareo',
			accion: 'listar',
			fini: fini,
			ffin: ffin,
			estado: estado,
			tipo: 'DDT2',
			cultivo: cultivo
		},
		success: function (resp) {
					data_export = Array();
					data_export.push(['ITEM','IDTAREO','DET_ID','DDT_ID', 'IDUSUARIO', 'DOCUMENTO', 'PLANILLA', 'CULTIVO', 'VARIEDAD', 'ACTIVIDAD', 'LABOR', 'CONSUMIDOR','GRUPO', 'IDTRABAJADOR', 'NRO. DOC', 'TRABAJADOR', 'HORAS', 'RENDIMIENTO', 'H. INICIO', 'H. FIN',
						'H. EXTRA', 'CONCEPTO', 'BONO', 'ESTADO', 'EQUIPO', 'FECHA EJECUCION']);

					$(resp).each(function (i, e) {
						row = [i + 1,e.idtareo,e.det_id,e.ddt_id, e.codigo_usuario, e.documento, e.idplanilla, e.cultivo, e.variedad, e.actividad, e.labor, e.consumidor,e.grupo, e.idtrabajador, e.nrodocumento, e.nombres,
						e.num_horas, e.rendimiento, e.hinicio, e.hfin, e.hor_extra, e.tconcepto, e.bono, e.estado,
						e.imei, e.fechaejecucion];
						data_export.push(row);
					});
					save();
					swal.close();
					


		}
	});
}