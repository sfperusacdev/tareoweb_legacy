//variables para determinar la BaseDatos que se seleccionó
var codigoSeleccionado;
var filtoLista = 2;

//variable para determinar la tabla
var tablaBasesDatos;

$(document).ready(function(){

  $('#liBaseDat').addClass('active');

  activarBtnAll();
  desactivarBtnAllActivas();
  desactivarBtnAllInactivas();
  listarBaseDat(filtoLista);

  //botones para listar
  $('#btnAllBaseDatos').click(function(){
    activarBtnAll();
    desactivarBtnAllActivas();
    desactivarBtnAllInactivas();
    listarBaseDat(filtoLista);
  })
  $('#btnAllBaseDatosActiva').click(function(){
    desactivarBtnAll();
    activarBtnAllActivas();
    desactivarBtnAllInactivas();
    listarBaseDat(filtoLista);
  })
  $('#btnAllBaseDatosInactiva').click(function(){
    desactivarBtnAll();
    desactivarBtnAllActivas();
    activarBtnAllInactivas();
    listarBaseDat(filtoLista);
  })

	//Accion de BOTONES de formulario BaseDatos
  $('#btnAddBaseDatos').click(function(){
		limpiarBD();
		HabilitarBD();
  });
  $('#btnCancelBaseDatos').click(function(){
		limpiarBD();
		DeshabilitarBD();
    $('#modal1').modal('close');
  });
  $('#btnCancelEditBaseDatos').click(function(){
    limpiarBD();
    $('#modal1').modal('close');
  });

  // Agregar BaseDatos
  $('#btnAgregarBaseDatos').click(function(){
    var BADCodigo = $('#BAD_Codigo').val();
    var BADNombre = $('#BAD_Nombre').val();
    var BADServidor = $('#BAD_Servidor').val();
		var BADAdmin = $('#BAD_Admin').val();
    var BADEstado = $('#BAD_Estado').val();
    var BADPermisos = $('#BAD_Permisos').val();
    var BADConexion = $('#BAD_Conexion').val();
		var BADDescripcion = $('#BAD_Descripcion').val();

		if (BADCodigo != '' && BADNombre != '' && BADServidor != '' && BADAdmin != '' && BADConexion != '')
		{
      $.ajax({
				type:"POST",
				data:
				{
					accion: 'insertar',
          BAD_Codigo: BADCodigo,
					BAD_Nombre: BADNombre,
					BAD_Servidor: BADServidor,
          BAD_Admin: BADAdmin,
          BAD_Estado: BADEstado,
					BAD_Permisos: BADPermisos,
          BAD_Conexion: BADConexion,
					BAD_Descripcion: BADDescripcion
				},
				url: '../../app/controllers/BaseDatosController.php',
				dataType: 'json',
				success:function(resp){
					if(resp.respuesta!=''){
            M.toast({html: resp.respuesta +'!'});
						if (resp.limpiar == 'YES') {
							limpiarBD();
	            DeshabilitarBD();
	            listarBaseDat(filtoLista);
              $('#modal1').modal('close');
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
			M.toast({html: 'Complete todos los Campos Obligatorios (*)'});
		}
	});
  // Actualizar BaseDatos
  $('#btnActualizaBaseDatos').click(function(){
    var BADCodigo = $('#BAD_Codigo').val();
    var BADNombre = $('#BAD_Nombre').val();
    var BADServidor = $('#BAD_Servidor').val();
		var BADAdmin = $('#BAD_Admin').val();
    var BADEstado = $('#BAD_Estado').val();
    var BADPermisos = $('#BAD_Permisos').val();
    var BADConexion = $('#BAD_Conexion').val();
		var BADDescripcion = $('#BAD_Descripcion').val();

		if (BADCodigo != '' && BADNombre != '' && BADServidor != '' && BADAdmin != '' && BADConexion != '')
		{
			$.ajax({
				type:"POST",
				url:"../../app/controllers/BaseDatosController.php",
				data:{
					accion: 'modificar',
					codigo: codigoSeleccionado,
          BAD_Codigo: BADCodigo,
					BAD_Nombre: BADNombre,
					BAD_Servidor: BADServidor,
          BAD_Admin: BADAdmin,
          BAD_Estado: BADEstado,
					BAD_Permisos: BADPermisos,
          BAD_Conexion: BADConexion,
					BAD_Descripcion: BADDescripcion
				},
				dataType:'json',
				success:function(r){
					if(r.respuesta!=''){
            M.toast({html: r.respuesta +'!'});
            DeshabilitarBD();
            limpiarBD();
						listarBaseDat(filtoLista);
            $('#modal1').modal('close');
					}else{
            M.toast({html: 'Ocurrió un error: ' + r.respuesta});
					}
				}
			});
		}
		else{
			M.toast({html: 'Complete todos los Campos Obligatorios (*)'});
		}
	});

  var calcDataTableHeight = function() {
     return $(window).height() - 330 + "px";
  };
	tablaBasesDatos=$('#tablaBasesDatos').DataTable({
    /*sScrollY: calcDataTableHeight(),
    scrollCollapse: true,*/
    paging: true,
    info: false,
    responsive: true,
    bSort: true,
    lengthMenu: [5],
    columnDefs: [{
			orderable: false,
			targets: [7]
		}],
    language: {
			paginate: {
				first: "Primero",
				last: "Último",
				next: "Siguiente",
				previous: "Anterior"
			}
		}
	});

  // Custom search
  function filterGlobal() {
     tablaBasesDatos.search($("#global_filter").val(), $("#global_regex").prop("checked"), $("#global_smart").prop("checked")).draw();
  }

  $("input#global_filter").on("keyup click", function() {
     filterGlobal();
  });

  if ($(".app-page .dataTables_scrollBody").length > 0) {
     var ps_datatable_body = new PerfectScrollbar(".app-page .dataTables_scrollBody", {
        theme: "dark"
     });
  }

  // Modals Popup
  $(".modal").modal();
});

//activar botones listar
function activarBtnAll(){
  filtoLista = 2;
  $('#btnAllBaseDatos').removeClass('white');
  $('#btnAllBaseDatos').css('color','white');
  $('#btnAllBaseDatos').addClass('deep-purple darken-1');
}
function activarBtnAllActivas(){
  filtoLista = 1;
  $('#btnAllBaseDatosActiva').removeClass('white');
  $('#btnAllBaseDatosActiva').css('color','white');
  $('#btnAllBaseDatosActiva').addClass('green accent-3');
}
function activarBtnAllInactivas(){
  filtoLista = 0;
  $('#btnAllBaseDatosInactiva').removeClass('white');
  $('#btnAllBaseDatosInactiva').css('color','white');
  $('#btnAllBaseDatosInactiva').addClass('red');
}

//desactivar botones listar
function desactivarBtnAll(){
  $('#btnAllBaseDatos').addClass('white');
  $('#btnAllBaseDatos').css('color','black');
  $('#btnAllBaseDatos').removeClass('deep-purple darken-1');
}
function desactivarBtnAllActivas(){
  $('#btnAllBaseDatosActiva').addClass('white');
  $('#btnAllBaseDatosActiva').css('color','black');
  $('#btnAllBaseDatosActiva').removeClass('green accent-3');
}
function desactivarBtnAllInactivas(){
  $('#btnAllBaseDatosInactiva').addClass('white');
  $('#btnAllBaseDatosInactiva').css('color','black');
  $('#btnAllBaseDatosInactiva').removeClass('red');
}

//mostrar datos de BaseDatos
function mostrarBaseDatos(baseDat){
	$.ajax({
		type:"POST",
		data:
		{
			accion: 'Mostrar',
			codigo: baseDat
		},
		url: '../../app/controllers/BaseDatosController.php',
		dataType: 'json',
		success:function(resp){
			if(resp !=''){
				limpiarBD();

        $('#modal1').modal('open');

        $('#inputBADCodigo').addClass('active');
        $('#inputBADNombre').addClass('active');
        $('#inputBADServidor').addClass('active');
        $('#inputBADAdmin').addClass('active');
        $('#inputBADConexion').addClass('active');
        $('#inputBADDescripcion').addClass('active');

				$('#BAD_Codigo').val(resp.codigo);
				$('#BAD_Nombre').val(resp.nombre);
				$('#BAD_Servidor').val(resp.servidor);
				$('#BAD_Admin').val(resp.admin);
        $('#BAD_Estado').val(resp.estado);
        $('#BAD_Estado').trigger('change');
				$('#BAD_Permisos').val(resp.permisos);
        $('#BAD_Permisos').trigger('change');
				$('#BAD_Conexion').val(resp.conexion);
				$('#BAD_Descripcion').val(resp.descripcion);
			}else{
				M.toast({html: 'Ocurrió un error al recibir datos de la Base de Datos'});
			}
		}
	});
}

//control de formulario BaseDatos
function HabilitarBD()
{
  $('#BAD_Codigo').attr('disabled',false);
  $('#BAD_Nombre').attr('disabled',false);
  $('#BAD_Servidor').attr('disabled',false);
  $('#BAD_Admin').attr('disabled',false);
  $('#BAD_Estado').attr('disabled',false);
  $('#BAD_Estado').formSelect();
  $('#BAD_Permisos').attr('disabled',false);
  $('#BAD_Permisos').formSelect();
  $('#BAD_Conexion').attr('disabled',false);
  $('#BAD_Descripcion').attr('disabled',false);
  $('#btnCancelBaseDatos').attr('disabled',false);
  $('#btnAgregarBaseDatos').attr('disabled',false);
  $('#btnCancelBaseDatos').removeClass('hide');
	$('#btnCancelEditBaseDatos').addClass('hide');
}
function EditHabilitarBD()
{
  $('#BAD_Codigo').attr('disabled',true);
  $('#BAD_Nombre').attr('disabled',false);
  $('#BAD_Servidor').attr('disabled',false);
  $('#BAD_Admin').attr('disabled',false);
  $('#BAD_Estado').attr('disabled',false);
  $('#BAD_Estado').formSelect();
  $('#BAD_Permisos').attr('disabled',false);
  $('#BAD_Permisos').formSelect();
  $('#BAD_Conexion').attr('disabled',false);
  $('#BAD_Descripcion').attr('disabled',false);
	$('#btnAgregarBaseDatos').attr('disabled',true);
	$('#btnAgregarBaseDatos').addClass('hide');
	$('#btnActualizaBaseDatos').attr('disabled',false);
	$('#btnActualizaBaseDatos').removeClass('hide');
	$('#btnCancelBaseDatos').attr('disabled',true);
  $('#btnCancelBaseDatos').addClass('hide');
	$('#btnCancelEditBaseDatos').attr('disabled',false);
	$('#btnCancelEditBaseDatos').removeClass('hide');
}
function DeshabilitarBD()
{
  $('#BAD_Codigo').attr('disabled',true);
  $('#BAD_Nombre').attr('disabled',true);
  $('#BAD_Servidor').attr('disabled',true);
  $('#BAD_Admin').attr('disabled',true);
  $('#BAD_Estado').attr('disabled',true);
  $('#BAD_Estado').formSelect();
  $('#BAD_Permisos').attr('disabled',true);
  $('#BAD_Permisos').formSelect();
  $('#BAD_Conexion').attr('disabled',true);
  $('#BAD_Descripcion').attr('disabled',true);
  $('#btnCancelBaseDatos').attr('disabled',true);
  $('#btnAgregarBaseDatos').attr('disabled',true);
	$('#btnAgregarBaseDatos').removeClass('hide');
	$('#btnActualizaBaseDatos').addClass('hide');
  $('#btnCancelBaseDatos').removeClass('hide');
	$('#btnCancelEditBaseDatos').attr('disabled',true);
	$('#btnCancelEditBaseDatos').addClass('hide');
}
function limpiarBD()
{
  $('#BAD_Codigo').val('');
  $('#BAD_Nombre').val('');
  $('#BAD_Servidor').val('');
  $('#BAD_Admin').val('');
  $('#BAD_Estado').val('1');
  $('#BAD_Estado').trigger('change');
  $('#BAD_Permisos').val('1');
  $('#BAD_Permisos').trigger('change');
  $('#BAD_Conexion').val('');
  $('#BAD_Descripcion').val('');
}

//funcion para Evaluar el estado de la Base de datos
var _estado = function(codigo){
	if(codigo == 1){
		return '<span class="badge green accent-3 border-round">ACTIVO</span>';
	}
	else{
		return '<span class="badge red border-round">INACTIVO</span>';
	}
}
//funcion para Evaluar el campo permisos de la Base de datos
var _permisos = function(codigo){
	if(codigo == 1){
		return '<span class="badge green accent-3 border-round">SI</span>';
	}
	else{
		return '<span class="badge red border-round">NO</span>';
	}
}
//funcion para mostrar botones de accion en la tabla Base de datos
var _acciones = function(codigo){
	return '<button title="Editar" codigo="'+codigo+'" class="mb-2 btn-floating waves-effect waves-light gradient-45deg-blue-indigo gradient-shadow border-round btn-small btnEditar" type="button" style="margin-right: 5px;"><i class="material-icons white-text">edit</i></button><button title="Eliminar" codigo="'+codigo+'" class="mb-2 btn-floating waves-effect waves-light red gradient-shadow border-round btn-small btnEliminar" type="button" style="margin-right: 5px;"><i class="material-icons white-text">delete</i></button>';
}
//funcion para mostrar botones de cambio de estado en la tabla Labores
var _cambState = function(codigo,state){
  if (state == 1) {
    return '<button title="Anular" codigo="'+codigo+'" class="mb-2 btn-floating waves-effect waves-light red gradient-shadow border-round btn-small btnAnular" type="button" style="margin-right: 5px;"><i class="material-icons white-text">close</i></button>';
  } else {
    return '<button title="Activar" codigo="'+codigo+'" class="mb-2 btn-floating waves-effect waves-light green gradient-shadow border-round btn-small btnActivar" type="button" style="margin-right: 5px;"><i class="material-icons white-text">check</i></button>';
  }
}
//funcion para Evaluar la descripcion de la Base de datos
var _descrip = function(des){
	if(des == ''){
		return 'No Tiene Descripción';
	}
	else{
		return des;
	}
}

//funcion para cargar la tabla Bases de Datos
function listarBaseDat(state)
{
  $.ajax({
    url: '../../app/controllers/BaseDatosController.php',
		dataType: 'json',
		type: 'post',
		data:{
			accion: 'listar',
      filtro: state
		},
		success: function(resp){
			tablaBasesDatos.clear().draw(false);
			$(resp).each(function(i, e){
				fila = [e.codigo, e.nombre, e.servidor, e.admin, e.conexion, _permisos(e.permisos), _estado(e.estado), _descrip(e.descripcion), _acciones(e.codigo)+_cambState(e.codigo,e.estado)];
				tablaBasesDatos.row.add(fila).draw(false);
			});
		}
	});
}

//funcion para cambiar de estado
function cambiaEstado(state){
  $.ajax({
    type:"POST",
    url:"../../app/controllers/BaseDatosController.php",
    data:{
      accion: 'cambiaState',
      codigo: codigoSeleccionado,
      BAD_Activo: state
    },
    dataType:'json',
    success:function(r){
      if(r.respuesta!=''){
        M.toast({html: r.respuesta +'!'});
        listarBaseDat(filtoLista);
      }else{
        M.toast({html: 'Ocurrió un error: ' + r.respuesta});
      }
    }
  });
}

//funcion ejecutada al presionar el boton editar de la tabla UnidadEquivalenciaes
$(document).on('click','.btnEditar',function (e) {
  codigoSeleccionado = $(this).attr('codigo');
  mostrarBaseDatos(codigoSeleccionado);
  EditHabilitarBD();
});
//funcion ejecutada al presionar el boton activar de la tabla Labores
$(document).on('click','.btnActivar',function(e){
  codigoSeleccionado = $(this).attr('codigo');
  cambiaEstado('1');
})
//funcion ejecutada al presionar el boton anular de la tabla Labores
$(document).on('click','.btnAnular',function(e){
  codigoSeleccionado = $(this).attr('codigo');
  cambiaEstado('0');
})
//funcion ejecutada al presionar el boton eliminar de la tabla
$(document).on('click','.btnEliminar',function (e) {
	codigoSeleccionado = $(this).attr('codigo');
	swal({
    title: "¿Desea eliminar esta Base de Datos?",
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
				url:"../../app/controllers/BaseDatosController.php",
				data:{
					accion: 'eliminar',
					codigo: codigoSeleccionado
				},
				dataType:'json',
				success:function(r){
					if(r.respuesta!=''){
						DeshabilitarBD();
						limpiarBD();
						swal(r.respuesta,{
							icon: "success",
							timer: 2000,
							buttons: false
						});
						listarBaseDat(filtoLista);
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
