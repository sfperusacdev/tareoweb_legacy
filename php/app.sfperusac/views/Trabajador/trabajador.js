//variables para determinar la Trabajador que se seleccionó
var codigoSeleccionado;

//variable para determinar la tabla
var tablaTrabajadores;

$(document).ready(function(){

  $('.collapsible.expandable').collapsible();

	//Accion de BOTONES de formulario Trabajador
  // New Trabajador
  $('#btnNewTrabajador').click(function(){
    listarEmpre($('#TRA_Empresa_Id'));
		limpiarT();
		HabilitarT();
  });
  // Cancel Trabajador
  $('#btnCancelTrabajador').click(function(){
		limpiarT();
		DeshabilitarT();
  });
  // Agregar Trabajador
  $('#btnAgregarTrabajador').click(function(){
    var TRACodigo = $('#TRA_Codigo').val();
    var TRAApPaterno = $('#TRA_ApPaterno').val();
    var TRAApMaterno = $('#TRA_ApMaterno').val();
		var TRANombre = $('#TRA_Nombre').val();
    var TRAFecha_Nacimiento = $('#TRA_Fecha_Nacimiento').val();
    var TRAFecha_Ingreso = $('#TRA_Fecha_Ingreso').val();
    var TRAFecha_Cese = $('#TRA_Fecha_Cese').val();
		var TRALiquidado = $('#TRA_Liquidado').val();
    var TRAFecha_Liquidado = $('#TRA_Fecha_Liquidado').val();
		var TRAHabilitado = $('#TRA_Habilitado').val();
    var TRAEmpresa_Id = $('#TRA_Empresa_Id').val();
    var TRASucursal_Id = $('#TRA_Sucursal_Id').val();
    var TRATipo = $('#TRA_Tipo').val();
		var TRALista_Negra = $('#TRA_Lista_Negra').val();

		if (TRACodigo != '' && TRAApPaterno != '' && TRAApMaterno != '' && TRANombre != '' &&
    TRAFecha_Nacimiento != '' && TRAFecha_Ingreso != '' && TRALiquidado != '' && TRAHabilitado != '' &&
    TRAEmpresa_Id != '' && TRASucursal_Id != '' && TRATipo != '' && TRALista_Negra != '')
		{
      $.ajax({
				type:"POST",
				data:
				{
					accion: 'insertar',
          TRA_Codigo: TRACodigo,
					TRA_ApPaterno: TRAApPaterno,
					TRA_ApMaterno: TRAApMaterno,
          TRA_Nombre: TRANombre,
          TRA_Fecha_Nacimiento: TRAFecha_Nacimiento,
					TRA_Fecha_Ingreso: TRAFecha_Ingreso,
          TRA_Fecha_Cese: TRAFecha_Cese,
					TRA_Liquidado: TRALiquidado,
          TRA_Fecha_Liquidado: TRAFecha_Liquidado,
          TRA_Habilitado: TRAHabilitado,
          TRA_Empresa_Id: TRAEmpresa_Id,
					TRA_Sucursal_Id: TRASucursal_Id,
          TRA_Tipo: TRATipo,
					TRA_Lista_Negra: TRALista_Negra
				},
				url: '../../app/controllers/TrabajadorController.php',
				dataType: 'json',
				success:function(resp){
					if(resp.respuesta!=''){
            M.toast({html: resp.respuesta +'!'});
						if (resp.limpiar == 'YES') {
							limpiarT();
	            DeshabilitarT();
	            listarTrabajadores();
						}
						else {
							M.toast({html: 'Intentelo Nuevamente!'});
						}
					}else{
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
  // Actualizar Trabajador
  $('#btnActualizaTrabajador').click(function(){
    var TRACodigo = $('#TRA_Codigo').val();
    var TRAApPaterno = $('#TRA_ApPaterno').val();
    var TRAApMaterno = $('#TRA_ApMaterno').val();
		var TRANombre = $('#TRA_Nombre').val();
    var TRAFecha_Nacimiento = $('#TRA_Fecha_Nacimiento').val();
    var TRAFecha_Ingreso = $('#TRA_Fecha_Ingreso').val();
    var TRAFecha_Cese = $('#TRA_Fecha_Cese').val();
		var TRALiquidado = $('#TRA_Liquidado').val();
    var TRAFecha_Liquidado = $('#TRA_Fecha_Liquidado').val();
		var TRAHabilitado = $('#TRA_Habilitado').val();
    var TRAEmpresa_Id = $('#TRA_Empresa_Id').val();
    var TRASucursal_Id = $('#TRA_Sucursal_Id').val();
    var TRATipo = $('#TRA_Tipo').val();
		var TRALista_Negra = $('#TRA_Lista_Negra').val();

		if (TRACodigo != '' && TRAApPaterno != '' && TRAApMaterno != '' && TRANombre != '' &&
    TRAFecha_Nacimiento != '' && TRAFecha_Ingreso != '' && TRALiquidado != '' && TRAHabilitado != '' &&
    TRAEmpresa_Id != '' && TRASucursal_Id != '' && TRATipo != '' && TRALista_Negra != '')
		{
			$.ajax({
				type:"POST",
				url:"../../app/controllers/TrabajadorController.php",
				data:{
					accion: 'modificar',
					codigo: codigoSeleccionado,
          TRA_Codigo: TRACodigo,
					TRA_ApPaterno: TRAApPaterno,
					TRA_ApMaterno: TRAApMaterno,
          TRA_Nombre: TRANombre,
          TRA_Fecha_Nacimiento: TRAFecha_Nacimiento,
					TRA_Fecha_Ingreso: TRAFecha_Ingreso,
          TRA_Fecha_Cese: TRAFecha_Cese,
					TRA_Liquidado: TRALiquidado,
          TRA_Fecha_Liquidado: TRAFecha_Liquidado,
          TRA_Habilitado: TRAHabilitado,
          TRA_Empresa_Id: TRAEmpresa_Id,
					TRA_Sucursal_Id: TRASucursal_Id,
          TRA_Tipo: TRATipo,
					TRA_Lista_Negra: TRALista_Negra
				},
				dataType:'json',
				success:function(r){
					if(r.respuesta!=''){
            DeshabilitarT();
            limpiarT();
						listarTrabajadores();
            M.toast({html: r.respuesta +'!'});
					}else{
            M.toast({html: 'Ocurrió un error: ' + r.respuesta});
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

	tablaTrabajadores=$('#tablaTrabajadores').DataTable({
    "scrollX": true,
		columnDefs: [{
			orderable: false,
			targets: [7]
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
	//listarTrabajadores();

});
//Cada vez que se seleccione un elemento del select Empresa
function empresaSelect(){
	listarSucursal_X_Empresa($('#TRA_Empresa_Id').val(),$('#TRA_Sucursal_Id'));
}

//mostrar datos de Trabajador
function mostrarTrabajador(tra){
	$.ajax({
		type:"POST",
		data:
		{
			accion: 'Mostrar',
			codigo: tra
		},
		url: '../../app/controllers/TrabajadorController.php',
		dataType: 'json',
		success:function(resp){
			if(resp !=''){
				limpiarT();
				$('#newTrabajador').addClass('active');
				$('#TRA_Codigo').val(resp.codigo);
				$('#TRA_ApPaterno').val(resp.apPaterno);
				$('#TRA_ApMaterno').val(resp.apMaterno);
				$('#TRA_Nombre').val(resp.nombre);
        $('#TRA_Fecha_Nacimiento').val(resp.fechaNacimiento);
        $('#TRA_Fecha_Ingreso').val(resp.fechaIngreso);
				$('#TRA_Fecha_Cese').val(resp.fechaCese);
				$('#TRA_Liquidado').val(resp.liquidado);
        $('#TRA_Liquidado').trigger('change');
				$('#TRA_Fecha_Liquidado').val(resp.fechaLiquidado);
        $('#TRA_Habilitado').val(resp.habilitado);
        $('#TRA_Habilitado').trigger('change');
        listarSucursal_X_Empresa(resp.empresa,$('#TRA_Sucursal_Id'));
				$('#TRA_Sucursal_Id').val(resp.sucursal);
        $('#TRA_Sucursal_Id').trigger('change');
        listarEmpre($('#TRA_Empresa_Id'));
        $('#TRA_Empresa_Id').val(resp.empresa);
        $('#TRA_Empresa_Id').trigger('change');
				$('#TRA_Tipo').val(resp.tipo);
				$('#TRA_Lista_Negra').val(resp.listaNegra);
        $('#TRA_Lista_Negra').trigger('change');
			}else{
				M.toast({html: 'Ocurrió un error al recibir datos del Trabajador'});
			}
		}
	});
}

//control de formulario Trabajador
function HabilitarT()
{
  $('#TRA_Codigo').attr('disabled',false);
  $('#TRA_ApPaterno').attr('disabled',false);
  $('#TRA_ApMaterno').attr('disabled',false);
  $('#TRA_Nombre').attr('disabled',false);
  $('#TRA_Fecha_Nacimiento').attr('disabled',false);
  $('#TRA_Fecha_Ingreso').attr('disabled',false);
  $('#TRA_Fecha_Cese').attr('disabled',false);
  $('#TRA_Liquidado').attr('disabled',false);
  $('#TRA_Liquidado').formSelect();
  $('#TRA_Fecha_Liquidado').attr('disabled',false);
  $('#TRA_Habilitado').attr('disabled',false);
  $('#TRA_Habilitado').formSelect();
  $('#TRA_Empresa_Id').attr('disabled',false);
  $('#TRA_Empresa_Id').formSelect();
  $('#TRA_Sucursal_Id').attr('disabled',false);
  $('#TRA_Sucursal_Id').formSelect();
  $('#TRA_Tipo').attr('disabled',false);
  $('#TRA_Lista_Negra').attr('disabled',false);
  $('#TRA_Lista_Negra').formSelect();
  $('#btnCancelTrabajador').attr('disabled',false);
  $('#btnAgregarTrabajador').attr('disabled',false);
	$('#btnNewTrabajador').attr('disabled',true);
}
function EditHabilitarT()
{
  $('#TRA_Codigo').attr('disabled',false);
  $('#TRA_ApPaterno').attr('disabled',false);
  $('#TRA_ApMaterno').attr('disabled',false);
  $('#TRA_Nombre').attr('disabled',false);
  $('#TRA_Fecha_Nacimiento').attr('disabled',false);
  $('#TRA_Fecha_Ingreso').attr('disabled',false);
  $('#TRA_Fecha_Cese').attr('disabled',false);
  $('#TRA_Liquidado').attr('disabled',false);
  $('#TRA_Liquidado').formSelect();
  $('#TRA_Fecha_Liquidado').attr('disabled',false);
  $('#TRA_Habilitado').attr('disabled',false);
  $('#TRA_Habilitado').formSelect();
  $('#TRA_Empresa_Id').attr('disabled',false);
  $('#TRA_Empresa_Id').formSelect();
  $('#TRA_Sucursal_Id').attr('disabled',false);
  $('#TRA_Sucursal_Id').formSelect();
  $('#TRA_Tipo').attr('disabled',false);
  $('#TRA_Lista_Negra').attr('disabled',false);
  $('#TRA_Lista_Negra').formSelect();
	$('#btnNewTrabajador').attr('disabled',true);
	$('#btnAgregarTrabajador').attr('disabled',true);
	$('#btnAgregarTrabajador').addClass('hide');
	$('#btnActualizaTrabajador').attr('disabled',false);
	$('#btnActualizaTrabajador').removeClass('hide');
	$('#btnCancelTrabajador').attr('disabled',true);
}
function DeshabilitarT()
{
  $('#TRA_Codigo').attr('disabled',true);
  $('#TRA_ApPaterno').attr('disabled',true);
  $('#TRA_ApMaterno').attr('disabled',true);
  $('#TRA_Nombre').attr('disabled',true);
  $('#TRA_Fecha_Nacimiento').attr('disabled',true);
  $('#TRA_Fecha_Ingreso').attr('disabled',true);
  $('#TRA_Fecha_Cese').attr('disabled',true);
  $('#TRA_Liquidado').attr('disabled',true);
  $('#TRA_Liquidado').formSelect();
  $('#TRA_Fecha_Liquidado').attr('disabled',true);
  $('#TRA_Habilitado').attr('disabled',true);
  $('#TRA_Habilitado').formSelect();
  $('#TRA_Empresa_Id').attr('disabled',true);
  $('#TRA_Empresa_Id').formSelect();
  $('#TRA_Sucursal_Id').attr('disabled',true);
  $('#TRA_Sucursal_Id').formSelect();
  $('#TRA_Tipo').attr('disabled',true);
  $('#TRA_Lista_Negra').attr('disabled',true);
  $('#TRA_Lista_Negra').formSelect();
  $('#btnCancelTrabajador').attr('disabled',true);
  $('#btnAgregarTrabajador').attr('disabled',true);
	$('#btnNewTrabajador').attr('disabled',false);
	$('#btnAgregarTrabajador').removeClass('hide');
	$('#btnActualizaTrabajador').addClass('hide');
}
function limpiarT()
{
  $('#TRA_Codigo').val('');
  $('#TRA_ApPaterno').val('');
  $('#TRA_ApMaterno').val('');
  $('#TRA_Nombre').val('');
  $('#TRA_Fecha_Nacimiento').val('');
  $('#TRA_Fecha_Ingreso').val('');
  $('#TRA_Fecha_Cese').val('');
  $('#TRA_Liquidado').val('1');
  $('#TRA_Liquidado').trigger('change');
  $('#TRA_Fecha_Liquidado').val('');
  $('#TRA_Habilitado').val('1');
  $('#TRA_Habilitado').trigger('change');
  $('#TRA_Empresa_Id').val('º');
  $('#TRA_Empresa_Id').trigger('change');
  $('#TRA_Sucursal_Id').val('º');
  $('#TRA_Sucursal_Id').trigger('change');
  $('#TRA_Tipo').val('');
  $('#TRA_Lista_Negra').val('1');
  $('#TRA_Lista_Negra').trigger('change');
}

//funcion para Evaluar el estado del Trabajador
var _estado = function(codigo){
	if(codigo == 1){
		return '<span class="badge green accent-3 border-round">HABILITADO</span>';
	}
	else{
		return '<span class="badge red border-round">INHABILITADO</span>';
	}
}
//funcion para Evaluar el campo LIQUIDACION y LISTA NEGRA del Trabajador
var _YesNo = function(codigo){
	if(codigo == 1){
		return '<span class="badge green accent-3 border-round">SI</span>';
	}
	else{
		return '<span class="badge red border-round">NO</span>';
	}
}
//funcion para mostrar botones de accion en la tabla Base de datos
var _acciones = function(codigo){
	return '<button title="Editar" codigo="'+codigo+'" class="mb-2 btn-floating waves-effect waves-light gradient-45deg-blue-indigo gradient-shadow border-round btn-small btnEditar" type="button" style="margin-right: 5px;"><i class="material-icons">edit</i></button><button title="Eliminar" codigo="'+codigo+'" class="mb-2 btn-floating waves-effect waves-light red gradient-shadow border-round btn-small btnEliminar" type="button" style="margin-right: 5px;"><i class="material-icons">delete</i></button>';
}

//funcion para cargar el combo Empresa
function listarEmpre(combo){

	$.ajax({
		url: '../../app/controllers/EmpresaController.php',
		dataType: 'json',
		type: 'post',
		data:{
			accion: 'listar'
		},
		success: function(resp){
      combo.find('option').remove();
			combo.append('<option value="º" disabled selected>-- Seleccione Empresa --</option>');
			$(resp).each(function(i, e){
				codigo = e.codigo;
				descripcion = e.nombre;
				combo.append('<option value="' + codigo + '">' + descripcion + '</option>');
			});
			combo.formSelect();
			combo.trigger('contentChanged');
		}
	});
}

//funcion para cargar el combo Sucursal x empresa
function listarSucursal_X_Empresa(empre,combo){

	$.ajax({
		url: '../../app/controllers/SucursalController.php',
		dataType: 'json',
		type: 'post',
		data:{
			accion: 'listar',
      empresa: empre
		},
		success: function(resp){
      combo.find('option').remove();
			combo.append('<option value="º" disabled selected>-- Seleccione Sucursal --</option>');
			$(resp).each(function(i, e){
				codigo = e.codigo;
				descripcion = e.nombre;
				combo.append('<option value="' + codigo + '">' + descripcion + '</option>');
			});
      combo.attr('disabled',false);
			combo.formSelect();
			combo.trigger('contentChanged');
		}
	});
}

//funcion para cargar la tabla Bases de Datos
function listarTrabajadores()
{
  $.ajax({
    url: '../../app/controllers/TrabajadorController.php',
		dataType: 'json',
		type: 'post',
		data:{
			accion: 'listar'
		},
		success: function(resp){
			tablaTrabajadores.clear().draw(false);
			$(resp).each(function(i, e){
				fila = [e.codigo, e.nombre, e.servidor, e.admin, _estado(e.estado), _permisos(e.permisos), e.conexion, _descrip(e.descripcion), _acciones(e.codigo)];
				tablaTrabajadores.row.add(fila).draw(false);
			});
		}
	});
}

//funcion ejecutada al presionar el boton editar de la tabla UnidadEquivalenciaes
$(document).on('click','.btnEditar',function (e) {
  codigoSeleccionado = $(this).attr('codigo');
  mostrarTrabajador(codigoSeleccionado);
  EditHabilitarT();
});
//funcion ejecutada al presionar el boton eliminar de la tabla
$(document).on('click','.btnEliminar',function (e) {
	codigoSeleccionado = $(this).attr('codigo');
	swal({
    title: "¿Desea eliminar Trabajador?",
    icon: 'warning',
    dangerMode: true,
    buttons: {
      cancel: 'NO',
      delete: 'SI, Eliminar!'
    }
  }).then(function (willDelete) {
    if (willDelete) {
			$.ajax({
				type:"POST",
				url:"../../app/controllers/TrabajadorController.php",
				data:{
					accion: 'eliminar',
					codigo: codigoSeleccionado
				},
				dataType:'json',
				success:function(r){
					if(r.respuesta!=''){
						DeshabilitarT();
						limpiarT();
						swal(r.respuesta,{
							icon: "success",
							timer: 2000,
							buttons: false
						});
						listarTrabajadores();
					}else{
						swal(r.respuesta,{
							icon: "error",
							timer: 2000,
							buttons: false
						});
					}
				}
			});
    } else {
			swal({
				title: 'Operación Cancelada!',
        icon: "error",
				timer: 1000,
				buttons: false
			});
    }
  });
});
