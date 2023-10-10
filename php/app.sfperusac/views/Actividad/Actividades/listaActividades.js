function Message(type, message, time){
	$.bootstrapGrowl(message,{
        ele: 'body', // which element to append to
        type: type, // (null, 'info', 'danger', 'success')+

        offset: {from: 'bottom', amount: 20}, // 'top', or 'bottom'
        align: 'right', // ('left', 'right', or 'center')
        width: 250, // (integer, or 'auto')
        delay: time, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
        allow_dismiss: true, // If true then will display a cross to close the popup.
        stackup_spacing: 10 // spacing between consecutively stacked growls.
    });
}

var tablaActividades;

$(document).ready(function(){
	limpiar();
  Deshabilitar();
  $('#btnNewAct').click(function(){
    Habilitar();
  });

  $('#btnCancelAct').click(function(){
		limpiar();
    Deshabilitar();
  });

	$('#btnAgregarAct').click(function(){
    var ACTCodigo = $('#ACT_Codigo').val();
    var ACTNombreCorto = $('#ACT_Nombre_Corto').val();
		var ACTDescripcion = $('#ACT_Descripcion').val();
		var ACTXRendimiento = $('#ACT_X_Rendimiento').val();
		var ACTActivo = $('#ACT_Activo').val();

		if (ACTCodigo != '' && ACTNombreCorto != '' && ACTXRendimiento != '' && ACTActivo != '')
		{
      $.ajax({
				type:"POST",
				data:
				{
					accion: 'insertar',
          ACT_Codigo:ACTCodigo,
					ACT_NombreCorto: ACTNombreCorto,
					ACT_Descripcion: ACTDescripcion,
					ACT_XRendimiento: ACTXRendimiento,
					ACT_Activo: ACTActivo
				},
				url: '../../../app/controllers/ActividadController.php',
				dataType: 'json',
				success:function(resp){
					if(resp.respuesta!=''){
						Message('success', resp.respuesta, 3000);
            limpiar();
            Deshabilitar();
            listarActividades();
					}else{
						Message('danger', 'Ocurrió un error:' + resp.respuesta , 3000);
					}
				}
			});
		}
		else{
			swal("Complete todos los Campos Obligatorios (*)", {
				icon: "info",
			});
		}
		$('.swal-overlay').css('z-index', 99999);
	});

	$('#btnActualizaAct').click(function(){
		var ACTCodigo = $('#ACT_Codigo').val();
    var ACTNombreCorto = $('#ACT_Nombre_Corto').val();
		var ACTDescripcion = $('#ACT_Descripcion').val();
		var ACTXRendimiento = $('#ACT_X_Rendimiento').val();
		var ACTActivo = $('#ACT_Activo').val();

		if (ACTCodigo != '' && ACTNombreCorto != '' && ACTXRendimiento != '' && ACTActivo != '')
		{
			$.ajax({
				type:"POST",
				url:"../../../app/controllers/ActividadController.php",
				data:{
					accion: 'modificar',
					codigo: codigoSeleccionado,
					ACT_Codigo:ACTCodigo,
					ACT_NombreCorto: ACTNombreCorto,
					ACT_Descripcion: ACTDescripcion,
					ACT_XRendimiento: ACTXRendimiento,
					ACT_Activo: ACTActivo
				},
				dataType:'json',
				success:function(r){
					if(r.respuesta!=''){
						Deshabilitar();
						limpiar();
						listarActividades();
						Message('success', r.respuesta, 3000);
					}else{
						Message('danger', 'Ocurrió un error:' + resp.respuesta , 3000);
					}
				}
			});
		}
	});

	tablaActividades=$('#tablaActividades').DataTable({
		columnDefs: [{
			orderable: false,
			targets: [2]
		}],
		"pagingType": "full_numbers",
		paging: true,
		lengthChange: true,
		"lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "Todos"] ],
		bSort: false,
		searching: true,
		language: {
      lengthMenu: "_MENU_",
			loadingRecords: "",
			processing: "Procesando...",
			sZeroRecords:"No se Encontraron Registros",
      search:"",
			info: "",
			infoEmpty: "",
			emptyTable: "Ningún dato en esta Tabla",
			paginate: {
				first: "",
				last: "",
				next: "",
				previous: ""
			}
		}
	});
  //tablaActividades.clear().draw(false);

	listarActividades();

});
function Habilitar()
{
  $('#ACT_Codigo').attr('disabled',false);
  $('#ACT_Nombre_Corto').attr('disabled',false);
  $('#ACT_Descripcion').attr('disabled',false);
  $('#ACT_X_Rendimiento').attr('disabled',false);
  $('#ACT_Activo').attr('disabled',false);
  $('#btnCancelAct').attr('disabled',false);
  $('#btnAgregarAct').attr('disabled',false);
}
function Deshabilitar()
{
  $('#ACT_Codigo').attr('disabled',true);
  $('#ACT_Nombre_Corto').attr('disabled',true);
  $('#ACT_Descripcion').attr('disabled',true)
  $('#ACT_X_Rendimiento').attr('disabled',true);
  $('#ACT_Activo').attr('disabled',true);
  $('#btnCancelAct').attr('disabled',true);
  $('#btnAgregarAct').attr('disabled',true);
	$('#btnAgregarAct').removeClass('hide');
	$('#btnActualizaAct').addClass('hide');
}

function limpiar()
{
  $('#ACT_Codigo').val('');
  $('#ACT_Nombre_Corto').val('');
	$('#ACT_Descripcion').val('');
  $('#ACT_X_Rendimiento').val('S');
	$('#ACT_X_Rendimiento').trigger('change');
	$('#ACT_Activo').val('1');
	$('#ACT_Activo').trigger('change');
}

var _estado = function(codigo){
	if(codigo == 1){
		return '<label class="label label-success">ACTIVO</label>';
	}
	else{
		return '<label class="label label-danger">INACTIVO</label>';
	}
}
var _acciones = function(codigo){
	return '<button title="Editar" codigo="'+codigo+'" class="btn btn-warning btn-sm btnEditar" type="button" style="margin-right: 5px;"><i class="fa fa-cog"></i></button><button title="Eliminar" codigo="'+codigo+'" class="btn btn-danger btn-sm btnEliminar" type="button" style="margin-right: 5px;"><i class="fa fa-trash"></i></button>';
}

function listarActividades(){

	$.ajax({
		url: '../../../app/controllers/ActividadController.php',
		dataType: 'json',
		type: 'post',
		data:{
			accion: 'listar'
		},
		success: function(resp){
			tablaActividades.clear().draw(false);
			$(resp).each(function(i, e){
				fila = [e.codigo, e.nombre,e.descripcion,e.tipo,_estado(e.estado),_acciones(e.codigo)];
				tablaActividades.row.add(fila).draw(false);
			});
		}
	});
}

var codigoSeleccionado;
$(document).on('click','.btnEditar',function (e) {
	//codigoSeleccionado = parseInt($(this).attr('codigo'));
	codigoSeleccionado = $(this).attr('codigo');
	$.ajax({
		url: '../../../app/controllers/ActividadController.php',
		dataType: 'json',
		type: 'post',
		data:{
			accion: 'Mostrar',
			codigo: codigoSeleccionado
		},
		success:function(r){
			Habilitar();
			$('#btnAgregarAct').addClass('hide');
			$('#btnActualizaAct').removeClass('hide');
			$('#ACT_Codigo').val(r.codigo);
			$('#ACT_Nombre_Corto').val(r.nombre);
			$('#ACT_Descripcion').val(r.descripcion);
			$('#ACT_X_Rendimiento').val(r.tipo);
			$('#ACT_X_Rendimiento').trigger('change');
			$('#ACT_Activo').val(r.estado);
			$('#ACT_Activo').trigger('change');
		}
	});
});

$(document).on('click','.btnEliminar',function (e) {
	codigoSeleccionado = $(this).attr('codigo');
	alertify.confirm('¿Desea eliminar esta Actividad?', function(){
		$.ajax({
			type:"POST",
			url:"../../../app/controllers/ActividadController.php",
			data:{
				accion: 'eliminar',
				codigo: codigoSeleccionado
			},
			dataType:'json',
			success:function(r){
				if(r.respuesta!=''){
					Deshabilitar();
					limpiar();
					Message('success', r.respuesta, 3000);
					listarActividades();
				}else{
					Message('danger', 'Ocurrió un error:' + resp.respuesta , 3000);
				}
			}
		});
	}, function(){
		alertify.error('Operación Cancelada!')
	});
});
