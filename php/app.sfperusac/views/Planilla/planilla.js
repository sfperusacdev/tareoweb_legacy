//variables para determinar la Planilla que se seleccionó
var codigoSeleccionado;

//variable para determinar la tabla
var tablaPlanillas;

$(document).ready(function(){

  $('#liPlani').addClass('active');

  listarPlanilla();
	//Accion de BOTONES de formulario Planilla
  $('#btnAddPlanilla').click(function(){
		limpiarPL();
		HabilitarPL();
  });
  $('#btnCancelPlanilla').click(function(){
		limpiarPL();
		DeshabilitarPL();
    $('#modal1').modal('close');
  });
  $('#btnCancelEditPlanilla').click(function(){
    limpiarPL();
    $('#modal1').modal('close');
  });

  // Agregar Planilla
  $('#btnAgregarPlanilla').click(function(){
    var PLACodigo = $('#PLA_Codigo').val();
    var PLANombre = $('#PLA_Nombre').val();
		var PLADescripcion = $('#PLA_Descripcion').val();

		if (PLACodigo != '' && PLANombre != '')
		{
      $.ajax({
				type:"POST",
				data:
				{
					accion: 'insertar',
          PLA_Codigo: PLACodigo,
					PLA_Nombre: PLANombre,
					PLA_Descripcion: PLADescripcion
				},
				url: '../../app/controllers/PlanillaController.php',
				dataType: 'json',
				success:function(resp){
					if(resp.respuesta!=''){
            M.toast({html: resp.respuesta +'!'});
						if (resp.limpiar == 'YES') {
							limpiarPL();
	            DeshabilitarPL();
	            listarPlanilla();
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
  // Actualizar Planilla
  $('#btnActualizaPlanilla').click(function(){
    var PLACodigo = $('#PLA_Codigo').val();
    var PLANombre = $('#PLA_Nombre').val();
		var PLADescripcion = $('#PLA_Descripcion').val();

		if (PLACodigo != '' && PLANombre != '')
		{
			$.ajax({
				type:"POST",
				url:"../../app/controllers/PlanillaController.php",
				data:{
					accion: 'modificar',
					codigo: codigoSeleccionado,
          PLA_Codigo: PLACodigo,
					PLA_Nombre: PLANombre,
					PLA_Descripcion: PLADescripcion
				},
				dataType:'json',
				success:function(r){
					if(r.respuesta!=''){
            M.toast({html: r.respuesta +'!'});
            DeshabilitarPL();
            limpiarPL();
						listarPlanilla();
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
	tablaPlanillas=$('#tablaPlanillas').DataTable({
    /*sScrollY: calcDataTableHeight(),
    scrollCollapse: true,*/
    paging: true,
    info: false,
    responsive: true,
    bSort: true,
    lengthMenu: [5],
    columnDefs: [{
			orderable: false,
			targets: [2]
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
     tablaPlanillas.search($("#global_filter").val(), $("#global_regex").prop("checked"), $("#global_smart").prop("checked")).draw();
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

//mostrar datos de Planilla
function mostrarPlanilla(pla){
	$.ajax({
		type:"POST",
		data:
		{
			accion: 'Mostrar',
			codigo: pla
		},
		url: '../../app/controllers/PlanillaController.php',
		dataType: 'json',
		success:function(resp){
			if(resp !=''){
				limpiarPL();

        $('#modal1').modal('open');

        $('#inputPLACodigo').addClass('active');
        $('#inputPLANombre').addClass('active');
        $('#inputPLADescripcion').addClass('active');

				$('#PLA_Codigo').val(resp.codigo);
				$('#PLA_Nombre').val(resp.nombre);
				$('#PLA_Descripcion').val(resp.descripcion);
			}else{
				M.toast({html: 'Ocurrió un error al recibir datos de la Planilla'});
			}
		}
	});
}

//control de formulario Planilla
function HabilitarPL()
{
  $('#PLA_Codigo').attr('disabled',false);
  $('#PLA_Nombre').attr('disabled',false);
  $('#PLA_Descripcion').attr('disabled',false);
  $('#btnCancelPlanilla').attr('disabled',false);
  $('#btnAgregarPlanilla').attr('disabled',false);
  $('#btnCancelPlanilla').removeClass('hide');
	$('#btnCancelEditPlanilla').addClass('hide');
}
function EditHabilitarPL()
{
  $('#PLA_Codigo').attr('disabled',true);
  $('#PLA_Nombre').attr('disabled',false);
  $('#PLA_Descripcion').attr('disabled',false);
	$('#btnAgregarPlanilla').attr('disabled',true);
	$('#btnAgregarPlanilla').addClass('hide');
	$('#btnActualizaPlanilla').attr('disabled',false);
	$('#btnActualizaPlanilla').removeClass('hide');
	$('#btnCancelPlanilla').attr('disabled',true);
  $('#btnCancelPlanilla').addClass('hide');
	$('#btnCancelEditPlanilla').attr('disabled',false);
	$('#btnCancelEditPlanilla').removeClass('hide');
}
function DeshabilitarPL()
{
  $('#PLA_Codigo').attr('disabled',true);
  $('#PLA_Nombre').attr('disabled',true);
  $('#PLA_Descripcion').attr('disabled',true);
  $('#btnCancelPlanilla').attr('disabled',true);
  $('#btnAgregarPlanilla').attr('disabled',true);
	$('#btnAgregarPlanilla').removeClass('hide');
	$('#btnActualizaPlanilla').addClass('hide');
  $('#btnCancelPlanilla').addClass('hide');
	$('#btnCancelEditPlanilla').attr('disabled',true);
	$('#btnCancelEditPlanilla').removeClass('hide');
}
function limpiarPL()
{
  $('#PLA_Codigo').val('');
  $('#PLA_Nombre').val('');
  $('#PLA_Descripcion').val('');
}

//funcion para mostrar botones de accion en la tabla Base de datos
var _acciones = function(codigo){
	return '<button title="Editar" codigo="'+codigo+'" class="mb-2 btn-floating waves-effect waves-light gradient-45deg-blue-indigo gradient-shadow border-round btn-small btnEditar" type="button" style="margin-right: 5px;"><i class="material-icons white-text">edit</i></button><button title="Eliminar" codigo="'+codigo+'" class="mb-2 btn-floating waves-effect waves-light red gradient-shadow border-round btn-small btnEliminar" type="button" style="margin-right: 5px;"><i class="material-icons white-text">delete</i></button>';
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
function listarPlanilla()
{
  $.ajax({
    url: '../../app/controllers/PlanillaController.php',
		dataType: 'json',
		type: 'post',
		data:{
			accion: 'listar'
		},
		success: function(resp){
			tablaPlanillas.clear().draw(false);
			$(resp).each(function(i, e){
				fila = [e.codigo, e.nombre, _descrip(e.descripcion), _acciones(e.codigo)];
				tablaPlanillas.row.add(fila).draw(false);
			});
		}
	});
}

//funcion ejecutada al presionar el boton editar de la tabla UnidadEquivalenciaes
$(document).on('click','.btnEditar',function (e) {
  codigoSeleccionado = $(this).attr('codigo');
  mostrarPlanilla(codigoSeleccionado);
  EditHabilitarPL();
});
//funcion ejecutada al presionar el boton eliminar de la tabla
$(document).on('click','.btnEliminar',function (e) {
	codigoSeleccionado = $(this).attr('codigo');
	swal({
    title: "¿Desea eliminar esta Planilla?",
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
				url:"../../app/controllers/PlanillaController.php",
				data:{
					accion: 'eliminar',
					codigo: codigoSeleccionado
				},
				dataType:'json',
				success:function(r){
					if(r.respuesta!=''){
						DeshabilitarPL();
						limpiarPL();
						swal(r.respuesta,{
							icon: "success",
							timer: 2000,
							buttons: false
						});
						listarPlanilla();
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
