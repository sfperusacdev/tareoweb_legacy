//variables para determinar la UnidadMedida y UnidadEquivalencia que se seleccionó
var codigoUnidMedida;
var codigoSeleccionado;

var codigoEmp = 'E01'; // este codigo debe de ser obtenido de la session y trabajalo en la capa de Datos o capa models

//variable para determinar la tabla
var tablaUnidadEquivalenciaes;

$(document).ready(function(){

  $('#liUniMed').addClass('active');
  // //Sample toast
  setTimeout(function () {
      M.toast({ html: "Seleccione Una Unidad de Medida" });
  }, 2000);

  listarUnidMedida($('#listUnidMed'));

	//Accion de BOTONES de formulario UnidadMedida
  $('#btnAddUnidMedida').click(function(){
		limpiarUM();
		HabilitarUM();
  });
	$('#btnCancelUnidadMedida').click(function(){
		limpiarUM();
		DeshabilitarUM();
		$('#modalUnidMed').modal('close');
  });
	$('#btnCancelEditUnidadMedida').click(function(){
		DeshabilitarUM();
    $('#modalUnidMed').modal('close');
  });

  //Accion de BOTONES de formulario UnidadEquivalencia
  $('#btnAddUnidadEquivalencia').click(function(){
    limpiarUE();
    HabilitarUE();
  });
  $('#btnCancelUnidadEquivalencia').click(function(){
    limpiarUE();
    DeshabilitarUE();
    $('#modal1').modal('close');
  });
  $('#btnCancelEditUnidadEquivalencia').click(function(){
    limpiarUE();
    $('#modal1').modal('close');
  });

  $('.modal').modal();

//Acciones para botones Agregar y actualizar del formulario UnidadMedida
	// Agregar UnidadMedida
  $('#btnAgregarUnidadMedida').click(function(){
    var UNMCodigo = $('#UNM_Codigo').val();
    var UNMNombre = $('#UNM_Nombre').val();
    var UNMSimbolo = $('#UNM_Simbolo').val();
		var UNMDescripcion = $('#UNM_Descripcion').val();

		if (UNMCodigo != '' && UNMNombre != '' && UNMSimbolo != '')
		{
      $.ajax({
				type:"POST",
				data:
				{
					accion: 'insertar',
          UNM_Codigo:UNMCodigo,
					UNM_Nombre: UNMNombre,
					UNM_Simbolo: UNMSimbolo,
					UNM_Descripcion: UNMDescripcion
				},
				url: '../../app/controllers/UnidadMedidaController.php',
				dataType: 'json',
				success:function(resp){
					if(resp.respuesta!=''){
            M.toast({html: resp.respuesta +'!'});
						if (resp.limpiar == 'YES') {
							limpiarUM();
	            DeshabilitarUM();
	            listarUnidMedida($('#listUnidMed'));
              $('#modalUnidMed').modal('close');
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
  // Actualizar UnidadMedida
  $('#btnActualizaUnidadMedida').click(function(){
		var UNMCodigo = $('#UNM_Codigo').val();
    var UNMNombre = $('#UNM_Nombre').val();
    var UNMDescripcion = $('#UNM_Descripcion').val();
		var UNMSimbolo = $('#UNM_Simbolo').val();

		if (UNMCodigo != '' && UNMNombre != '' && UNMSimbolo != '')
		{
			$.ajax({
				type:"POST",
				url:"../../app/controllers/UnidadMedidaController.php",
				data:{
					accion: 'modificar',
					codigo: codigoUnidMedida,
          UNM_Codigo: UNMCodigo,
					UNM_Nombre: UNMNombre,
					UNM_Descripcion: UNMDescripcion,
					UNM_Simbolo: UNMSimbolo
				},
				dataType:'json',
				success:function(r){
					if(r.respuesta!=''){
            DeshabilitarUM();
						listarUnidMedida($('#listUnidMed'));
            $('#modalUnidMed').modal('close');
            M.toast({html: r.respuesta +'!'});
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

//Acciones para botones Agregar y actualizar del formulario UnidadEquivalencia
  // Agregar UnidadEquivalencia
	$('#btnAgregarUnidadEquivalencia').click(function(){
    var UNECodigo = $('#UNE_Codigo').val();
    var UNENombre = $('#UNE_Nombre').val();
		var UNEDescripcion = $('#UNE_Descripcion').val();
		var UNESimbolo = $('#UNE_Simbolo').val();

    if (UNECodigo != '' && UNENombre != '' && UNESimbolo != '')
    {
      $.ajax({
        type:"POST",
        data:
        {
          accion: 'insertar',
          UNM_Codigo: codigoUnidMedida,
          UNE_Codigo: UNECodigo,
          UNE_Nombre: UNENombre,
          UNE_Descripcion: UNEDescripcion,
          UNE_Simbolo: UNESimbolo
        },
        url: '../../app/controllers/UnidadEquivalenciaController.php',
        dataType: 'json',
        success:function(resp){
          if(resp.respuesta!=''){
            M.toast({html: resp.respuesta +'!'});
            if (resp.limpiar == 'YES') {
              limpiarUE();
              DeshabilitarUE();
              listarUnidadEquivalenciaes(codigoUnidMedida);
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
  // Actualizar UnidadEquivalencia
	$('#btnActualizaUnidadEquivalencia').click(function(){
    var UNECodigo = $('#UNE_Codigo').val();
    var UNENombre = $('#UNE_Nombre').val();
		var UNEDescripcion = $('#UNE_Descripcion').val();
		var UNESimbolo = $('#UNE_Simbolo').val();

    if (UNECodigo != '' && UNENombre != '' && UNESimbolo != '')
    {
      $.ajax({
        type:"POST",
        url:"../../app/controllers/UnidadEquivalenciaController.php",
        data:{
          accion: 'modificar',
          codigo: codigoSeleccionado,
          UNM_Codigo: codigoUnidMedida,
          UNE_Codigo: UNECodigo,
          UNE_Nombre: UNENombre,
          UNE_Descripcion: UNEDescripcion,
          UNE_Simbolo: UNESimbolo
        },
        dataType:'json',
        success:function(r){
          if(r.respuesta!=''){
            M.toast({html: r.respuesta +'!'});
            DeshabilitarUE();
            limpiarUE();
            listarUnidadEquivalenciaes(codigoUnidMedida);
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
    return $(window).height() - 300 + "px";
  };

	tablaUnidadEquivalenciaes=$('#tablaUnidadEquivalenciaes').DataTable({
    /*sScrollY: calcDataTableHeight(),
    scrollCollapse: true,*/
    paging: true,
    info: false,
    responsive: true,
    bSort: true,
    lengthMenu: [7],
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
     tablaUnidadEquivalenciaes.search($("#global_filter").val(), $("#global_regex").prop("checked"), $("#global_smart").prop("checked")).draw();
  }

  $("input#global_filter").on("keyup click", function() {
     filterGlobal();
  });

  if ($(".app-page .dataTables_scrollBody").length > 0) {
     var ps_datatable_body = new PerfectScrollbar(".app-page .dataTables_scrollBody", {
        theme: "dark"
     });
  }

  //Opcion buscar en la lista de Cultivos
  $("#buscar").on("keyup", function() {

    var patron = $(this).val();

    if (patron == "") {
      $(".lista").css("display", "list-item");
    } else {
      $(".lista").each(function() {
        if ($(this).text().indexOf(patron) < 0) {
          $(this).css("display", "none");
        } else {
          $(this).css("display", "list-item");
        }
      });
    }
  });
});

//mostrar datos de UnidadMedida
function mostrarUnidadMedida(uni){
	$.ajax({
		type:"POST",
		data:
		{
			accion: 'Mostrar',
			codigo: uni
		},
		url: '../../app/controllers/UnidadMedidaController.php',
		dataType: 'json',
		success:function(resp){
			if(resp !=''){
				limpiarUM();

        $('#modalUnidMed').modal('open');

        $('#inputUNMCodigo').addClass('active');
        $('#inputUNMNombre').addClass('active');
        $('#inputUNMSimbolo').addClass('active');
        $('#inputUNMDescripcion').addClass('active');

				$('#UNM_Codigo').val(resp.codigo);
				$('#UNM_Nombre').val(resp.nombre);
				$('#UNM_Simbolo').val(resp.simbolo);
				$('#UNM_Descripcion').val(resp.descripcion);
			}else{
				M.toast({html: 'Ocurrió un error al recibir datos de la Unidad de Medida'});
			}
		}
	});
}
//mostrar datos de UnidadEquivalencia
function mostrarUnidadEquivalencia(une){
	$.ajax({
		type:"POST",
		data:
		{
			accion: 'Mostrar',
			codigo: une
		},
		url: '../../app/controllers/UnidadEquivalenciaController.php',
		dataType: 'json',
		success:function(resp){
			if(resp !=''){
				limpiarUE();

        $('#modal1').modal('open');

        $('#inputUNECodigo').addClass('active');
        $('#inputUNENombre').addClass('active');
        $('#inputUNESimbolo').addClass('active');
        $('#inputUNEDescripcion').addClass('active');

				$('#UNE_Codigo').val(resp.codigo);
				$('#UNE_Nombre').val(resp.nombre);
				$('#UNE_Simbolo').val(resp.simbolo);
				$('#UNE_Descripcion').val(resp.descripcion);
			}else{
				M.toast({html: 'Ocurrió un error al recibir datos de la Unidad de Equivalencia'});
			}
		}
	});
}

//control de formulario UnidadMedida
function HabilitarUM()
{
  $('#UNM_Codigo').attr('disabled',false);
  $('#UNM_Nombre').attr('disabled',false);
  $('#UNM_Simbolo').attr('disabled',false);
  $('#UNM_Descripcion').attr('disabled',false);
  $('#btnCancelUnidadMedida').attr('disabled',false);
  $('#btnAgregarUnidadMedida').attr('disabled',false);
	$('#btnCancelUnidadMedida').removeClass('hide');
	$('#btnCancelEditUnidadMedida').addClass('hide');
}
function EditHabilitarUM()
{
  $('#UNM_Codigo').attr('disabled',true);
  $('#UNM_Nombre').attr('disabled',false);
  $('#UNM_Simbolo').attr('disabled',false);
  $('#UNM_Descripcion').attr('disabled',false);
	$('#btnAgregarUnidadMedida').attr('disabled',true);
	$('#btnAgregarUnidadMedida').addClass('hide');
	$('#btnActualizaUnidadMedida').attr('disabled',false);
	$('#btnActualizaUnidadMedida').removeClass('hide');
	$('#btnCancelUnidadMedida').attr('disabled',true);
	$('#btnCancelUnidadMedida').addClass('hide');
	$('#btnCancelEditUnidadMedida').attr('disabled',false);
	$('#btnCancelEditUnidadMedida').removeClass('hide');
}
function DeshabilitarUM()
{
  $('#UNM_Codigo').attr('disabled',true);
  $('#UNM_Nombre').attr('disabled',true);
  $('#UNM_Simbolo').attr('disabled',true);
  $('#UNM_Descripcion').attr('disabled',true);
  $('#btnCancelUnidadMedida').attr('disabled',true);
  $('#btnAgregarUnidadMedida').attr('disabled',true);
	$('#btnAgregarUnidadMedida').removeClass('hide');
	$('#btnActualizaUnidadMedida').addClass('hide');
	$('#btnCancelUnidadMedida').removeClass('hide');
	$('#btnCancelEditUnidadMedida').attr('disabled',true);
	$('#btnCancelEditUnidadMedida').addClass('hide');
}
function limpiarUM()
{
  $('#UNM_Codigo').val('');
  $('#UNM_Nombre').val('');
  $('#UNM_Simbolo').val('');
  $('#UNM_Descripcion').val('');
}

//control de formulario UnidadEquivalencia
function HabilitarUE()
{
  $('#UNE_Codigo').attr('disabled',false);
  $('#UNE_Nombre').attr('disabled',false);
	$('#UNE_Simbolo').attr('disabled',false);
  $('#UNE_Descripcion').attr('disabled',false);
  $('#btnCancelUnidadEquivalencia').attr('disabled',false);
  $('#btnAgregarUnidadEquivalencia').attr('disabled',false);
	$('#btnCancelUnidadEquivalencia').removeClass('hide');
	$('#btnCancelEditUnidadEquivalencia').addClass('hide');
}
function EditHabilitarUE()
{
  $('#UNE_Codigo').attr('disabled',true);
  $('#UNE_Nombre').attr('disabled',false);
	$('#UNE_Simbolo').attr('disabled',false);
  $('#UNE_Descripcion').attr('disabled',false);
	$('#btnAgregarUnidadEquivalencia').attr('disabled',true);
	$('#btnAgregarUnidadEquivalencia').addClass('hide');
	$('#btnActualizaUnidadEquivalencia').attr('disabled',false);
	$('#btnActualizaUnidadEquivalencia').removeClass('hide');
	$('#btnCancelUnidadEquivalencia').attr('disabled',true);
	$('#btnCancelUnidadEquivalencia').addClass('hide');
	$('#btnCancelEditUnidadEquivalencia').attr('disabled',false);
	$('#btnCancelEditUnidadEquivalencia').removeClass('hide');
}
function DeshabilitarUE()
{
  $('#UNE_Codigo').attr('disabled',true);
  $('#UNE_Nombre').attr('disabled',true);
	$('#UNE_Simbolo').attr('disabled',true);
  $('#UNE_Descripcion').attr('disabled',true);
  $('#btnCancelUnidadEquivalencia').attr('disabled',true);
  $('#btnAgregarUnidadEquivalencia').attr('disabled',true);
	$('#btnAgregarUnidadEquivalencia').removeClass('hide');
	$('#btnActualizaUnidadEquivalencia').addClass('hide');
	$('#btnCancelUnidadEquivalencia').removeClass('hide');
	$('#btnCancelEditUnidadEquivalencia').attr('disabled',true);
	$('#btnCancelEditUnidadEquivalencia').addClass('hide');
}
function limpiarUE()
{
  $('#UNE_Codigo').val('');
  $('#UNE_Nombre').val('');
	$('#UNE_Simbolo').val('');
  $('#UNE_Descripcion').val('');
}

//funcion para mostrar botones de accion en la tabla UnidadEquivalenciaes
var _acciones = function(codigo){
	return '<button title="Editar" codigo="'+codigo+'" class="mb-2 btn-floating waves-effect waves-light gradient-45deg-blue-indigo gradient-shadow border-round btn-small btnEditar" type="button" style="margin-right: 5px;"><i class="material-icons white-text">edit</i></button><button title="Eliminar" codigo="'+codigo+'" class="mb-2 btn-floating waves-effect waves-light red gradient-shadow border-round btn-small btnEliminar" type="button" style="margin-right: 5px;"><i class="material-icons white-text">delete</i></button>';
}
//funcion para Evaluar la descripcion de la UnidadEquivalencia
var _descrip = function(des){
	if(des == ''){
		return 'No Tiene Descripción';
	}
	else{
		return des;
	}
}

function listarUnidadEquivalenciaes(id){

	$.ajax({
		url: '../../app/controllers/UnidadEquivalenciaController.php',
		dataType: 'json',
		type: 'post',
		data:{
			accion: 'listar',
      UnidadMedida: id
		},
		success: function(resp){
			tablaUnidadEquivalenciaes.clear().draw(false);
			$(resp).each(function(i, e){
				fila = [e.codigo, e.nombre, e.simbolo,_descrip(e.descripcion),_acciones(e.codigo)];
				tablaUnidadEquivalenciaes.row.add(fila).draw(false);
			});
		}
	});
}

//funcion para cargar datos en el combo UnidadMedidaes
function listarUnidMedida(combo){

	$.ajax({
		url: '../../app/controllers/UnidadMedidaController.php',
		dataType: 'json',
		type: 'post',
		data:{
			accion: 'listar'
		},
		success: function(resp){
      combo.find('li').remove();
      $('#infoTotUnidMed').find('p').remove();
      $('#infoTotUnidMed').append('<p class="m-0 subtitle font-weight-700">Número Total de Unid. Medida</p>');
      combo.append('<li class="sidebar-title">Lista de Unid. de Medida</li>');
      j = 0;
			$(resp).each(function(i, e){
        j = j + 1;
				codigo = e.codigo;
				descripcion = e.nombre;
				combo.append('<li class="btnUnidMed lista" codigo="'+codigo+'"><a class="black-text"><i class="material-icons">adjust</i> '+descripcion+'</a></li>');
			});
			$('#infoTotUnidMed').append('<p class="m-0 text-muted">'+j+' Unidades de Medida</p>');
		}
	});
}

//funcion ejecutada al presionar alguna actividad de la lista de actividades
$(document).on('click','.btnUnidMed',function (e) {
  codigoUnidMedida = $(this).attr('codigo');
  listarUnidadEquivalenciaes(codigoUnidMedida);

  $('#listUnidMed').find('li').removeClass('active');
  $(this).addClass('active');
  $('#listUnidMed').find('a').addClass('black-text');
  $('#listUnidMed').find('a').removeClass('white-text');
  $(this).find('a').removeClass('black-text');
  $(this).find('a').addClass('white-text');
  $('#listUnidMed').find('i').addClass('black-text');
  $('#listUnidMed').find('i').removeClass('white-text');
  $(this).find('i').removeClass('black-text');
  $(this).find('i').addClass('white-text');

  $('#btnAddUnidadEquivalencia').removeClass('hide');

  $('#btnAddUnidMedida').removeClass('black-text');
  $('#btnAddUnidMedida').find('i').removeClass('black-text');
});
$(document).on('dblclick','.btnUnidMed',function (e) {
  codigoUnidMedida = $(this).attr('codigo');
  mostrarUnidadMedida(codigoUnidMedida);
  EditHabilitarUM();
});

//funcion ejecutada al presionar el boton editar de la tabla UnidadEquivalenciaes
$(document).on('click','.btnEditar',function (e) {
  codigoSeleccionado = $(this).attr('codigo');
  mostrarUnidadEquivalencia(codigoSeleccionado);
  EditHabilitarUE();
});
//funcion ejecutada al presionar el boton eliminar de la tabla
$(document).on('click','.btnEliminar',function (e) {
	codigoSeleccionado = $(this).attr('codigo');
	swal({
    title: "¿Desea eliminar esta Unidad de Equivalencia?",
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
				url:"../../app/controllers/UnidadEquivalenciaController.php",
				data:{
					accion: 'eliminar',
					codigo: codigoSeleccionado
				},
				dataType:'json',
				success:function(r){
					if(r.respuesta!=''){
						DeshabilitarUE();
						limpiarUE();
						swal(r.respuesta,{
							icon: "success",
							timer: 2000,
							buttons: false
						});
						listarUnidadEquivalenciaes(codigoUnidMedida);
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
