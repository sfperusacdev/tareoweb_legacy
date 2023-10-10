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

var tablaLabores;
var acti = "";
$(document).ready(function(){

  $('.collapsible.expandable').collapsible();
  listarActivi($('#ACT_Id'));

  $('#btnNewLab').click(function(){
    acti = $('#ACT_Id').val();
    if (acti != null) {
      //$('#newLabor').removeClass('hide');
      //$('#campoObligatorio').addClass('hide');
      //$('#btnsActividad').addClass('hide');
			$('#newLabor').attr(disabled,false);
      Habilitar();
      Habilitar();
      Deshabilitar2();
      Deshabilitar2();
    }
    else {
      M.toast({html: 'Seleccione una Actividad!'});
    }
  });
  $('#btnNewAct').click(function(){
    //$('#newLabor').addClass('hide');
		//$('#newLabor').removeClass('active');
		//$('#listActivity').removeClass('active');
		$('#btnCancelAct').removeClass('hide');
		$('#newActivity').addClass('active');
		$('#bodyNewActivity').css("display", "block");
		//$('#bodyNewActivity').addClass('active');
    Habilitar2();
		//Habilitar2();
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
				url: '../../app/controllers/LaborController.php',
				dataType: 'json',
				success:function(resp){
					if(resp.respuesta!=''){
						//Message('success', resp.respuesta, 3000);
            M.toast({html: resp.respuesta +'!'});
            limpiar();
            Deshabilitar();
						Deshabilitar();
            listarLabores();
            $('#newLabor').addClass('hide');
					}else{
						//Message('danger', 'Ocurrió un error:' + resp.respuesta , 3000);
            M.toast({html: 'Ocurrió un error: ' + resp.respuesta});
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
				url:"../../app/controllers/LaborController.php",
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
            $('#newLabor').addClass('hide');
            Deshabilitar();
            Deshabilitar();
						limpiar();
						listarLabores();
						//Message('success', r.respuesta, 3000);
            M.toast({html: r.respuesta +'!'});
					}else{
						//Message('danger', 'Ocurrió un error:' + resp.respuesta , 3000);
            M.toast({html: 'Ocurrió un error: ' + r.respuesta});
					}
				}
			});
		}
	});

	tablaLabores=$('#tablaLabores').DataTable({
		columnDefs: [{
			orderable: false,
			targets: [5]
		}],
		"pagingType": "full_numbers",
		paging: true,
		lengthChange: false,
		bSort: true,
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
  //tablaLabores.clear().draw(false);
	listarLabores();

});
function Habilitar()
{
  $('#LAB_Codigo').attr('disabled',false);
  $('#LAB_Nombre_Corto').attr('disabled',false);
  $('#LAB_Descripcion').attr('disabled',false);
	$('#LAB_Activo').formSelect();
  $('#LAB_Activo').attr('disabled',false);
  $('#btnCancelLab').attr('disabled',false);
  $('#btnAgregarLab').attr('disabled',false);
}
function Deshabilitar()
{
  $('#LAB_Codigo').attr('disabled',true);
  $('#LAB_Nombre_Corto').attr('disabled',true);
  $('#LAB_Descripcion').attr('disabled',true)
	$('#LAB_Activo').formSelect();
  $('#LAB_Activo').attr('disabled',true);
  $('#btnCancelLab').attr('disabled',true);
  $('#btnAgregarLab').attr('disabled',true);
	$('#btnAgregarLab').removeClass('hide');
	$('#btnActualizaLab').addClass('hide');
}

function limpiar()
{
  //$('#ACT_Id').val('');
  //$('#ACT_Id').trigger('change');
  $('#LAB_Codigo').val('');
  $('#LAB_Nombre_Corto').val('');
	$('#LAB_Descripcion').val('');
  $('#LAB_Activo').val('1');
	$('#LAB_Activo').trigger('change');
}

function Habilitar2()
{
  $('#ACT_Codigo').attr('disabled',false);
  $('#ACT_Nombre_Corto').attr('disabled',false);
  $('#ACT_Descripcion').attr('disabled',false);
  $('#ACT_X_Rendimiento').attr('disabled',false);
	$('#ACT_X_Rendimiento').formSelect();
	$('#ACT_Activo').attr('disabled',false);
	$('#ACT_Activo').formSelect();
  $('#btnAgregarAct').attr('disabled',false);
}
function Deshabilitar2()
{
  $('#ACT_Codigo').attr('disabled',true);
  $('#ACT_Nombre_Corto').attr('disabled',true);
  $('#ACT_Descripcion').attr('disabled',true)
  $('#ACT_X_Rendimiento').attr('disabled',true);
	$('#ACT_X_Rendimiento').formSelect();
  $('#ACT_Activo').attr('disabled',true);
	$('#ACT_Activo').formSelect();
  $('#btnAgregarAct').attr('disabled',true);
	$('#btnAgregarAct').removeClass('hide');
	$('#btnActualizaAct').addClass('hide');
}

function limpiar2()
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

function listarLabores(){

	$.ajax({
		url: '../../app/controllers/LaborController.php',
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
		url: '../../app/controllers/ActividadController.php',
		dataType: 'json',
		type: 'post',
		data:{
			accion: 'listar'
		},
		success: function(resp){
      //combo.find('option').remove();
			combo.append('<option value="" disabled selected>-- Seleccione Actividad --</option>');
			$(resp).each(function(i, e){
				codigo = e.codigo;
				descripcion = e.nombre;
				combo.append('<option value="' + codigo + '">' + descripcion + '</option>');
			});
			combo.formSelect();
			combo.trigger('contentChanged');
			//combo.sm_select();
		}
	});
}

var codigoSeleccionado;
$(document).on('click','.btnEditar',function (e) {
	//codigoSeleccionado = parseInt($(this).attr('codigo'));
	codigoSeleccionado = $(this).attr('codigo');
	$.ajax({
		url: '../../app/controllers/LaborController.php',
		dataType: 'json',
		type: 'post',
		data:{
			accion: 'Mostrar',
			codigo: codigoSeleccionado
		},
		success:function(r){
      $('#newLabor').removeClass('hide');
			Habilitar();
			Habilitar();
			$('#btnAgregarLab').addClass('hide');
			$('#btnActualizaLab').removeClass('hide');
			$('#ACT_Id').val(r.actividad);
			$('#ACT_Id').formSelect();
			$('#ACT_Id').trigger('contentChanged');
			$('#LAB_Codigo').val(r.codigo);
			$('#LAB_Nombre_Corto').val(r.nombre);
			$('#LAB_Descripcion').val(r.descripcion);
			$('#LAB_Activo').val(r.estado);
			$('#LAB_Activo').trigger('change');
      //Materialize.updateTextFields();
		}
	});
});

$(document).on('click','.btnEliminar',function (e) {
	codigoSeleccionado = $(this).attr('codigo');
	alertify.confirm('¿Desea eliminar esta Labor?', function(){
		$.ajax({
			type:"POST",
			url:"../../app/controllers/LaborController.php",
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
