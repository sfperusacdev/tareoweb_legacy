//variables para determinar la empresa, sucursal y consumidor que se seleccionó
var codigoCulti='';
var codigoSeleccionado;
var codigoEmp = sessionStorage.getItem("idempresa"); // este codigo debe de ser obtenido de la session y trabajalo en la capa de Datos o capa models
var filtoLista=2;
var evento='new';
var ventana='';
var url;
var select='5';
//variable para determinar la tabla
var tablaCultivoVariedades;

$(document).ready(function(){
  url=geturl();
  //$(this).attr('tabindex', tabindex).focus();
  $('#liCultivo').addClass('active');
  $('#limant').removeClass('active');
  $('#limant').addClass('close');
  // //Sample toast
  setTimeout(function () {
      M.toast({ html: "Seleccione Un Cultivo" });
  }, 2000);

  listarCul($('#listCult'));

//botones para listar
$('#btnAllVariedad').click(function(){
  activarBtnAll();
  desactivarBtnAllActivas();
  desactivarBtnAllInactivas();
  listarCultivoVariedad(codigoCulti,filtoLista);
})
$('#btnAllVariedadActiva').click(function(){
  desactivarBtnAll();
  activarBtnAllActivas();
  desactivarBtnAllInactivas();
  listarCultivoVariedad(codigoCulti,filtoLista);
})
$('#btnAllVariedadInactiva').click(function(){
  desactivarBtnAll();
  desactivarBtnAllActivas();
  activarBtnAllInactivas();
  listarCultivoVariedad(codigoCulti,filtoLista);
})



	//Accion de BOTONES de formulario CULTIVO
	$('#btnAddCultivo').click(function(){
			limpiarC();
      HabilitarC();
      evento="new";
      ventana='Cultivo';
	  });
	$('#btnCancelCultivo').click(function(){
		cancelar();

	  });
	$('#btnCancelEditCultivo').click(function(){
		cancelar();
	  });

    function cancelar()
    {
      swal({
        title: "¿Desea cancelar esta operación?",
        text: "La operacón será cancelada",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Sí",
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: true
    
      },function (isConfirm) {
        if (isConfirm) {
          if(ventana=='Cultivo'){
            limpiarC();
		    	  DeshabilitarC();
            $('#modalCult').modal('close');
          }else{
            limpiarCV();
		    	  DeshabilitarCV();
            $('#modal1').modal('close');
          }
        	
          swal("Cancelled", "Operación Cancelada! :)", "error");
        } else {
          return true;
        }
      });
    }

	//Accion de BOTONES de formulario CultivoVariedad
	$('#btnAddVariedad').click(function(){
		limpiarCV();
    HabilitarCV();
    evento="new";
    ventana='Variedad';
	});
	$('#btnCancelCultivoVariedad').click(function(){
		cancelar();
  });
  
	$('#btnCancelEditCultivoVariedad').click(function(){
    cancelar();
	});

  $(".modal").modal({dismissible: false,
    onOpenEnd: function() {
      if(ventana=="Cultivo"){
        $('#CUL_Codigo').focus();
      }else{
        $('#CUV_Codigo').focus();
      }
     
    }
  });

  

//Acciones para botones Agregar y actualizar del formulario Empresa
	//Agregar Cultivo
	$('#btnAgregarCultivo').click(function(){
    var CULCodigo = $('#CUL_Codigo').val();
    var CULNombreCorto = $('#CUL_Nombre_Corto').val();
		var CULDescripcion = $('#CUL_Descripcion').val();
    var CULActivo = $('#CUL_Activo').val();
    if (CULCodigo != '' && CULNombreCorto != '' )
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
                controller: 'Cultivo',
                accion: 'insertar',
                CUL_Codigo:CULCodigo,
                EMP_Id:codigoEmp, //trabajarlo en el modal
                CUL_Nombre: CULNombreCorto,
                CUL_Descripcion: CULDescripcion,
                CUL_Activo: CULActivo
              },
              dataType:'json',
              success:function(r){
                if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error'){
                  limpiarC();
                  DeshabilitarC();
                  $('#modalCult').modal('close');
                  M.toast({html: r.respuesta +'!'});   
                  swal("Registrado!",(r.respuesta).substr(3,100), "success");
                  listarCul($('#listCult'));
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
	// Actualizar Cultivo
	$('#btnActualizaCultivo').click(function(){
		var CULCodigo = $('#CUL_Codigo').val();
    var CULNombreCorto = $('#CUL_Nombre_Corto').val();
		var CULDescripcion = $('#CUL_Descripcion').val();
    var CULActivo = $('#CUL_Activo').val();
    if (CULCodigo != '' && CULNombreCorto != '' )
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
              controller: 'Cultivo',
              accion: 'modificar',
              codigo: codigoCulti,
              CUL_Codigo: CULCodigo,
              EMP_Id: codigoEmp,
              CUL_Nombre: CULNombreCorto,
              CUL_Descripcion: CULDescripcion,
              CUL_Activo: CULActivo
            },
            dataType:'json',
            success:function(r){
              if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error'){
                DeshabilitarC();
                listarCul($('#listCult'));
                $('#modalCult').modal('close');
                //M.toast({html: r.respuesta +'!'});   
                swal("Actualizado!",(r.respuesta).substr(3,100), "success"); 
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

//Acciones para botones Agregar y actualizar del formulario Empresa
	//Agregar CultivoVariedad
	$('#btnAgregarCultivoVariedad').click(function(){
		var CUVCodigo = $('#CUV_Codigo').val();
		var CUVNombreCorto = $('#CUV_Nombre_Corto').val();
    var CUVDescripcion = $('#CUV_Descripcion').val();
    var CUVActivo = $('#CUV_Activo').val();

    if (CUVCodigo != '' && CUVNombreCorto != '' && CUVDescripcion != '' )
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
                data:
                {
                  controller: 'CultivoVariedad',
                  accion: 'insertar',
                  CUV_Id: CUVCodigo,
                  EMP_Id: codigoEmp,
                  CUL_Id: codigoCulti,
                  CUV_Nombre: CUVNombreCorto,
                  CUV_Descripcion: CUVDescripcion,
                  CUV_Activo: CUVActivo
                },
                url: url,
                dataType: 'json',
                success:function(resp){
                  if(resp.respuesta!='' && (resp.respuesta).substr(0,5)!='Error'){
                      limpiarCV();
                      DeshabilitarCV();
                      listarCultivoVariedad(codigoCulti,filtoLista);
                      $('#modal1').modal('close');
                      swal("Actualizado!",(resp.respuesta).substr(3,100), "success"); 
                   
                  }else{
                    swal("Error", "Oucrrió un error! :) " + resp.respuesta, "error");
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
  
  $(document).on("change", ".dataTables_length select", function(){
    select = $(this).val();
    //alert(selectedVal);
});

  $('[name=tablaCultivoVariedades_length]').click(function(){
  
   // select=$('#tablaCultivoVariedades_length').val();
   // select= $('[name=tablaCultivoVariedades_length]').val();
    alert('');
  });

$('#btnEliminarCultivo').click(function(){
  deleteCult(codigoCulti);
});


	// Actualizar CultivoVariedad
	$('#btnActualizaCultivoVariedad').click(function(){
		var CUVCodigo = $('#CUV_Codigo').val();
		var CUVNombreCorto = $('#CUV_Nombre_Corto').val();
		var CUVDescripcion = $('#CUV_Descripcion').val();
    var CUVActivo = $('#CUV_Activo').val();
    if (CUVCodigo != '' && CUVNombreCorto != ''  && CUVDescripcion != '' )
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
                  controller:'CultivoVariedad',
                  accion: 'modificar',
                  CUV_Id: CUVCodigo,
                  EMP_Id: codigoEmp,
                  CUL_Id: codigoCulti,
                  CUV_Nombre: CUVNombreCorto,
                  CUV_Descripcion: CUVDescripcion,
                  CUV_Activo:CUVActivo

                },
                dataType:'json',
                success:function(r){
                  if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error'){
                    //M.toast({html: r.respuesta +'!'});
                    DeshabilitarCV();
                    limpiarCV();
                    listarCultivoVariedad(codigoCulti,filtoLista);
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

// Definiendo la tabla variedades como dataTable
  var calcDataTableHeight = function() {
    return $(window).height() - 300 + "px";
  };

  construyetabla();


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

//activar botones listar
function activarBtnAll(){
  filtoLista = 2;
  $('#btnAllVariedad').removeClass('white');
  $('#btnAllVariedad').css('color','white');
  $('#btnAllVariedad').addClass('deep-purple darken-1');
}
function activarBtnAllActivas(){
  filtoLista = 1;
  $('#btnAllVariedadActiva').removeClass('white');
  $('#btnAllVariedadActiva').css('color','white');
  $('#btnAllVariedadActiva').addClass('green accent-3');
}
function activarBtnAllInactivas(){
  filtoLista = 0;
  $('#btnAllVariedadInactiva').removeClass('white');
  $('#btnAllVariedadInactiva').css('color','white');
  $('#btnAllVariedadInactiva').addClass('red');
}

//desactivar botones listar
function desactivarBtnAll(){
  $('#btnAllVariedad').addClass('white');
  $('#btnAllVariedad').css('color','black');
  $('#btnAllVariedad').removeClass('deep-purple darken-1');
}
function desactivarBtnAllActivas(){
  $('#btnAllVariedadActiva').addClass('white');
  $('#btnAllVariedadActiva').css('color','black');
  $('#btnAllVariedadActiva').removeClass('green accent-3');
}
function desactivarBtnAllInactivas(){
  $('#btnAllVariedadInactiva').addClass('white');
  $('#btnAllVariedadInactiva').css('color','black');
  $('#btnAllVariedadInactiva').removeClass('red');
}


//mostrar datos de cultivo
function mostrarCultivo(cul){
  evento="edit";

  $.ajax({
    type:"POST",
    url: url,
		data:
		{
      controller:'Cultivo',
			accion: 'Mostrar',
      codigo: cul,
      empresa: codigoEmp
		},
		dataType: 'json',
		success:function(resp){
			if(resp !=''){
				limpiarC();

        $('#modalCult').modal('open');

        $('#inputCulCodigo').addClass('active');
        $('#inputCulNombre').addClass('active');
        $('#inputCulDescripcion').addClass('active');
        $('#inputCulActivo').addClass('active');
        

				$('#CUL_Codigo').val(resp.codigo);
				$('#CUL_Nombre_Corto').val(resp.nombre);
        $('#CUL_Descripcion').val(resp.descripcion);
        $('#CUL_Activo').val(resp.estado);
        $('#CUL_Activo').formSelect();
        $('#CUL_Nombre_Corto').focus();
			}else{
				M.toast({html: 'Ocurrió un error al recibir datos de la actividad'});
			}
		}
  });
  

}
//mostrar datos de CultivoVariedad
function mostrarCultivoVariedad(cultiVar){
	$.ajax({
		type:"POST",
		data:
		{
      controller: 'CultivoVariedad',
      accion: 'Mostrar',
      codigo: cultiVar,
      cultivo: codigoCulti,
      empresa: codigoEmp
		},
		url: url,
		dataType: 'json',
		success:function(resp){
			if(resp !=''){
				limpiarCV();
        $('#modal1').modal('open');

        $('#inputCUVCodigo').addClass('active');
        $('#inputCUVNombre').addClass('active');
        $('#inputCUVDescripcion').addClass('active');
        $('#inputCUVActivo').addClass('active');

				$('#CUV_Codigo').val(resp.codigo);
				$('#CUV_Nombre_Corto').val(resp.nombre);
        $('#CUV_Descripcion').val(resp.descripcion);
        $('#CUV_Activo').val(resp.estado);
        $('#CUV_Activo').formSelect();
        $('#CUV_Nombre_Corto').focus();
			}else{
				M.toast({html: 'Ocurrió un error al recibir datos de la Variedad'});
			}
		}
	});
}


//control de formulario Cultivo
function HabilitarC()
{
  $('#CUL_Codigo').attr('disabled',false);
  $('#CUL_Nombre_Corto').attr('disabled',false);
  $('#CUL_Descripcion').attr('disabled',false);
  $('#CUL_Activo').attr('disabled',false);
  $('#CUL_Activo').formSelect();
  $('#btnCancelCultivo').attr('disabled',false);
  $('#btnAgregarCultivo').attr('disabled',false);
  $('#btnCancelEditCultivo').attr('disabled',false);
  $('#btnEliminarCultivo').attr('disabled',false);
  $('#btnActualizaCultivo').attr('disabled',true);
  $('#btnCancelCultivo').removeClass('hide');
  $('#btnCancelEditCultivo').addClass('hide');
  $('#btnEliminarCultivo').addClass('hide');
  $('#btnActualizaCultivo').addClass('hide');
}
function EditHabilitarC()
{
  $('#CUL_Codigo').attr('disabled',true);
  $('#CUL_Nombre_Corto').attr('disabled',false);
  $('#CUL_Descripcion').attr('disabled',false);
  $('#CUL_Activo').attr('disabled',false);
  $('#CUL_Activo').formSelect();
  
	$('#btnAgregarCultivo').attr('disabled',true);
	$('#btnAgregarCultivo').addClass('hide');
	$('#btnActualizaCultivo').attr('disabled',false);
	$('#btnActualizaCultivo').removeClass('hide');
	$('#btnCancelCultivo').attr('disabled',true);
	$('#btnCancelCultivo').addClass('hide');
	$('#btnCancelEditCultivo').attr('disabled',false);
  $('#btnCancelEditCultivo').removeClass('hide');
  $('#btnEliminarCultivo').attr('disabled',false);
  $('#btnEliminarCultivo').removeClass('hide');
}
function DeshabilitarC()
{
  $('#CUL_Codigo').attr('disabled',true);
  $('#CUL_Nombre_Corto').attr('disabled',true);
	$('#CUL_Descripcion').attr('disabled',true);
  $('#btnCancelCultivo').attr('disabled',true);
  $('#btnAgregarCultivo').attr('disabled',true);
	$('#btnAgregarCultivo').removeClass('hide');
	$('#btnActualizaCultivo').addClass('hide');
	$('#btnCancelCultivo').removeClass('hide');
	$('#btnCancelEditCultivo').attr('disabled',true);
	$('#btnCancelEditCultivo').addClass('hide');
}
function limpiarC()
{
  $('#CUL_Codigo').val('');
  $('#CUL_Nombre_Corto').val('');
  $('#CUL_Descripcion').val('');
  $('#CUL_Actvo').val('1');
}

//control de formulario CultivoVariedad
function HabilitarCV()
{
  $('#CUV_Codigo').attr('disabled',false);
  $('#CUV_Nombre_Corto').attr('disabled',false);
  $('#CUV_Descripcion').attr('disabled',false);
  $('#CUV_Activo').attr('disabled',false);
  $('#CUV_Activo').formSelect();
  $('#btnCancelCultivoVariedad').attr('disabled',false);
  $('#btnAgregarCultivoVariedad').attr('disabled',false);
	$('#btnCancelCultivoVariedad').removeClass('hide');
  $('#btnCancelEditCultivoVariedad').attr('disabled',false);
  $('#btnActualizaCultivoVariedad').attr('disabled',true);
  $('#btnActualizaCultivoVariedad').addClass('hide');
  $('#btnCancelEditCultivoVariedad').addClass('hide');
  $('#btnEliminarCultivoVariedad').attr('disabled',true);
  $('#btnEliminarCultivoVariedad').addClass('hide');

}
function EditHabilitarCV()
{
  $('#CUV_Codigo').attr('disabled',true );
  $('#CUV_Nombre_Corto').attr('disabled',false);
  $('#CUV_Descripcion').attr('disabled',false);
  $('#CUV_Activo').attr('disabled',false);
  $('#CULVActivo').formSelect();
	$('#btnAgregarCultivoVariedad').attr('disabled',true);
	$('#btnAgregarCultivoVariedad').addClass('hide');
	$('#btnActualizaCultivoVariedad').attr('disabled',false);
	$('#btnActualizaCultivoVariedad').removeClass('hide');
	$('#btnCancelCultivoVariedad').attr('disabled',true);
	$('#btnCancelCultivoVariedad').addClass('hide');
	$('#btnCancelEditCultivoVariedad').attr('disabled',false);
  $('#btnCancelEditCultivoVariedad').removeClass('hide');
  $('#btnEliminarCultivoVariedad').attr('disabled',false);
	$('#btnEliminarCultivoVariedad').removeClass('hide');
}
function DeshabilitarCV()
{
  $('#CUV_Codigo').attr('disabled',true);
  $('#CUV_Nombre_Corto').attr('disabled',true);
	$('#CUV_Descripcion').attr('disabled',true);
  $('#btnCancelCultivoVariedad').attr('disabled',true);
  $('#btnAgregarCultivoVariedad').attr('disabled',true);
	$('#btnAgregarCultivoVariedad').removeClass('hide');
	$('#btnActualizaCultivoVariedad').addClass('hide');
	$('#btnCancelCultivoVariedad').removeClass('hide');
	$('#btnCancelEditCultivoVariedad').attr('disabled',true);
	$('#btnCancelEditCultivoVariedad').addClass('hide');
}
function limpiarCV()
{
  $('#CUV_Codigo').val('');
  $('#CUV_Nombre_Corto').val('');
  $('#CUV_Descripcion').val('');
  $('#CUV_Activo').val('1');
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
//funcion para mostrar botones de cambio de estado en la tabla variedades
var _cambState = function(codigo,state){
  if (state == 1) {
    return '<button title="Anular" codigo="'+codigo+'" class="mb-2 btn-floating waves-effect waves-light red gradient-shadow border-round btn-small btnAnular" type="button" style="margin-right: 5px;"><i class="material-icons white-text">close</i></button>';
  } else {
    return '<button title="Activar" codigo="'+codigo+'" class="mb-2 btn-floating waves-effect waves-light green gradient-shadow border-round btn-small btnActivar" type="button" style="margin-right: 5px;"><i class="material-icons white-text">check</i></button>';
  }
}
//funcion para mostrar botones de accion en la tabla consumidores
var _acciones = function(codigo){
	return '<button title="Editar" codigo="'+codigo+'" class="mb-2 btn-floating waves-effect waves-light gradient-45deg-blue-indigo gradient-shadow border-round btn-small btnEditar" type="button" style="margin-right: 5px;"><i class="material-icons white-text">edit</i></button><button title="Eliminar" codigo="'+codigo+'" class="mb-2 btn-floating waves-effect waves-light red gradient-shadow border-round btn-small btnEliminar" type="button" style="margin-right: 5px;"><i class="material-icons white-text">delete</i></button>';
}
//funcion para Evaluar la descripcion del consumidor
var _descrip = function(des){
	if(des == ''){
		return 'No Tiene Descripción';
	}
	else{
		return des;
	}
}

//funcion para listar variedad de acuerdo a la empresa y sucursal seleccionadas
function listarCultivoVariedad(cul,state){
  
	$.ajax({
		url: url,
		dataType: 'json',
		type: 'post',
		data:{
      controller:'CultivoVariedad',
			accion: 'listar',
			empresa: codigoEmp, //cambiar al modelo usando sessiones
      cultivo: cul,
      filtro: state
		},
		success: function(resp){
     
      tablaCultivoVariedades.clear().draw(false);
			$(resp).each(function(i, e){
				fila = [i+1,e.codigo, e.nombre,_descrip(e.descripcion),_estado(e.estado),_acciones(e.codigo)+_cambState(e.codigo,e.estado)];
				tablaCultivoVariedades.row.add(fila).draw(false);
      });
      
     
        
		}
  }).fail( function( jqXHR, textStatus, errorThrown ) {
    
    alert( 'Error!!' + errorThrown );
    });
  

  
}

//funcion para cargar datos en el combo empresa y cultivo
function listarCul(combo){
	$.ajax({
    //	url: '../../app/controllers/ActividadController.php',
      url: url,
      dataType: 'json',
      type: 'post',
      data:{
        controller: 'Cultivo',
        accion: 'listar',
        empresa: codigoEmp //cambiar al modelo usando sessiones
      },
      success: function(resp){
        combo.find('li').remove();
        $('#infoTotCult').find('p').remove();
        $('#infoTotCult').append('<p class="m-0 subtitle font-weight-700">Número Total de Cultivos</p>');
        combo.append('<li class="sidebar-title">Lista de Cultivos</li>');
        j = 0;
        $(resp).each(function(i, e){
          j = j + 1;
          codigo = e.codigo;
          descripcion = e.nombre
      
          if(descripcion.length>14) {
            descripcion = descripcion.substr(0,15)+'...';
          }
          estado = e.estado;
  
          if(estado==1){
            
            combo.append('<li class="btnCult lista" codigo="'+codigo+'" estado="'+estado+'"><a class="text-sub"><i class="blue-text material-icons small-icons mr-2">fiber_manual_record</i> '+descripcion+'</a></li>');
          }else{
            combo.append('<li class="btnCult lista" codigo="'+codigo+'" style="align-items: center;" estado="'+estado+'" ><a class="text-sub"><i class="red-text material-icons small-icons mr-2">fiber_manual_record</i> '+descripcion+'</a></li>');
          }
          //combo.append('<li id="liAct'+codigo+'"><a class="text-sub btnAct" codigo="'+codigo+'"><i class="material-icons">adjust</i><label class="black-text">'+descripcion+'</label></a></li>');
        
        });
        $('#infoTotCult').append('<p class="m-0 text-muted">'+j+' Cultivos</p>');
        //combo.formSelect();
        //combo.trigger('contentChanged');
        //combo.sm_select();
      }
    });




}

$(document).on('mousedown','.btnCult',function (e) {
  //1: izquierda, 2: medio/ruleta, 3: derecho
  
  if(e.which == 3) 
  {
    
    activarBtnAll();
   
    desactivarBtnAllActivas();
    desactivarBtnAllInactivas();
    codigoCulti = $(this).attr('codigo');
    
    estadoCultivo = $(this).attr('estado');
    refreshtable();
    listarCultivoVariedad(codigoCulti,2);

    $('#listCult').find('li').removeClass('active');
    $(this).addClass('active');
   // $('#listCult').find('a').addClass('black-text');
    $('#listCult').find('a').removeClass('white-text');
   // $(this).find('a').removeClass('black-text');
    $(this).find('a').addClass('white-text');
   // $('#listCult').find('i').addClass('black-text');
    $('#listCult').find('i').removeClass('white-text');
   // $(this).find('i').removeClass('black-text');
    $(this).find('i').addClass('white-text');
  
    $('#btnAddVariedad').removeClass('hide');
  
    $('#btnAddCultivo').removeClass('black-text');
    $('#btnAddCultivo').find('i').removeClass('black-text');
    var menu;
    if(estadoCultivo==0){
      menu = [
        [
            {
                text: "<i class='fa fa-edit site-cm-icon'></i><a>Editar</a>",
                action: function () {
                 // console.log("Edit " +codigoActi);
                
                  mostrarCultivo(codigoCulti);
                  EditHabilitarC();
         
              }
            },
            {
                text: "<i class='fa fa-check  site-cm-icon'></i><a>Activar</a>",
                action: function () {
                 //   console.log("Anular " +codigoActi);
                 estadoCult(codigoCulti, 1);
                
                 
                }


            },
            {
              text: "<i class='fa fa-trash site-cm-icon'></i><a>Eliminar</a>",
              action: function () {
                 // console.log("Delete " +codigoActi);
                  deleteCult(codigoCulti);
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
                  console.log("Edit " +codigoCulti);
                
                  mostrarCultivo(codigoCulti);
                  EditHabilitarC();
                  
              }
            },
            {
                text: "<i class='fa fa-ban site-cm-icon'></i><a>Anular</a>",
                action: function () {
                 //   console.log("Anular " +codigoActi);
            
                 estadoCult(codigoCulti, 0);
                }


            },
            {
              text: "<i class='fa fa-trash site-cm-icon'></i><a>Eliminar</a>",
              action: function () {
                 // console.log("Delete " +codigoActi);
                  deleteCult(codigoCulti);
              }
            }
        ]
      ];
    }
   // alert(estadoActi);
    
    $(this).contextMenu(menu, {
      name: "btnCult"
     });

  }
});

//funcion ejecutada al presionar alguna actividad de la lista de cultivos
$(document).on('click','.btnCult',function (e) {
  activarBtnAll();
  desactivarBtnAllActivas();
  desactivarBtnAllInactivas();
  codigoCulti = $(this).attr('codigo');
  refreshtable();
  listarCultivoVariedad(codigoCulti,filtoLista);
  $('#listCult').find('li').removeClass('active');
  $(this).addClass('active');
 // $('#listCult').find('a').addClass('black-text');
  $('#listCult').find('a').removeClass('white-text');
 // $(this).find('a').removeClass('black-text');
  $(this).find('a').addClass('white-text');
 // $('#listCult').find('i').addClass('black-text');
  $('#listCult').find('i').removeClass('white-text');
 // $(this).find('i').removeClass('black-text');
  $(this).find('i').addClass('white-text');

  $('#btnAddVariedad').removeClass('hide');

  $('#btnAddCultivo').removeClass('black-text');
  $('#btnAddCultivo').find('i').removeClass('black-text');
});
$(document).on('dblclick','.btnCult',function (e) {
  codigoCulti = $(this).attr('codigo');
  mostrarCultivo(codigoCulti);
  EditHabilitarC();
  evento="edit";
  ventana='Cultivo';
});

//funcion ejecutada al presionar el boton editar de la tabla variedad
$(document).on('click','.btnEditar',function (e) {
	codigoSeleccionado = $(this).attr('codigo');
	mostrarCultivoVariedad(codigoSeleccionado);
  EditHabilitarCV();
  ventana='Variedad';
  evento='edit';
});

//funcion ejecutada al presionar el boton activar de la tabla variedad
$(document).on('click','.btnActivar',function(e){
  codigoSeleccionado = $(this).attr('codigo');
  cambiaEstado('1');
})
//funcion ejecutada al presionar el boton anular de la tabla variedad
$(document).on('click','.btnAnular',function(e){
  codigoSeleccionado = $(this).attr('codigo');
  cambiaEstado('0');
})

//funcion para cambiar de estado
function cambiaEstado(state){
  $.ajax({
    type:"POST",
    url:url,
    data:{
      controller: 'CultivoVariedad',
      accion: 'cambiaState',
      codigo: codigoSeleccionado,
      cultivo: codigoCulti,
      empresa: codigoEmp,
      CUV_Activo: state
    },
    dataType:'json',
    success:function(r){
      if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error'){
        M.toast({html: r.respuesta +'!'});
        listarCultivoVariedad(codigoCulti,filtoLista);
      }else{
        M.toast({html: 'Ocurrió un error: ' + r.respuesta});
      }
    }
  }).fail( function( jqXHR, textStatus, errorThrown ) {
    alert( 'Error!!' + errorThrown );
    });
}



$('#btnEliminarCultivoVariedad').click(function(){
  delete_variedad(codigoSeleccionado);
});

function refreshtable()
{
  tablaCultivoVariedades.clear().draw(false);
  $("#tablaCultivoVariedades").dataTable().fnDestroy();     
  construyetabla();
}
function delete_variedad($codigo)
{
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
          controller:'CultivoVariedad',
          accion: 'eliminar',
          codigo: codigoSeleccionado,
          empresa:codigoEmp,
          cultivo:codigoCulti
				},
				dataType:'json',
				success:function(r){
					if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error') {
						DeshabilitarCV();
            limpiarCV();
            $('#modal1').modal('close');
            swal("Eliminado!", "El registro fue eliminado.", "success");
						listarCultivoVariedad(codigoCulti,filtoLista);
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

//funcion ejecutada al presionar el boton eliminar de la tabla variedad
$(document).on('click','.btnEliminar',function (e) {
	codigoSeleccionado = $(this).attr('codigo');
  delete_variedad(codigoSeleccionado);
});


function estadoCult(codigoCulti, estado){
  codigoSeleccionado = codigoCulti;
  //alert(estado);
  if(estado==1){
    msn="¿Desea activar este Cultivo?";
    del="SI, Activar!"
  }else{
    msn="¿Desea anular este Cultivo?";
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
          controller: 'Cultivo',
					accion: 'estado',
          codigo: codigoSeleccionado,
          estado: estado,
          empresa: codigoEmp
				},
				dataType:'json',
				success:function(r){
					if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error') {
            swal("Actualizado!",(r.respuesta).substr(3,100), "success");
            listarCul($('#listCult'));
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

//funcion ejecutada para eliminar cultivo de la lista
function deleteCult(codActi){
  codigoSeleccionado = codigoCulti;
  swal({
    title: "¿Desea eliminar este cultivo?",
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
          controller:'Cultivo',
					accion: 'eliminar',
          codigo: codigoSeleccionado,
          empresa: codigoEmp
				},
				dataType:'json',
				success:function(r){
          $('#modalCult').modal('close');
					if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error') {
						swal("Eliminado!", "El registro fue eliminado.", "success");
						listarCul($('#listCult'));
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


function tab_btn(event,control)
{
  var t = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
	if (t == 9) 
	{
   if(ventana=='Cultivo'){
      if(evento=="edit" && control=="CUL_Codigo"){
        $('#CUL_Nombre_Corto').focus();

      }else{
            $('#'+control).focus();
       }
   }else{
    if(evento=="edit" && control=="CUV_Codigo"){
      $('#CUV_Nombre_Corto').focus();

    }else{
          $('#'+control).focus();
     }
   }
   
 
    return false;

	}
	return true;
}

function construyetabla()
{
  tablaCultivoVariedades=$('#tablaCultivoVariedades').DataTable({
    /*sScrollY: calcDataTableHeight(),
    scrollCollapse: true,*/
    paging: true,
    info: true,
    responsive: true,
    bSort: true,
    lengthMenu: [[5,10, 20, 25, 50, -1], [5,10, 20, 25, 50, 'Todos']],
    bProcessing: true,
    pageLength: select,
    columnDefs: [{
		orderable: false,
		targets: [3]
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
     tablaCultivoVariedades.search($("#global_filter").val(), $("#global_regex").prop("checked"), $("#global_smart").prop("checked")).draw();
  }

  $("input#global_filter").on("keyup click", function() {
     filterGlobal();
  });

$('#tablaCultivoVariedades_length').val(select);
 //$('#tablaCultivoVariedades_length').formSelect();

}