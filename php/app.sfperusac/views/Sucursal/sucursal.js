//variables para determinar la empresa, sucursal y consumidor que se seleccionó
var codigoSucu;
var codigoSeleccionado;

var codigoEmp = 'E01'; // este codigo debe de ser obtenido de la session y trabajalo en la capa de Datos o capa models

//variable para determinar la tabla
var tablaConsumidores;

$(document).ready(function(){

  $('#liSucu').addClass('active');
  // //Sample toast
  setTimeout(function () {
      M.toast({ html: "Seleccione Una Sucursal" });
  }, 2000);

  listarSuc($('#listSucu'));

  //botones para listar
  $('#btnAllConsumidor').click(function(){
    activarBtnAll();
    desactivarBtnAllActivas();
    desactivarBtnAllInactivas();
    listarConsumidores(codigoSucu,filtoLista);
  });
  $('#btnAllConsumidorActiva').click(function(){
    desactivarBtnAll();
    activarBtnAllActivas();
    desactivarBtnAllInactivas();
    listarConsumidores(codigoSucu,filtoLista);
  });
  $('#btnAllConsumidorInactiva').click(function(){
    desactivarBtnAll();
    desactivarBtnAllActivas();
    activarBtnAllInactivas();
    listarConsumidores(codigoSucu,filtoLista);
  });

	//Accion de BOTONES de formulario Sucursal
	$('#btnAddSucursal').click(function(){
			limpiarS();
			HabilitarS();
	  });
	$('#btnCancelSucursal').click(function(){
			limpiarS();
			DeshabilitarS();
			$('#modalSucu').modal('close');
	  });
	$('#btnCancelEditSucursal').click(function(){
			DeshabilitarS();
      $('#modalSucu').modal('close');
	  });

	//Accion de BOTONES de formulario Consumidor
	$('#btnAddConsumidor').click(function(){
		limpiarC();
		HabilitarC();
	});
	$('#btnCancelConsumidor').click(function(){
		limpiarC();
		DeshabilitarC();
    $('#modal1').modal('close');
	});
	$('#btnCancelEditConsumidor').click(function(){
		DeshabilitarC();
    $('#modal1').modal('close');
	});

  $(".modal").modal();

  //Acciones para botones Agregar y actualizar del formulario Sucursal
	//Agregar Sucursal
	$('#btnAgregarSucursal').click(function(){
    var SUCCodigo = $('#SUC_Codigo').val();
    var SUCNombre = $('#SUC_Nombre').val();
    var SUCDireccion = $('#SUC_Direccion').val();
		var SUCTelefono = $('#SUC_Telefono').val();
		var SUCDescripcion = $('#SUC_Descripcion').val();

    if (SUCCodigo != '' && SUCNombre != '' && SUCDireccion != '' && SUCTelefono != '' )
    {
      $.ajax({
        type:"POST",
        data:
        {
          accion: 'insertar',
          SUC_Codigo:SUCCodigo,
          EMP_Id:codigoEmp,
          SUC_Nombre: SUCNombre,
          SUC_Direccion: SUCDireccion,
          SUC_Telefono: SUCTelefono,
          SUC_Descripcion: SUCDescripcion
        },
        url: '../../app/controllers/SucursalController.php',
        dataType: 'json',
        success:function(resp){
          if(resp.respuesta!=''){
            M.toast({html: resp.respuesta +'!'});
            if (resp.limpiar == 'YES') {
              limpiarS();
              DeshabilitarS();
              listarSuc($('#listSucu'));
              $('#modalSucu').modal('close');
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
	// Actualizar Sucursal
	$('#btnActualizaSucursal').click(function(){
		var SUCCodigo = $('#SUC_Codigo').val();
    var SUCNombre = $('#SUC_Nombre').val();
    var SUCDireccion = $('#SUC_Direccion').val();
		var SUCTelefono = $('#SUC_Telefono').val();
		var SUCDescripcion = $('#SUC_Descripcion').val();

    if (SUCCodigo != '' && SUCNombre != '' && SUCDireccion != '' && SUCTelefono != '' )
    {
      $.ajax({
        type:"POST",
        url:"../../app/controllers/SucursalController.php",
        data:{
          accion: 'modificar',
          codigo: codigoSucu,
          SUC_Codigo:SUCCodigo,
          EMP_Id: codigoEmp,
          SUC_Nombre: SUCNombre,
          SUC_Telefono: SUCTelefono,
          SUC_Direccion: SUCDireccion,
          SUC_Descripcion: SUCDescripcion
        },
        dataType:'json',
        success:function(r){
          if(r.respuesta!=''){
            DeshabilitarS();
            listarSuc($('#listSucu'));
            $('#modalSucu').modal('close');
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

//Acciones para botones Agregar y actualizar del formulario Consumidor
	//Agregar Consumidor
	$('#btnAgregarConsumidor').click(function(){
		var CONCodigo = $('#CON_Codigo').val();
		var CONNombre_Corto = $('#CON_Nombre_Corto').val();
		var CONFecha_Baja = $('#CON_Fecha_Baja').val();
		var CONActivo = $('#CON_Activo').val();
		var CONDescripcion = $('#CON_Descripcion').val();

    if (CONCodigo != '' && CONNombre_Corto != '' && CONFecha_Baja != '' && CONActivo != '' )
    {
      $.ajax({
        type:"POST",
        data:
        {
          accion: 'insertar',
          CON_Codigo: CONCodigo,
          EMP_Id: codigoEmp,
          SUC_Id: codigoSucu,
          CON_Nombre_Corto: CONNombre_Corto,
          CON_Fecha_Baja: CONFecha_Baja,
          CON_Activo: CONActivo,
          CON_Descripcion: CONDescripcion
        },
        url: '../../app/controllers/ConsumidorController.php',
        dataType: 'json',
        success:function(resp){
          if(resp.respuesta!=''){
            M.toast({html: resp.respuesta +'!'});
            if (resp.limpiar == 'YES') {
              limpiarC();
              DeshabilitarC();
              listarConsumidores(codigoSucu,filtoLista);
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
	// Actualizar Consumidor
	$('#btnActualizaConsumidor').click(function(){
		var CONCodigo = $('#CON_Codigo').val();
		var CONNombre_Corto = $('#CON_Nombre_Corto').val();
		var CONFecha_Baja = $('#CON_Fecha_Baja').val();
		var CONActivo = $('#CON_Activo').val();
		var CONDescripcion = $('#CON_Descripcion').val();

    if (CONCodigo != '' && CONNombre_Corto != '' && CONFecha_Baja != '' && CONActivo != '' )
    {
      $.ajax({
        type:"POST",
        url:"../../app/controllers/ConsumidorController.php",
        data:{
          accion: 'modificar',
          codigo: codigoSeleccionado,
          CON_Codigo: CONCodigo,
          EMP_Id: codigoEmp,
          SUC_Id: codigoSucu,
          CON_Nombre_Corto: CONNombre_Corto,
          CON_Fecha_Baja: CONFecha_Baja,
          CON_Activo: CONActivo,
          CON_Descripcion: CONDescripcion
        },
        dataType:'json',
        success:function(r){
          if(r.respuesta!=''){
            M.toast({html: r.respuesta +'!'});
            DeshabilitarC();
            limpiarC();
            listarConsumidores(codigoSucu,filtoLista);
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

  // Definiendo la tabla consumidores como dataTable
    var calcDataTableHeight = function() {
      return $(window).height() - 300 + "px";
    };

// Definiendo la tabla consumidores como dataTable
	tablaConsumidores=$('#tablaConsumidores').DataTable({
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
     tablaConsumidores.search($("#global_filter").val(), $("#global_regex").prop("checked"), $("#global_smart").prop("checked")).draw();
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

  //tooltip
  $('.tooltipped').tooltip();

  // Close other sidenav on click of any sidenav
  if ($(window).width() > 900) {
     $("#contact-sidenav").removeClass("sidenav");
  }
});

//activar botones listar
function activarBtnAll(){
  filtoLista = 2;
  $('#btnAllConsumidor').removeClass('white');
  $('#btnAllConsumidor').css('color','white');
  $('#btnAllConsumidor').addClass('deep-purple darken-1');
}
function activarBtnAllActivas(){
  filtoLista = 1;
  $('#btnAllConsumidorActiva').removeClass('white');
  $('#btnAllConsumidorActiva').css('color','white');
  $('#btnAllConsumidorActiva').addClass('green accent-3');
}
function activarBtnAllInactivas(){
  filtoLista = 0;
  $('#btnAllConsumidorInactiva').removeClass('white');
  $('#btnAllConsumidorInactiva').css('color','white');
  $('#btnAllConsumidorInactiva').addClass('red');
}

//desactivar botones listar
function desactivarBtnAll(){
  $('#btnAllConsumidor').addClass('white');
  $('#btnAllConsumidor').css('color','black');
  $('#btnAllConsumidor').removeClass('deep-purple darken-1');
}
function desactivarBtnAllActivas(){
  $('#btnAllConsumidorActiva').addClass('white');
  $('#btnAllConsumidorActiva').css('color','black');
  $('#btnAllConsumidorActiva').removeClass('green accent-3');
}
function desactivarBtnAllInactivas(){
  $('#btnAllConsumidorInactiva').addClass('white');
  $('#btnAllConsumidorInactiva').css('color','black');
  $('#btnAllConsumidorInactiva').removeClass('red');
}

//mostrar datos de sucursal
function mostrarSucursal(suc){
	$.ajax({
		type:"POST",
		data:
		{
			accion: 'Mostrar',
			codigo: suc
		},
		url: '../../app/controllers/SucursalController.php',
		dataType: 'json',
		success:function(resp){
			if(resp !=''){
				limpiarS();

				$('#modalSucu').modal('open');

        $('#inputSUCCodigo').addClass('active');
        $('#inputSUCNombre').addClass('active');
        $('#inputSUCDireccion').addClass('active');
        $('#inputSUCTelefono').addClass('active');
        $('#inputSUCDescripcion').addClass('active');

				$('#SUC_Codigo').val(resp.codigo);
				$('#SUC_Nombre').val(resp.nombre);
				$('#SUC_Direccion').val(resp.direccion);
				$('#SUC_Telefono').val(resp.telefono);
				$('#SUC_Descripcion').val(resp.descripcion);
			}else{
				M.toast({html: 'Ocurrió un error al recibir datos de la sucursal'});
			}
		}
	});
}
//mostrar datos de Consumidor
function mostrarConsumidor(con){
	$.ajax({
		type:"POST",
		data:
		{
			accion: 'Mostrar',
			codigo: con
		},
		url: '../../app/controllers/ConsumidorController.php',
		dataType: 'json',
		success:function(resp){
			if(resp !=''){
				limpiarC();

				$('#modal1').modal('open');

        $('#inputCONCodigo').addClass('active');
        $('#inputCONNombre_Corto').addClass('active');
        $('#inputCONDescripcion').addClass('active');

				$('#CON_Codigo').val(resp.codigo);
				$('#CON_Nombre_Corto').val(resp.nombre);
				$('#CON_Fecha_Baja').val(resp.fechaBaja);
				$('#CON_Activo').val(resp.estado);
				$('#CON_Activo').trigger('change');
				$('#CON_Descripcion').val(resp.descripcion);
			}else{
				M.toast({html: 'Ocurrió un error al recibir datos del Consumidor'});
			}
		}
	});
}

//control de formulario Sucursal
function HabilitarS()
{
  $('#SUC_Codigo').attr('disabled',false);
  $('#SUC_Nombre').attr('disabled',false);
  $('#SUC_Direccion').attr('disabled',false);
	$('#SUC_Telefono').attr('disabled',false);
  $('#SUC_Descripcion').attr('disabled',false);
  $('#btnCancelSucursal').attr('disabled',false);
  $('#btnAgregarSucursal').attr('disabled',false);
	$('#btnCancelSucursal').removeClass('hide');
	$('#btnCancelEditSucursal').addClass('hide');
}
function EditHabilitarS()
{
  $('#SUC_Codigo').attr('disabled',true);
  $('#SUC_Nombre').attr('disabled',false);
  $('#SUC_Direccion').attr('disabled',false);
	$('#SUC_Telefono').attr('disabled',false);
  $('#SUC_Descripcion').attr('disabled',false);
	$('#btnAgregarSucursal').attr('disabled',true);
	$('#btnAgregarSucursal').addClass('hide');
	$('#btnActualizaSucursal').attr('disabled',false);
	$('#btnActualizaSucursal').removeClass('hide');
	$('#btnCancelSucursal').attr('disabled',true);
	$('#btnCancelSucursal').addClass('hide');
	$('#btnCancelEditSucursal').attr('disabled',false);
	$('#btnCancelEditSucursal').removeClass('hide');
}
function DeshabilitarS()
{
  $('#SUC_Codigo').attr('disabled',true);
  $('#SUC_Nombre').attr('disabled',true);
  $('#SUC_Direccion').attr('disabled',true)
  $('#SUC_Telefono').attr('disabled',true);
	$('#SUC_Descripcion').attr('disabled',true);
  $('#btnCancelSucursal').attr('disabled',true);
  $('#btnAgregarSucursal').attr('disabled',true);
	$('#btnAgregarSucursal').removeClass('hide');
	$('#btnActualizaSucursal').addClass('hide');
	$('#btnCancelSucursal').removeClass('hide');
	$('#btnCancelEditSucursal').attr('disabled',true);
	$('#btnCancelEditSucursal').addClass('hide');
}
function limpiarS()
{
  $('#SUC_Codigo').val('');
  $('#SUC_Nombre').val('');
  $('#SUC_Direccion').val('');
	$('#SUC_Telefono').val('');
  $('#SUC_Descripcion').val('');
}

//control de formulario Consumidor
function HabilitarC()
{
  $('#CON_Codigo').attr('disabled',false);
  $('#CON_Nombre_Corto').attr('disabled',false);
  $('#CON_Fecha_Baja').attr('disabled',false);
	$('#CON_Activo').attr('disabled',false);
	$('#CON_Activo').formSelect();
  $('#CON_Descripcion').attr('disabled',false);
  $('#btnCancelConsumidor').attr('disabled',false);
  $('#btnAgregarConsumidor').attr('disabled',false);
	$('#btnCancelConsumidor').removeClass('hide');
	$('#btnCancelEditConsumidor').addClass('hide');
}
function EditHabilitarC()
{
  $('#CON_Codigo').attr('disabled',true);
  $('#CON_Nombre_Corto').attr('disabled',false);
  $('#CON_Fecha_Baja').attr('disabled',false);
	$('#CON_Activo').attr('disabled',false);
	$('#CON_Activo').formSelect();
  $('#CON_Descripcion').attr('disabled',false);
	$('#btnAgregarConsumidor').attr('disabled',true);
	$('#btnAgregarConsumidor').addClass('hide');
	$('#btnActualizaConsumidor').attr('disabled',false);
	$('#btnActualizaConsumidor').removeClass('hide');
	$('#btnCancelConsumidor').attr('disabled',true);
	$('#btnCancelConsumidor').addClass('hide');
	$('#btnCancelEditConsumidor').attr('disabled',false);
	$('#btnCancelEditConsumidor').removeClass('hide');
}
function DeshabilitarC()
{
  $('#CON_Codigo').attr('disabled',true);
  $('#CON_Nombre_Corto').attr('disabled',true);
  $('#CON_Fecha_Baja').attr('disabled',true)
  $('#CON_Activo').attr('disabled',true);
	$('#CON_Activo').formSelect();
	$('#CON_Descripcion').attr('disabled',true);
  $('#btnCancelConsumidor').attr('disabled',true);
  $('#btnAgregarConsumidor').attr('disabled',true);
	$('#btnAgregarConsumidor').removeClass('hide');
	$('#btnActualizaConsumidor').addClass('hide');
	$('#btnCancelConsumidor').removeClass('hide');
	$('#btnCancelEditConsumidor').attr('disabled',true);
	$('#btnCancelEditConsumidor').addClass('hide');
}
function limpiarC()
{
  $('#CON_Codigo').val('');
  $('#CON_Nombre_Corto').val('');
  $('#CON_Fecha_Baja').val('');
	$('#CON_Activo').val('1');
	$('#CON_Activo').trigger('change');
  $('#CON_Descripcion').val('');
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
//funcion para Evaluar la descripcion del consumidor
var _descrip = function(des){
	if(des == ''){
		return 'No Tiene Descripción';
	}
	else{
		return des;
	}
}

//funcion para listar consumidores de acuerdo a la empresa y sucursal seleccionadas
function listarConsumidores(id,state){

	$.ajax({
		url: '../../app/controllers/ConsumidorController.php',
		dataType: 'json',
		type: 'post',
		data:{
			accion: 'listar',
			empresa: codigoEmp,
			sucursal: id,
      filtro: state
		},
		success: function(resp){
			tablaConsumidores.clear().draw(false);
			$(resp).each(function(i, e){
				fila = [e.codigo, e.nombre,_descrip(e.descripcion),e.fechaBaja,_estado(e.estado),_acciones(e.codigo)+_cambState(e.codigo,e.estado)];
				tablaConsumidores.row.add(fila).draw(false);
			});
		}
	});
}

//funcion para cargar datos en el combo empresa y sucursal
function listarEmp(combo){

	$.ajax({
		url: '../../app/controllers/EmpresaController.php',
		dataType: 'json',
		type: 'post',
		data:{
			accion: 'listar'
		},
		success: function(resp){
      combo.find('option').remove();
			combo.append('<option value="º" selected>-- Seleccione Empresa --</option>');
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
function listarSuc(combo){

	$.ajax({
		url: '../../app/controllers/SucursalController.php',
		dataType: 'json',
		type: 'post',
		data:{
			accion: 'listar',
			empresa: codigoEmp
		},
		success: function(resp){
      combo.find('li').remove();
      $('#infoTotSucu').find('p').remove();
      $('#infoTotSucu').append('<p class="m-0 subtitle font-weight-700">Número Total de Actividades</p>');
      combo.append('<li class="sidebar-title">Lista de Sucursales</li>');
      j = 0;
			$(resp).each(function(i, e){
        j = j + 1;
				codigo = e.codigo;
				descripcion = e.nombre;
				combo.append('<li class="btnSucu lista" codigo="'+codigo+'"><a class="black-text"><i class="material-icons">adjust</i> '+descripcion+'</a></li>');
			});
      $('#infoTotSucu').append('<p class="m-0 text-muted">'+j+' Sucursales</p>');
		}
	});
}
//funcion para cambiar de estado
function cambiaEstado(state){
  $.ajax({
    type:"POST",
    url:"../../app/controllers/ConsumidorController.php",
    data:{
      accion: 'cambiaState',
      codigo: codigoSeleccionado,
      CON_Activo: state
    },
    dataType:'json',
    success:function(r){
      if(r.respuesta!=''){
        M.toast({html: r.respuesta +'!'});
        listarConsumidores(codigoSucu,filtoLista);
      }else{
        M.toast({html: 'Ocurrió un error: ' + r.respuesta});
      }
    }
  });
}
//funcion ejecutada al presionar alguna actividad de la lista de actividades
$(document).on('click','.btnSucu',function (e) {
  activarBtnAll();
  desactivarBtnAllActivas();
  desactivarBtnAllInactivas();
  codigoSucu = $(this).attr('codigo');
  listarConsumidores(codigoSucu,filtoLista);

  $('#listSucu').find('li').removeClass('active');
  $(this).addClass('active');
  $('#listSucu').find('a').addClass('black-text');
  $('#listSucu').find('a').removeClass('white-text');
  $(this).find('a').removeClass('black-text');
  $(this).find('a').addClass('white-text');
  $('#listSucu').find('i').addClass('black-text');
  $('#listSucu').find('i').removeClass('white-text');
  $(this).find('i').removeClass('black-text');
  $(this).find('i').addClass('white-text');

  $('#btnAddConsumidor').removeClass('hide');

  $('#btnAddSucursal').removeClass('black-text');
  $('#btnAddSucursal').find('i').removeClass('black-text');
  //EditHabilitarL();
});
$(document).on('dblclick','.btnSucu',function (e) {
  codigoSucu = $(this).attr('codigo');
  mostrarSucursal(codigoSucu);
  EditHabilitarS();
});

//funcion ejecutada al presionar el boton editar de la tabla consumidor
$(document).on('click','.btnEditar',function (e) {
	codigoSeleccionado = $(this).attr('codigo');
	mostrarConsumidor(codigoSeleccionado);
	EditHabilitarC();
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
//funcion ejecutada al presionar el boton eliminar de la tabla consumidor
$(document).on('click','.btnEliminar',function (e) {
	codigoSeleccionado = $(this).attr('codigo');
	swal({
    title: "¿Eliminar Consumidor?",
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
				url:"../../app/controllers/ConsumidorController.php",
				data:{
					accion: 'eliminar',
					codigo: codigoSeleccionado
				},
				dataType:'json',
				success:function(r){
					if(r.respuesta!=''){
						DeshabilitarC();
						limpiarC();
						swal(r.respuesta,{
							icon: "success",
							timer: 2000,
							buttons: false
						});
						listarConsumidores(codigoSucu,filtoLista);
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
