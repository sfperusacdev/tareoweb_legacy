$(document).ready(function(){
    url=geturl();
    $('#FechaIniciocosto').formatter({
		'pattern': '{{9999}}-{{99}}-{{99}}'
	});
	
	$('#FechaFincosto').formatter({
		'pattern': '{{9999}}-{{99}}-{{99}}'
	});

	$('#FechaIniciocosto').val(getActualDate());
	fini = getActualDate().replace('-', '').replace('-', '');
	$('#FechaFincosto').val(getActualDate());
	ffin = getActualDate().replace('-', '').replace('-', '');
$('#btnAplica_costo').click(function () {
    estado = $('#TAR_Estadocosto').val();
    if(estado=''){
        estado='TO';
    }
    fini = $('#FechaIniciocosto').val().replace('-', '').replace('-', '');
    ffin = $('#FechaFincosto').val().replace('-', '').replace('-', '');
    //alert(estado + fini +ffin +tipo);
    Excelv3();

});
$("#btnCancel_costo").on("click", function() {
    $('#tareomodal_costos').modal('close');
 });

});



function Workbook() {
	if(!(this instanceof Workbook)) return new Workbook();
	this.SheetNames = [];
	this.Sheets = {};
}
function save2(){
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
function Excelv3() {
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
			tipo: 'DDT3',
			cultivo: 'N'
		},
		success: function (resp) {
					data_export = Array();
					data_export.push(['ITEM','IDTAREO','DET_ID','DDT_ID', 'IDUSUARIO', 'DOCUMENTO', 'PLANILLA', 'IDCULTIVO','CULTIVO', 'IDVARIEDAD','VARIEDAD','IDACTIVIDAD', 'ACTIVIDAD','IDLABOR', 'LABOR', 'IDCONSUMIDOR','CONSUMIDOR','GRUPO', 'IDTRABAJADOR', 'NRO. DOC', 'TRABAJADOR', 'HORAS', 'RENDIMIENTO', 'H. INICIO', 'H. FIN',
						'H. EXTRA', 'CONCEPTO', 'BONO', 'ESTADO', 'EQUIPO', 'FECHA EJECUCION']);

					$(resp).each(function (i, e) {
						row = [i + 1,e.idtareo,e.det_id,e.ddt_id, e.codigo_usuario, e.documento, e.idplanilla,e.idcultivo, e.cultivo,e.idvariedad, e.variedad,e.idactividad, e.actividad,e.idlabor ,e.labor,e.idconsumidor, e.consumidor,e.grupo, e.idtrabajador, e.nrodocumento, e.nombres,
						e.num_horas, e.rendimiento, e.hinicio, e.hfin, e.hor_extra, e.tconcepto, e.bono, e.estado,
						e.imei, e.fechaejecucion];
						data_export.push(row);
					});
					save2();
					swal.close();
					


		}
	});
}
function getActualDate() {
    var d = new Date();
    var day = addZero(d.getDate());
    var month = addZero(d.getMonth() + 1);
    var year = addZero(d.getFullYear());
    return year + "-" + month + "-" + day;
}
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}