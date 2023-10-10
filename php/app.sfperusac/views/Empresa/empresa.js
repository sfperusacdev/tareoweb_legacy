//variables para determinar la empresa que se seleccionó
var codigoSeleccionado;
var codigoActi='';
var estadoActi;
var filtoLista;
var url;
var select='5';

//variable para determinar la tabla
var tablaEmpresas;

$(document).ready(function(){
	url=geturl();
  $('#liEmp').addClass('active');

  listarEmp();

	//Accion de BOTONES de formulario Empresa
  $('#btnAddEmpresa').click(function(){
		limpiarE();
		HabilitarE();
  });
	$('#btnCancelEmpresa').click(function(){
		limpiarE();
		DeshabilitarE();
		$('#modal1').modal('close');
  });
	$('#btnCancelEditEmpresa').click(function(){
		limpiarE();
    $('#modal1').modal('close');
  });

	// Agregar Empresa
	$('#btnAgregarEmpresa').click(function(){
    var EMPId = $('#EMP_Codigo').val();
    var EMPRasonSocial = $('#EMP_Razon_Social').val();
    var EMPTelefono = $('#EMP_Telefono').val();
		var EMPEmail = $('#EMP_Email').val();
		var EMPDireccion = $('#EMP_Direccion').val();

		if (EMPId != '' && EMPRasonSocial != '' && EMPTelefono != '' && EMPEmail != '' && EMPDireccion != '')
		{
      $.ajax({
				type:"POST",
				data:
				{
					accion: 'insertar',
          EMP_Id: EMPId,
					EMP_Razon_Social: EMPRasonSocial,
					EMP_Telefono: EMPTelefono,
					EMP_Direccion: EMPEmail,
					EMP_Email: EMPDireccion
				},
				url: '../../app/controllers/EmpresaController.php',
				dataType: 'json',
				success:function(resp){
					if(resp.respuesta!=''){
            M.toast({html: resp.respuesta +'!'});
						if (resp.limpiar == 'YES') {
							limpiarE();
	            DeshabilitarE();
	            listarEmp();
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
	// Actualizar Empresa
	$('#btnActualizaEmpresa').click(function(){
		
		var EMPRUC = $('#EMP_RUC').val();
		var EMPRasonSocial = $('#EMP_Razon_Social').val();
        var EMPTelefono = $('#EMP_Telefono').val();
		var EMPEmail = $('#EMP_Email').val();
		var EMPDireccion = $('#EMP_Direccion').val();
		var EMPActivo = $('#EMP_Activo').val();

		alert(codigoSeleccionado + EMPRUC+EMPRasonSocial+EMPTelefono+EMPEmail+EMPDireccion+EMPActivo);
		if (EMPRasonSocial != '' )
		{
			swal({
				title: "¿Desea grabar los cambios?",
				text: "Al aceptar los cambios serán grabados en el sistema",
				type: "warning",
				showCancelButton: true,
				confirmButtonClass: "btn-danger",
				confirmButtonText: "Sí, Grabar!",
				cancelButtonText: "No, cancelar!",
				closeOnConfirm: false,
				closeOnCancel: false
			  },function (isConfirm) {
				if (isConfirm) {
				  $.ajax({
					type:"POST",
				    url:url,
				    data:{
					controller: 'Empresa',
					accion: 'modificar',
					EMP_Id: codigoSeleccionado,
					EMP_RUC: EMPRUC,
					EMP_Razon_Social: EMPRasonSocial,
					EMP_Telefono: EMPTelefono,
					EMP_Direccion: EMPDireccion,
					EMP_Email: EMPEmail,
					EMP_Activo: EMPActivo
				    },
					dataType:'json',
					success:function(r){
					  if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error'){
						M.toast({html: r.respuesta +'!'});
                        DeshabilitarE();
						limpiarE();
						swal("Actualizado!",(r.respuesta).substr(3,100), "success");
						listarEmp();
                        $('#modal1').modal('close');
					  }else{
					  
						swal("Error", "Oucrrió un error! :) " + r.respuesta, "error");
			
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
		else{
			M.toast({html: 'Complete todos los Campos Obligatorios (*)'});
		}
	});

  var calcDataTableHeight = function() {
     return $(window).height() - 330 + "px";
  };
	tablaEmpresas=$('#tablaEmpresas').DataTable({
    /*sScrollY: calcDataTableHeight(),
    scrollCollapse: true,*/
    paging: true,
    info: false,
    responsive: true,
    bSort: true,
    lengthMenu: [5],
    columnDefs: [{
			orderable: false,
			targets: [3]
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
     tablaEmpresas.search($("#global_filter").val(), $("#global_regex").prop("checked"), $("#global_smart").prop("checked")).draw();
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
  $(".modal").modal({dismissible: false,
    onOpenEnd: function() {
      $('#EMP_Codigo').focus();
    }});

});

//mostrar datos de empresa
function mostrarEmpresa(emp){
	$.ajax({
		type:"POST",
		data:
		{
			controller:'Empresa',
			accion: 'Mostrar',
			codigo: emp
		},
		url: url,
		dataType: 'json',
		success:function(resp){
			if(resp !=''){
				limpiarE();

        $('#modal1').modal('open');

		$('#inputEMPCodigo').addClass('active');
		$('#inputEMPRUC').addClass('active');
        $('#inputEMPRazon_Social').addClass('active');
        $('#inputEMPTelefono').addClass('active');
        $('#inputEMPEmail').addClass('active');
        $('#inputEMPDireccion').addClass('active');

				$('#EMP_Codigo').val(resp.codigo);
				$('#EMP_RUC').val(resp.ruc);
				$('#EMP_Razon_Social').val(resp.nombre);
				$('#EMP_Telefono').val(resp.telefono);
				$('#EMP_Direccion').val(resp.direccion);
				$('#EMP_Email').val(resp.email);
				$('#EMP_Activo').val(resp.estado);
				$('#EMP_RUC').focus();
			}else{
				M.toast({html: 'Ocurrió un error al recibir datos de la empresa'});
			}
		}
	});
}

//control de formulario Empresa
function HabilitarE()
{
  $('#EMP_Codigo').attr('disabled',false);
  $('#EMP_Razon_RUC').attr('disabled',false);
  $('#EMP_Razon_Social').attr('disabled',false);
  $('#EMP_Telefono').attr('disabled',false);
  $('#EMP_Direccion').attr('disabled',false);
  $('#EMP_Email').attr('disabled',false);
  $('#EMP_Activo').attr('disabled',false);
  $('#EMP_Activo').formSelect();
  $('#btnCancelEmpresa').attr('disabled',false);
  $('#btnAgregarEmpresa').attr('disabled',false);
  $('#btnCancelEmpresa').removeClass('hide');
  $('#btnCancelEditEmpresa').addClass('hide');
  $('#btnEliminarEmpresa').attr('disabled',true);
  $('#btnEliminarEmpresa').addClass('hide');
  $('#btnActualizaEmpresa').attr('disabled',true);
  $('#btnActualizaEmpresa').addClass('hide');
}
function EditHabilitarE()
{
  $('#EMP_Codigo').attr('disabled',true);
  $('#EMP_RUC').attr('disabled',false);
  $('#EMP_Razon_Social').attr('disabled',false);
  $('#EMP_Telefono').attr('disabled',false);
  $('#EMP_Direccion').attr('disabled',false);
  $('#EMP_Email').attr('disabled',false);
  $('#EMP_Activo').attr('disabled',false);
  $('#EMP_Activo').formSelect();
	$('#btnAgregarEmpresa').attr('disabled',true);
	$('#btnAgregarEmpresa').addClass('hide');
	$('#btnActualizaEmpresa').attr('disabled',false);
	$('#btnActualizaEmpresa').removeClass('hide');
	$('#btnCancelEmpresa').attr('disabled',true);
	$('#btnCancelEmpresa').addClass('hide');
	$('#btnCancelEditEmpresa').attr('disabled',false);
  $('#btnCancelEditEmpresa').removeClass('hide');
  $('#btnEliminarEmpresa').attr('disabled',false);
  $('#btnEliminarEmpresa').removeClass('hide');
  $('#btnActualizaEmpresa').attr('disabled',false);
  $('#btnActualizaEmpresa').removeClass('hide');



}
function DeshabilitarE()
{
  $('#EMP_Codigo').attr('disabled',true);
  $('#EMP_RUC').attr('disabled',true);
  $('#EMP_Razon_Social').attr('disabled',true);
  $('#EMP_Telefono').attr('disabled',true)
  $('#EMP_Direccion').attr('disabled',true);
	$('#EMP_Email').attr('disabled',true);
  $('#btnCancelEmpresa').attr('disabled',true);
  $('#btnAgregarEmpresa').attr('disabled',true);
	$('#btnAgregarEmpresa').attr('disabled',true);
	$('#btnAgregarEmpresa').addClass('hide');
	$('#btnActualizaEmpresa').attr('disabled',false);
	$('#btnActualizaEmpresa').removeClass('hide');
	$('#btnCancelEmpresa').attr('disabled',true);
	$('#btnCancelEmpresa').addClass('hide');
	$('#btnCancelEditEmpresa').attr('disabled',false);
  $('#btnCancelEditEmpresa').removeClass('hide');
  $('#btnEliminarEmpresa').attr('disabled',false);
  $('#btnEliminarEmpresa').removeClass('hide');
  $('#btnActualizaEmpresa').attr('disabled',false);
  $('#btnActualizaEmpresa').removeClass('hide');
}
function limpiarE()
{
  $('#EMP_Codigo').val('');
  $('#EMP_RUC').val('');
  $('#EMP_Razon_Social').val('');
  $('#EMP_Telefono').val('');
  $('#EMP_Direccion').val('');
  $('#EMP_Email').val('');
}

//funcion para mostrar botones de accion en la tabla empresas
var _acciones = function(codigo){
	return '<button title="Editar" codigo="'+codigo+'" class="mb-2 btn-floating waves-effect waves-light gradient-45deg-blue-indigo gradient-shadow border-round btn-small btnEditar" type="button" style="margin-right: 5px;"><i class="material-icons white-text">edit</i></button><button title="Eliminar" codigo="'+codigo+'" class="mb-2 btn-floating waves-effect waves-light red gradient-shadow border-round btn-small btnEliminar" type="button" style="margin-right: 5px;"><i class="material-icons white-text">delete</i></button>';
}
//funcion para mostrar botones de cambio de estado en la tabla empresa
var _cambState = function(codigo,state){
	if (state == 1) {
	  return '<button title="Anular" codigo="'+codigo+'" class="mb-2 btn-floating waves-effect waves-light red gradient-shadow border-round btn-small btnAnular" type="button" style="margin-right: 5px;"><i class="material-icons white-text">close</i></button>';
	} else {
	  return '<button title="Activar" codigo="'+codigo+'" class="mb-2 btn-floating waves-effect waves-light green gradient-shadow border-round btn-small btnActivar" type="button" style="margin-right: 5px;"><i class="material-icons white-text">check</i></button>';
	}
  }

//funcion para cargar datos en el combo empresa y sucursal
function listarEmp(){

	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		data:{
			controller:'Empresa',
			accion: 'listar'
		},
		success: function(resp){
            tablaEmpresas.clear().draw(false);
			$(resp).each(function(i, e){
				fila = [e.codigo, e.ruc,e.nombre,e.direccion,_acciones(e.codigo)+_cambState(e.codigo,e.estado)];
				tablaEmpresas.row.add(fila).draw(false);
			});
		}
	});
}

//funcion ejecutada al presionar el boton editar de la tabla consumidor
$(document).on('click','.btnEditar',function (e) {
	codigoSeleccionado = $(this).attr('codigo');
	mostrarEmpresa(codigoSeleccionado);
	EditHabilitarE();
});
//funcion ejecutada al presionar el boton eliminar de la tabla consumidor
$(document).on('click','.btnEliminar',function (e) {
	codigoSeleccionado = $(this).attr('codigo');
	swal({
    title: "¿Eliminar Empresa?",
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
				url:"../../app/controllers/EmpresaController.php",
				data:{
					accion: 'eliminar',
					codigo: codigoSeleccionado
				},
				dataType:'json',
				success:function(r){
					if(r.respuesta!=''){
						DeshabilitarE();
						limpiarE();
						swal(r.respuesta,{
							icon: "success",
							timer: 2000,
							buttons: false
						});
						listarEmp();
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
