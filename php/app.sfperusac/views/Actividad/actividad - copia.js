//variables para determinar la actividad y labor que se seleccionó
var codigoSeleccionado;
var codigoActi;
var estadoActi;
var filtoLista;

//variable para determinar la tabla
var tablaLabores;
$(document).ready(function(){

  // //Sample toast
  setTimeout(function () {
      M.toast({ html: "Seleccione Una Actividad" });
  }, 2000);

  //$('#listActi').append('<a id="btnAddActividad" class="sidebar-title waves-effect modal-trigger" href="#modalActi" style="color:blue;"><i class="material-icons">add</i><span> Nueva Actividad</span></a>');
  listarActivi($('#listActi'));

  $('#liActi').addClass('active');

  //botones para listar
  $('#btnAllLabor').click(function(){
    activarBtnAll();
    desactivarBtnAllActivas();
    desactivarBtnAllInactivas();
    listarLabores(codigoActi,filtoLista);
  })
  $('#btnAllLaborActiva').click(function(){
    desactivarBtnAll();
    activarBtnAllActivas();
    desactivarBtnAllInactivas();
    listarLabores(codigoActi,filtoLista);
  })
  $('#btnAllLaborInactiva').click(function(){
    desactivarBtnAll();
    desactivarBtnAllActivas();
    activarBtnAllInactivas();
    listarLabores(codigoActi,filtoLista);
  })

	//Accion de BOTONES de formulario Actividad
  $('#btnAddActividad').click(function(){
		limpiarA();
		HabilitarA();
  });
	$('#btnCancelActividad').click(function(){
		limpiarA();
		DeshabilitarA();
    $('#modalActi').modal('close');
  });
	$('#btnCancelEditActividad').click(function(){
		DeshabilitarA();
    $('#modalActi').modal('close');
  });
 

  //Accion de BOTONES de formulario Labor
  $('#btnAddLabor').click(function(){
    limpiarL();
    HabilitarL();
  });
  $('#btnCancelLabor').click(function(){
    limpiarL();
    DeshabilitarL();
    $('#modal1').modal('close');
  });
  $('#btnCancelEditLabor').click(function(){
    limpiarL();
    $('#modal1').modal('close');
  });

//Acciones para botones Agregar y actualizar del formulario Actividad
	// Agregar Actividad
  $('#btnAgregarActividad').click(function(){
    var ACTCodigo = $('#ACT_Codigo').val();
    var ACTNombre_Corto = $('#ACT_Nombre_Corto').val();
    var ACTX_Rendimiento = $('#ACT_X_Rendimiento').val();
		var ACTActivo = $('#ACT_Activo').val();
		var ACTDescripcion = $('#ACT_Descripcion').val();

		if (ACTCodigo != '' && ACTNombre_Corto != '')
		{
      swal({
        title: "¿Desea grabar los datos?",
        text: "Al aceptar, los datos serán grabados en el sistema",
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
                controller: 'Actividad',
                accion: 'insertar',
                ACT_Codigo:ACTCodigo,
                ACT_Nombre_Corto: ACTNombre_Corto,
                ACT_X_Rendimiento: ACTX_Rendimiento,
                ACT_Activo: ACTActivo,
                ACT_Descripcion: ACTDescripcion
              },
              dataType:'json',
              success:function(r){
                if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error'){
                  limpiarA();
                  DeshabilitarA();
                  listarActivi($('#listActi'));
                  $('#modalActi').modal('close');
                  M.toast({html: r.respuesta +'!'});
                      
                  swal("Registrado!",(r.respuesta).substr(3,100), "success");
      
                  listarActivi();
                }else{
                
                  swal("Error", "Oucrriò un error! :) " + r.respuesta, "error");
      
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
  // Actualizar Actividad
  $('#btnActualizaActividad').click(function(){
		var ACTCodigo = $('#ACT_Codigo').val();
    var ACTNombre_Corto = $('#ACT_Nombre_Corto').val();
    var ACTX_Rendimiento = $('#ACT_X_Rendimiento').val();
		var ACTActivo = $('#ACT_Activo').val();
		var ACTDescripcion = $('#ACT_Descripcion').val();

		if (ACT_Codigo != '' && ACT_Nombre_Corto != '')
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
              controller: 'Actividad',
              accion: 'modificar',
              codigo: codigoActi,
              ACT_Codigo: ACTCodigo,
              ACT_Nombre_Corto: ACTNombre_Corto,
              ACT_X_Rendimiento: ACTX_Rendimiento,
              ACT_Activo: ACTActivo,
              ACT_Descripcion: ACTDescripcion
            },
            dataType:'json',
            success:function(r){
              if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error'){
                DeshabilitarA();
                listarActivi($('#listActi'));
                $('#modalActi').modal('close');
                M.toast({html: r.respuesta +'!'});
                    
                swal("Actualizado!",(r.respuesta).substr(3,100), "success");
    
                listarLabores(codigoActi,filtoLista);
              }else{
              
                swal("Error", "Oucrriò un error! :) " + r.respuesta, "error");
    
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
  //Eliminar Actividad
  $('#btnEliminarActividad').click(function(){
		var ACTCodigo = $('#ACT_Codigo').val();
    deleteAct(ACTCodigo);
	
	});

//Acciones para botones Agregar y actualizar del formulario Labor
  // Agregar Labor
	$('#btnAgregarLabor').click(function(){
    //var ACTId = $('#ACT_Id').val();
    var LABCodigo = $('#LAB_Codigo').val();
    var LABNombreCorto = $('#LAB_Nombre_Corto').val();
		var LABDescripcion = $('#LAB_Descripcion').val();
		var LABActivo = $('#LAB_Activo').val();

    if (LABCodigo != '' && LABNombreCorto != '' && LABActivo != '')
    {
      swal({
        title: "¿Desea grabar los datos?",
        text: "Al aceptar, los datos serán grabados en el sistema",
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
                controller:'Labor',
                accion: 'insertar',
                ACT_Codigo:codigoActi,
                LAB_Codigo: LABCodigo,
                LAB_NombreCorto: LABNombreCorto,
                LAB_Descripcion: LABDescripcion,
                LAB_Activo: LABActivo
              },
              dataType:'json',
              success:function(r){
                if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error'){
                  limpiarL();
                  DeshabilitarL();
                  listarLabores(codigoActi,filtoLista);
                  $('#modal1').modal('close');
                  M.toast({html: r.respuesta +'!'});
                      
                  swal("Registrado!",(r.respuesta).substr(3,100), "success");

                }else{
                
                  swal("Error", "Oucrriò un error! :) " + r.respuesta, "error");
      
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
  // Actualizar Labor
	$('#btnActualizaLabor').click(function(){

    var LABCodigo = $('#LAB_Codigo').val();
    var LABNombreCorto = $('#LAB_Nombre_Corto').val();
		var LABDescripcion = $('#LAB_Descripcion').val();
		var LABActivo = $('#LAB_Activo').val();

    if (LABCodigo != '' && LABNombreCorto != '' && LABActivo != '')
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
                controller:'Labor',
                accion: 'modificar',
                codigo: codigoSeleccionado,
                ACT_Codigo:codigoActi,
                LAB_Codigo: LABCodigo,
                LAB_NombreCorto: LABNombreCorto,
                LAB_Descripcion: LABDescripcion,
                LAB_Activo: LABActivo
              },
              dataType:'json',
              success:function(r){
                if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error'){
                  M.toast({html: r.respuesta +'!'});
                  DeshabilitarL();
                  limpiarL();
                  listarLabores(codigoActi,filtoLista);
                  $('#modal1').modal('close');
                      
                  swal("Actualizado!",(r.respuesta).substr(3,100), "success");

                }else{
                
                  swal("Error", "Oucrriò un error! :) " + r.respuesta, "error");
      
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
  tablaLabores=$('#tablaLabores').DataTable({
    /*sScrollY: calcDataTableHeight(),
    scrollCollapse: true,*/

  lengthMenu: [[5,10, 20, 25, 50, -1], [5,10, 20, 25, 50, 'Todos']],
  bProcessing: true,
 

    paging: true,
    info: true,
    responsive: true,
    bSort: true,
    pageLength:5,

    columnDefs: [{
			orderable: false,
			targets: [2,4]
    }],
   
    language: {
    
      lengthMenu: "Mostrar _MENU_ registros por p&aacutegina",
     // "lengthMenu": '<div class="dataTables_legth" id="page-length-option_length"><label>Show <select name="page-length-option_length" aria-controls="page-length-option" class=""><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="-1">All</option></select> entries</label></div>',
      info: "P&aacutegina _PAGE_ of _PAGES_",
      "sProcessing":     "Procesando...",

     // "sLengthMenu":     "Mostrar _MENU_ registros",
  
      "sZeroRecords":    "No se encontraron resultados",
  
      "sEmptyTable":     "Ningún dato disponible en esta tabla",
  
      "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",

      "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
  
      "sInfoPostFix":    "",
  
      "sSearch":         "Buscar:",
  
      "sUrl":            "",
  
      "sInfoThousands":  ",",
  
      "sLoadingRecords": "Cargando...",
  
      "oPaginate": {
  
          "sFirst":    "Primero",
  
          "sLast":     "Último",
  
          "sNext":     "Siguiente",
  
          "sPrevious": "Anterior"
  
      },
  
      "oAria": {
  
          "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
  
          "sSortDescending": ": Activar para ordenar la columna de manera descendente"
  
      }
  
  
		}
  });
  // Custom search
  function filterGlobal() {
     tablaLabores.search($("#global_filter").val(), $("#global_regex").prop("checked"), $("#global_smart").prop("checked")).draw();
  }

  $("input#global_filter").on("keyup click", function() {
     filterGlobal();
  });

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

  if ($(".app-page .dataTables_scrollBody").length > 0) {
     var ps_datatable_body = new PerfectScrollbar(".app-page .dataTables_scrollBody", {
        theme: "dark"
     });
  }

  // Toggle class of sidenav
  $("#contact-sidenav").sidenav({
     onOpenStart: function() {
        $("#sidebar-list").addClass("sidebar-show");
     },
     onCloseEnd: function() {
        $("#sidebar-list").removeClass("sidebar-show");
     }
  });

  $(".contact-sidenav li").on("click", function() {
     $("li").removeClass("active");
     $(this).addClass("active");
  });

  // Modals Popup
  $(".modal").modal();

  //tooltip
  $('.tooltipped').tooltip();

  // Close other sidenav on click of any sidenav
  if ($(window).width() > 900) {
     $("#contact-sidenav").removeClass("sidenav");
  }
  //tablaLabores.clear().draw(false);
	//listarLabores();

});


//activar botones listar
function activarBtnAll(){
  filtoLista = 2;
  $('#btnAllLabor').removeClass('white');
  $('#btnAllLabor').css('color','white');
  $('#btnAllLabor').addClass('deep-purple darken-1');
}
function activarBtnAllActivas(){
  filtoLista = 1;
  $('#btnAllLaborActiva').removeClass('white');
  $('#btnAllLaborActiva').css('color','white');
  $('#btnAllLaborActiva').addClass('green accent-3');
}
function activarBtnAllInactivas(){
  filtoLista = 0;
  $('#btnAllLaborInactiva').removeClass('white');
  $('#btnAllLaborInactiva').css('color','white');
  $('#btnAllLaborInactiva').addClass('red');
}

//desactivar botones listar
function desactivarBtnAll(){
  $('#btnAllLabor').addClass('white');
  $('#btnAllLabor').css('color','black');
  $('#btnAllLabor').removeClass('deep-purple darken-1');
}
function desactivarBtnAllActivas(){
  $('#btnAllLaborActiva').addClass('white');
  $('#btnAllLaborActiva').css('color','black');
  $('#btnAllLaborActiva').removeClass('green accent-3');
}
function desactivarBtnAllInactivas(){
  $('#btnAllLaborInactiva').addClass('white');
  $('#btnAllLaborInactiva').css('color','black');
  $('#btnAllLaborInactiva').removeClass('red');
}

//mostrar datos de Actividad
function mostrarActividad(acti){
 
	$.ajax({
		type:"POST",
		data:
		{
      controller:'Actividad',
			accion: 'Mostrar',
			codigo: acti
		},
		url: 'http://localhost/app.sfperusac.services/',
		dataType: 'json',
		success:function(resp){
      
			if(resp !=''){
				limpiarA();
        //DeshabilitarA();
       // eliminarSeleccion('ACT_Activo');
        $('#modalActi').modal('open');
          
        $('#inputActCodigo').addClass('active');
        $('#inputActNombre').addClass('active');
        $('#inputActDescripcion').addClass('active');

				$('#ACT_Codigo').val(resp.codigo);
				$('#ACT_Nombre_Corto').val(resp.nombre);
				$('#ACT_X_Rendimiento').val(resp.tipo);
        $('#ACT_X_Rendimiento').formSelect();
        $('#ACT_Activo').val(resp.estado);
        $('#ACT_Activo').formSelect();
       // $("#ACT_Activo option[value='0']").attr("selected",true);
      //  $('#ACT_Activo').trigger('change');
				$('#ACT_Descripcion').val(resp.descripcion);
			}else{
				M.toast({html: 'Ocurrió un error al recibir datos de la actividad'});
			}
		}
	});
}
//mostrar datos de Labor
function mostrarLabor(lab){
	$.ajax({
		type:"POST",
		data:
		{
      controller:'Labor',
			accion: 'Mostrar',
      codigo: lab,
      actividad:codigoActi
		},
		url: 'http://localhost/app.sfperusac.services/',
		dataType: 'json',
		success:function(resp){
			if(resp !=''){
				limpiarL();

        $('#modal1').modal('open');

        $('#inputCodigo').addClass('active');
        $('#inputNombre').addClass('active');
        $('#inputDescripcion').addClass('active');


				$('#LAB_Codigo').val(resp.codigo);
				$('#LAB_Nombre_Corto').val(resp.nombre);
				$('#LAB_Activo').val(resp.estado);
        $('#LAB_Activo').trigger('change');
        $('#LAB_Activo').formSelect();
				$('#LAB_Descripcion').val(resp.descripcion);
			}else{
				M.toast({html: 'Ocurrió un error al recibir datos de la Labor'});
			}
		}
	});
}

//control de formulario Actividad
function HabilitarA()
{
  $('#ACT_Codigo').attr('disabled',false);
  $('#ACT_Nombre_Corto').attr('disabled',false);
  $('#ACT_X_Rendimiento').attr('disabled',false);
	$('#ACT_X_Rendimiento').formSelect();
	$('#ACT_Activo').attr('disabled',false);
	$('#ACT_Activo').formSelect();
  $('#ACT_Descripcion').attr('disabled',false);
  $('#btnCancelActividad').attr('disabled',false);
  $('#btnAgregarActividad').attr('disabled',false);
	$('#btnCancelActividad').removeClass('hide');
  $('#btnCancelEditActividad').addClass('hide');
  $('#btnEliminarActividad').attr('disabled',true);
  $('#btnEliminarActividad').addClass('hide');
  $('#btnActualizaActividad').attr('disabled',true);
  $('#btnActualizaActividad').addClass('hide');

}
function EditHabilitarA()
{
  $('#ACT_Codigo').attr('disabled',true);
  $('#ACT_Nombre_Corto').attr('disabled',false);
  $('#ACT_X_Rendimiento').attr('disabled',false);
	$('#ACT_X_Rendimiento').formSelect();
	$('#ACT_Activo').attr('disabled',false);
	$('#ACT_Activo').formSelect();
  $('#ACT_Descripcion').attr('disabled',false);
	$('#btnAgregarActividad').attr('disabled',true);
	$('#btnAgregarActividad').addClass('hide');
	$('#btnActualizaActividad').attr('disabled',false);
	$('#btnActualizaActividad').removeClass('hide');
	$('#btnCancelActividad').attr('disabled',true);
	$('#btnCancelActividad').addClass('hide');
	$('#btnCancelEditActividad').attr('disabled',false);
  $('#btnCancelEditActividad').removeClass('hide');
  $('#btnEliminarActividad').attr('disabled',false);
  $('#btnEliminarActividad').removeClass('hide');
  $('#btnActualizaActividad').attr('disabled',false);
  $('#btnActualizaActividad').removeClass('hide');
}

function DeshabilitarA()
{
  $('#ACT_Codigo').attr('disabled',true);
  $('#ACT_Nombre_Corto').attr('disabled',true);
  $('#ACT_X_Rendimiento').attr('disabled',true);
	$('#ACT_X_Rendimiento').formSelect();
	$('#ACT_Activo').attr('disabled',true);
	$('#ACT_Activo').formSelect();
  $('#ACT_Descripcion').attr('disabled',true);
  $('#btnCancelActividad').attr('disabled',true);
  $('#btnAgregarActividad').attr('disabled',true);
	$('#btnAgregarActividad').removeClass('hide');
	$('#btnActualizaActividad').addClass('hide');
	$('#btnCancelActividad').removeClass('hide');
	$('#btnCancelEditActividad').attr('disabled',true);
	$('#btnCancelEditActividad').addClass('hide');
}
function limpiarA()
{
  $('#ACT_Codigo').val('');
  $('#ACT_Nombre_Corto').val('');
  $('#ACT_X_Rendimiento').val('S');
	$('#ACT_Activo').val('1');
  $('#ACT_Descripcion').val('');
}

//control de formulario Labor
function HabilitarL()
{
  $('#LAB_Codigo').attr('disabled',false);
  $('#LAB_Nombre_Corto').attr('disabled',false);
	$('#LAB_Activo').attr('disabled',false);
	$('#LAB_Activo').formSelect();
  $('#LAB_Descripcion').attr('disabled',false);
  $('#btnAgregarLabor').attr('disabled',false);
  $('#btnCancelLabor').attr('disabled',false);
  $('#btnCancelLabor').removeClass('hide');
  $('#btnCancelEditLabor').attr('disabled',true);
  $('#btnCancelEditLabor').addClass('hide');
  $('#btnEliminarLabor').attr('disabled',true);
  $('#btnEliminarLabor').addClass('hide');
  $('#btnActualizaLabor').attr('disabled',true);
  $('#btnActualizaLabor').addClass('hide');
}
function EditHabilitarL()
{
  $('#LAB_Codigo').attr('disabled',true);
  $('#LAB_Nombre_Corto').attr('disabled',false);
	$('#LAB_Activo').attr('disabled',false);
	$('#LAB_Activo').formSelect();
  $('#LAB_Descripcion').attr('disabled',false);
	$('#btnAgregarLabor').attr('disabled',true);
	$('#btnAgregarLabor').addClass('hide');
	$('#btnActualizaLabor').attr('disabled',false);
	$('#btnActualizaLabor').removeClass('hide');
	$('#btnCancelLabor').attr('disabled',true);
	$('#btnCancelLabor').addClass('hide');
	$('#btnCancelEditLabor').attr('disabled',false);
  $('#btnCancelEditLabor').removeClass('hide');
  $('#btnEliminarLabor').attr('disabled',false);
	$('#btnEliminarLabor').removeClass('hide');
}
function DeshabilitarL()
{
  $('#LAB_Codigo').attr('disabled',true);
  $('#LAB_Nombre_Corto').attr('disabled',true);
	$('#LAB_Activo').attr('disabled',true);
	$('#LAB_Activo').formSelect();
  $('#LAB_Descripcion').attr('disabled',true);
  $('#btnCancelLabor').attr('disabled',true);
  $('#btnAgregarLabor').attr('disabled',true);
	$('#btnAgregarLabor').removeClass('hide');
	$('#btnActualizaLabor').addClass('hide');
	$('#btnCancelLabor').removeClass('hide');
	$('#btnCancelEditLabor').attr('disabled',true);
	$('#btnCancelEditLabor').addClass('hide');
}
function limpiarL()
{
  $('#LAB_Codigo').val('');
  $('#LAB_Nombre_Corto').val('');
	$('#LAB_Activo').val('1');
	$('#LAB_Activo').trigger('change');
  $('#LAB_Descripcion').val('');
}

//funcion para Evaluar el estado de la Labor
var _estado = function(codigo){
	if(codigo == 1){
		return '<span class="badge green accent-3 border-round">ACTIVO</span>';
	}
	else{
		return '<span class="badge red border-round">INACTIVO</span>';
	}
}
//funcion para mostrar botones de accion en la tabla Labores
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
//funcion para Evaluar la descripcion de la Labor
var _descrip = function(des){
	if(des == ''){
		return 'No Tiene Descripción';
	}
	else{
		return des;
	}
}

//listar labores: activas e inactivas o activas o inactivas
function listarLabores(id,state){

	$.ajax({
		url: 'http://localhost/app.sfperusac.services/',
		dataType: 'json',
		type: 'post',
		data:{
      controller: 'Labor',
			accion: 'listar',
      actividad: id,
      filtro: state
		},
		success: function(resp){
			tablaLabores.clear().draw(false);
			$(resp).each(function(i, e){
				fila = [i+1,e.codigo, e.nombre,_descrip(e.descripcion),_estado(e.estado),_acciones(e.codigo)+_cambState(e.codigo,e.estado)];
				tablaLabores.row.add(fila).draw(false);
			});
		}
	}).fail( function( jqXHR, textStatus, errorThrown ) {
    alert( 'Error!!' + errorThrown );
    });
}

//funcion para cargar datos en el combo Actividades
function listarActivi(combo){

	$.ajax({
  //	url: '../../app/controllers/ActividadController.php',
    url: 'http://localhost/app.sfperusac.services/',
		dataType: 'json',
		type: 'post',
		data:{
      controller: 'Actividad',
			accion: 'listar'
		},
		success: function(resp){
      combo.find('li').remove();
      $('#infoTotActi').find('p').remove();
			//combo.append('<option value="º" selected>-- Seleccione Actividad --</option>');
      $('#infoTotActi').append('<p class="m-0 subtitle font-weight-700">Número Total de Actividades</p>');
      //combo.append('<li class="sidebar-title">Opción</li>');
      //combo.append('<li id="btnAddActividad"><a class="modal-trigger" href="#modalActi"><i class="material-icons">add</i><span> Nueva Actividad</span></a></li>');
      combo.append('<li class="sidebar-title">Lista de Actividades</li>');
      //listarLabores($('#ACT_Id').val());
      j = 0;
			$(resp).each(function(i, e){
        j = j + 1;
        codigo = e.codigo;
        descripcion = e.descripcion
        if(descripcion.length>14) {
          descripcion = descripcion.substr(0,15)+'...';
        }
        estado = e.estado;
        tipo = e.tipo1;
        if(tipo=='S'){
          tipohtml='<span class="badge badge pill light-green float-right mr-10">Dest.</span>';
        }else{
          tipohtml='';
        }


        if(estado==1){
          
          combo.append('<li class="btnAct lista" codigo="'+codigo+'" estado="'+estado+'"><a class="text-sub"><i class="blue-text material-icons small-icons mr-2">fiber_manual_record</i> '+descripcion+'</a>'+tipohtml+'</li>');
        }else{
          combo.append('<li class="btnAct lista" codigo="'+codigo+'" style="align-items: center;" estado="'+estado+'" ><a class="text-sub"><i class="red-text material-icons small-icons mr-2">fiber_manual_record</i> '+descripcion+'</a>'+tipohtml+'</li>');
        }
        //combo.append('<li id="liAct'+codigo+'"><a class="text-sub btnAct" codigo="'+codigo+'"><i class="material-icons">adjust</i><label class="black-text">'+descripcion+'</label></a></li>');
      
      });
      $('#infoTotActi').append('<p class="m-0 text-muted">'+j+' Actividades</p>');
			//combo.formSelect();
			//combo.trigger('contentChanged');
			//combo.sm_select();
		}
	});
}

//funcion para cambiar de estado
function cambiaEstado(state){
  $.ajax({
    type:"POST",
    url:url,
    data:{
      controller: 'Labor',
      accion: 'cambiaState',
      codigo: codigoSeleccionado,
      actividad: codigoActi,
      LAB_Activo: state
    },
    dataType:'json',
    success:function(r){
      if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error'){
        M.toast({html: r.respuesta +'!'});
        listarLabores(codigoActi,filtoLista);
      }else{
        M.toast({html: 'Ocurrió un error: ' + r.respuesta});
      }
    }
  }).fail( function( jqXHR, textStatus, errorThrown ) {
    alert( 'Error!!' + errorThrown );
    });
}

$(document).on('mousedown','.btnAct',function (e) {
    //1: izquierda, 2: medio/ruleta, 3: derecho

 //   alert(codigoActi);
    if(e.which == 3) 
    {

      activarBtnAll();
      desactivarBtnAllActivas();
      desactivarBtnAllInactivas();
      codigoActi = $(this).attr('codigo');
      estadoActi = $(this).attr('estado');
      listarLabores(codigoActi,filtoLista);
    
      //listarActivi($('#listActi'));
     
      $('#listActi').find('li').removeClass('active');
      $(this).addClass('active');
    //  $('#listActi').find('a').addClass('black-text');
      $('#listActi').find('a').removeClass('white-text');
    //  $(this).find('a').removeClass('black-text');
      $(this).find('a').addClass('white-text');
     // $('#listActi').find('i').addClass('black-text');
      $('#listActi').find('i').removeClass('white-text');
    //  $(this).find('i').removeClass('black-text');
      $(this).find('i').addClass('white-text');
    
      $('#btnAddLabor').removeClass('hide');
    
      $('#btnAddActividad').removeClass('black-text');
      $('#btnAddActividad').find('i').removeClass('black-text');
      var menu;
      if(estadoActi==0){
        menu = [
          [
              {
                  text: "<i class='fa fa-edit site-cm-icon'></i><a>Editar</a>",
                  action: function () {
                   // console.log("Edit " +codigoActi);
                  
                    mostrarActividad(codigoActi);
                    EditHabilitarA();
           
                }
              },
              {
                  text: "<i class='fa fa-check  site-cm-icon'></i><a>Activar</a>",
                  action: function () {
                   //   console.log("Anular " +codigoActi);
                   estadoAct(codigoActi, 1);
                   activarAct(codigoActi);
                   
                  }
  
  
              },
              {
                text: "<i class='fa fa-trash site-cm-icon'></i><a>Eliminar</a>",
                action: function () {
                   // console.log("Delete " +codigoActi);
                    deleteAct(codigoActi);
                }
              }
          ]
        ];
      }else{
        menu = [
          [
              {
                  text: "<i class='fa fa-edit site-cm-icon'></i><a>Editar</a>",
                  action: function () {
                    console.log("Edit " +codigoActi);
                  
                    mostrarActividad(codigoActi);
                    EditHabilitarA();
           
                }
              },
              {
                  text: "<i class='fa fa-ban site-cm-icon'></i><a>Anular</a>",
                  action: function () {
                   //   console.log("Anular " +codigoActi);
              
                   estadoAct(codigoActi, 0);
                  }
  
  
              },
              {
                text: "<i class='fa fa-trash site-cm-icon'></i><a>Eliminar</a>",
                action: function () {
                   // console.log("Delete " +codigoActi);
                    deleteAct(codigoActi);
                }
              }
          ]
        ];
      }
     // alert(estadoActi);
      
      $(this).contextMenu(menu, {
        name: "btnAct"
       });

    }
});




//funcion ejecutada al presionar alguna actividad de la lista de actividades
$(document).on('click','.btnAct',function (e) {

  activarBtnAll();
  desactivarBtnAllActivas();
  desactivarBtnAllInactivas();
  codigoActi = $(this).attr('codigo');
  listarLabores(codigoActi,filtoLista);

  //listarActivi($('#listActi'));
 
  $('#listActi').find('li').removeClass('active');
  $(this).addClass('active');
//  $('#listActi').find('a').addClass('black-text');
  $('#listActi').find('a').removeClass('white-text');
//  $(this).find('a').removeClass('black-text');
  $(this).find('a').addClass('white-text');
 // $('#listActi').find('i').addClass('black-text');
  $('#listActi').find('i').removeClass('white-text');
//  $(this).find('i').removeClass('black-text');
  $(this).find('i').addClass('white-text');

  $('#btnAddLabor').removeClass('hide');

  $('#btnAddActividad').removeClass('black-text');
  $('#btnAddActividad').find('i').removeClass('black-text');
  //EditHabilitarL();
});
$(document).on('dblclick','.btnAct',function (e) {
  codigoActi = $(this).attr('codigo');
  mostrarActividad(codigoActi);
  EditHabilitarA();
});

//funcion ejecutada al presionar el boton editar de la tabla Labores
$(document).on('click','.btnEditar',function (e) {
  codigoSeleccionado = $(this).attr('codigo');
  mostrarLabor(codigoSeleccionado);
  EditHabilitarL();
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
//funcion ejecutada al presionar el boton eliminar de la tabla Labores
$(document).on('click','.btnEliminar',function (e) {
	codigoSeleccionado = $(this).attr('codigo');
	swal({
    title: "¿Desea eliminar este registro?",
    text: "Al aceptar el registro será eliminado completamente del sistema",
    type: "warning",
    showCancelButton: true,
    confirmButtonClass: "btn-danger",
    confirmButtonText: "Sí, Eliminar!",
    cancelButtonText: "No, cancelar!",
    closeOnConfirm: false,
    closeOnCancel: false


  },function (isConfirm) {
    if (isConfirm) {
			$.ajax({
				type:"POST",
				url:url,
				data:{
          controller: 'Labor',
					accion: 'eliminar',
          codigo: codigoSeleccionado,
          actividad: codigoActi
				},
				dataType:'json',
				success:function(r){
					if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error'){
						DeshabilitarL();
						limpiarL();   
            swal("Eliminado!", "El registro fue eliminado.", "success");
						listarLabores(codigoActi,filtoLista);
					}if (r.respuesta!='' ){
            swal("Error", r.respuesta.substr(6,100), "error");
            }else{
               swal("Error", "Ocurrió un error", "error");
            }
				}
			}).fail( function( jqXHR, textStatus, errorThrown ) {
        alert( 'Error!!' + errorThrown );
        });
    } else {
      swal("Cancelled", "Operación Cancelada! :)", "error");
			
    }
  });



});

//funcion ejecutada al presionar boton eliminar modal labor
$(document).on('click','#btnEliminarLabor',function (e) {
  
	codigoSeleccionado = $('#LAB_Codigo').val();
	swal({
    title: "¿Desea eliminar este registro?",
    text: "Al aceptar el registro será eliminado completamente del sistema",
    type: "warning",
    showCancelButton: true,
    confirmButtonClass: "btn-danger",
    confirmButtonText: "Sí, Eliminar!",
    cancelButtonText: "No, cancelar!",
    closeOnConfirm: false,
    closeOnCancel: false

  },function (isConfirm) {
    if (isConfirm) {
      
			$.ajax({
				type:"POST",
				url:url,
				data:{
					accion: 'eliminar',
          codigo: codigoSeleccionado,
          actividad:codigoActi
				},
				dataType:'json',
				success:function(r){
          limpiarL();
          $('#modal1').modal('close');
					if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error') {
						swal("Eliminado!", "El registro fue eliminado.", "success");
						listarLabores(codigoActi,filtoLista);
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
});

//funcion ejecutada para eliminar actividad de la lista
function deleteAct(codActi){
  codigoSeleccionado = codActi;
  swal({
    title: "¿Desea eliminar esta actividad?",
    text: "Al aceptar el registro será eliminado completamente del sistema",
    type: "warning",
    showCancelButton: true,
    confirmButtonClass: "btn-danger",
    confirmButtonText: "Sí, Eliminar!",
    cancelButtonText: "No, cancelar!",
    closeOnConfirm: false,
    closeOnCancel: false
  },function (isConfirm) {
    if (isConfirm) {
      
			$.ajax({
        type:"POST",
				url:url,
				data:{
          controller:'Actividad',
					accion: 'eliminar',
					codigo: codigoSeleccionado
				},
				dataType:'json',
				success:function(r){
          $('#modalActi').modal('close');
					if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error') {
						swal("Eliminado!", "El registro fue eliminado.", "success");
						listarActivi($('#listActi'));
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


function estadoAct(codActi, estado){
  codigoSeleccionado = codActi;
  //alert(estado);
  if(estado==1){
    msn="¿Desea activar esta Actividad?";
    del="SI, Activar!"
  }else{
    msn="¿Desea anular esta Actividad?";
    del="SI, Anular!";
  }

  swal({
    title: msn,
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
          controller: 'Actividad',
					accion: 'estado',
          codigo: codigoSeleccionado,
          estado: estado
				},
				dataType:'json',
				success:function(r){
					if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error') {
            swal("Actualizado!",(r.respuesta).substr(3,100), "success");
            listarActivi($('#listActi'));
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



