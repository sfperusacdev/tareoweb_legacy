var tablaLabores;

$(document).ready(function(){
  //$('#ACT_Id').select2();
  /*$('#ACT_Id').append($('<option>',
    {
        value: "º",
        text : "-- Seleccione Actividad --"
    }));
  $('#ACT_Id').formSelect();*/
	//limpiar();
  //Deshabilitar();
  //Habilitar();

  $.ajax({
		url: '../../../app/controllers/ActividadController.php',
		dataType: 'json',
		type: 'post',
		data:{
			accion: 'listar'
		},
		success: function(resp){
			$(resp).each(function(i, e){
				codigo = [e.codigo];
				descripcion = [e.nombre];
        $('#ACT_Id').append($('<option>',
          {
              value: codigo,
              text : description
          }));
			});
		}
	});

  $('#ACT_Id').material_select();
  $('#btnNewLab').click(function(){
    //$("#ACT_Id").removeAttr("disabled");
    Habilitar();
  });

  $('#btnCancelLab').click(function(){
		limpiar();
    Deshabilitar();
  });

	$('#btnAgregarLab').click(function(){
    var ACTId = $('#ACT_Id').val();
    var LABCodigo = $('#LAB_Codigo').val();
    var LABNombreCorto = $('#LAB_Nombre_Corto').val();
		var LABDescripcion = $('#LAB_Descripcion').val();
		var LABActivo = $('#LAB_Activo').val();

		if (ACTId != 'º' && LABCodigo != '' && LABNombreCorto != '' && LABActivo != '')
		{
      $.ajax({
				type:"POST",
				data:
				{
					accion: 'insertar',
          ACT_Codigo:ACTId,
					LAB_Codigo: LABCodigo,
					LAB_NombreCorto: LABNombreCorto,
					LAB_Descripcion: LABDescripcion,
					LAB_Activo: LABActivo
				},
				url: '../../../app/controllers/LaborController.php',
				dataType: 'json',
				success:function(resp){
					if(resp.respuesta!=''){
						Message('success', resp.respuesta, 3000);
            limpiar();
            Deshabilitar();
            listarLabores();
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

	$('#btnActualizaLab').click(function(){
    var ACTId = $('#ACT_Id').val();
    var LABCodigo = $('#LAB_Codigo').val();
    var LABNombreCorto = $('#LAB_Nombre_Corto').val();
		var LABDescripcion = $('#LAB_Descripcion').val();
		var LABActivo = $('#LAB_Activo').val();

		if (ACTId != 'º' && LABCodigo != '' && LABNombreCorto != '' && LABActivo != '')
		{
			$.ajax({
				type:"POST",
				url:"../../../app/controllers/LaborController.php",
				data:{
					accion: 'modificar',
					codigo: codigoSeleccionado,
          ACT_Codigo:ACTId,
					LAB_Codigo: LABCodigo,
					LAB_NombreCorto: LABNombreCorto,
					LAB_Descripcion: LABDescripcion,
					LAB_Activo: LABActivo
				},
				dataType:'json',
				success:function(r){
					if(r.respuesta!=''){
            Deshabilitar();
						limpiar();
						listarLabores();
						Message('success', r.respuesta, 3000);
					}else{
						Message('danger', 'Ocurrió un error:' + resp.respuesta , 3000);
					}
				}
			});
		}
	});

	/*tablaLabores=$('#tablaLabores').DataTable({
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
  tablaLabores.clear().draw(false);*/

	//listarLabores();

});
function Habilitar()
{
  //$('#ACT_Id').removeAttr('disabled');
  $('#LAB_Codigo').attr('disabled',false);
  $('#LAB_Nombre_Corto').attr('disabled',false);
  $('#LAB_Descripcion').attr('disabled',false);
  //$('#LAB_Activo').attr('disabled',false);
  $('#btnCancelLab').attr('disabled',false);
  $('#btnAgregarLab').attr('disabled',false);
}
function Deshabilitar()
{
  //$('#ACT_Id').attr('disabled',true);
  $('#LAB_Codigo').attr('disabled',true);
  $('#LAB_Nombre_Corto').attr('disabled',true);
  $('#LAB_Descripcion').attr('disabled',true)
  //$('#LAB_Activo').attr('disabled',true);
  $('#btnCancelLab').attr('disabled',true);
  $('#btnAgregarLab').attr('disabled',true);
	$('#btnAgregarLab').removeClass('hide');
	$('#btnActualizaLab').addClass('hide');
}

function limpiar()
{
  $('#ACT_Id').val('º');
  $('#ACT_Id').trigger('change');
  $('#LAB_Codigo').val('');
  $('#LAB_Nombre_Corto').val('');
	$('#LAB_Descripcion').val('');
  $('#LAB_Activo').val('1');
	$('#LAB_Activo').trigger('change');
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

function listarLabores(){

	$.ajax({
		url: '../../../app/controllers/LaborController.php',
		dataType: 'json',
		type: 'post',
		data:{
			accion: 'listar'
		},
		success: function(resp){
			tablaLabores.clear().draw(false);
			$(resp).each(function(i, e){
				fila = [e.codigo, e.nombre,e.descripcion,e.actividad,_estado(e.estado),_acciones(e.codigo)];
				tablaLabores.row.add(fila).draw(false);
			});
		}
	});
}

//funcion para cargar datos en el combo Actividades
function listarActivi(combo){

	$.ajax({
		url: '../../../app/controllers/ActividadController.php',
		dataType: 'json',
		type: 'post',
		data:{
			accion: 'listar'
		},
		success: function(resp){
      $('#ACT_Id').find('option').remove();
			$('#ACT_Id').append($('<option>',
        {
            value: "º",
            text : "-- Seleccione Actividad --"
        }));
			$(resp).each(function(i, e){
				codigo = [e.codigo];
				descripcion = [e.nombre];
        $('#ACT_Id').append($('<option>',
          {
              value: codigo,
              text : description
          }));
			});
		}
	});
}

var codigoSeleccionado;
$(document).on('click','.btnEditar',function (e) {
	//codigoSeleccionado = parseInt($(this).attr('codigo'));
	codigoSeleccionado = $(this).attr('codigo');
	$.ajax({
		url: '../../../app/controllers/LaborController.php',
		dataType: 'json',
		type: 'post',
		data:{
			accion: 'Mostrar',
			codigo: codigoSeleccionado
		},
		success:function(r){
			Habilitar();
			$('#btnAgregarLab').addClass('hide');
			$('#btnActualizaLab').removeClass('hide');
			$('#ACT_Id').val(r.actividad);
      $('#ACT_Id').trigger('change');
			$('#LAB_Codigo').val(r.codigo);
			$('#LAB_Nombre_Corto').val(r.nombre);
			$('#LAB_Descripcion').val(r.descripcion);
			$('#LAB_Activo').val(r.estado);
			$('#LAB_Activo').trigger('change');
		}
	});
});

$(document).on('click','.btnEliminar',function (e) {
	codigoSeleccionado = $(this).attr('codigo');
	alertify.confirm('¿Desea eliminar esta Labor?', function(){
		$.ajax({
			type:"POST",
			url:"../../../app/controllers/LaborController.php",
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
					listarLabores();
				}else{
					Message('danger', 'Ocurrió un error:' + resp.respuesta , 3000);
				}
			}
		});
	}, function(){
		alertify.error('Operación Cancelada!')
	});
});
