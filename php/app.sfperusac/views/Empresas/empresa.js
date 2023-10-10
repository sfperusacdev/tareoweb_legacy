//variables para determinar la empresa, sucursal y consumidor que se seleccionó
var codigoSeleccionadoE;
var codigoSeleccionadoS;
var codigoSeleccionado;

//variable para determinar la tabla
var tablaConsumidores;

$(document).ready(function(){

  $('.collapsible.expandable').collapsible();
  listarEmp($('#EMP_Id'));

	//Accion de BOTONES de formulario Empresa
  $('#btnNewEmpresa').click(function(){
		limpiarE();
		HabilitarE();
  });
	$('#btnEditEmpresa').click(function(){
		EditHabilitarE();
		codigoSeleccionadoE = $('#EMP_Codigo').val();
  });
	$('#btnCancelEmpresa').click(function(){
		limpiarE();
		DeshabilitarE();
		mostrarEmpresa($('#EMP_Id'));
  });
	$('#btnCancelEditEmpresa').click(function(){
		DeshabilitarE();
  });

	//Accion de BOTONES de formulario Sucursal
	$('#btnNewSucursal').click(function(){
			limpiarS();
			HabilitarS();
	  });
	$('#btnEditSucursal').click(function(){
			EditHabilitarS();
			codigoSeleccionadoS = $('#SUC_Codigo').val();
	  });
	$('#btnCancelSucursal').click(function(){
			limpiarS();
			DeshabilitarS();
			mostrarSucursal($('#SUC_Id'));
	  });
	$('#btnCancelEditSucursal').click(function(){
			DeshabilitarS();
	  });

	//Accion de BOTONES de formulario Consumidor
	$('#btnNewConsumidor').click(function(){
		limpiarC();
		HabilitarC();
	});
	$('#btnCancelConsumidor').click(function(){
		limpiarC();
		DeshabilitarC();
		//mostrarConsumidor(codigoSeleccionado);
	});
	$('#btnCancelEditConsumidor').click(function(){
		DeshabilitarC();
		limpiarC();
	});

//Acciones para botones Agregar y actualizar del formulario Empresa
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
          EMP_Id:EMPId,
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
	            listarEmp($('#EMP_Id'));
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
	// Actualizar Empresa
	$('#btnActualizaEmpresa').click(function(){
		var EMPId = $('#EMP_Codigo').val();
    var EMPRasonSocial = $('#EMP_Razon_Social').val();
    var EMPTelefono = $('#EMP_Telefono').val();
		var EMPEmail = $('#EMP_Email').val();
		var EMPDireccion = $('#EMP_Direccion').val();

		if (EMPId != 'º' && EMPRasonSocial != '' && EMPTelefono != '' && EMPEmail != '' && EMPDireccion != '')
		{
			$.ajax({
				type:"POST",
				url:"../../app/controllers/EmpresaController.php",
				data:{
					accion: 'modificar',
					codigo: codigoSeleccionadoE,
          EMP_Id:EMPId,
					EMP_Razon_Social: EMPRasonSocial,
					EMP_Telefono: EMPTelefono,
					EMP_Direccion: EMPDireccion,
					EMP_Email: EMPEmail
				},
				dataType:'json',
				success:function(r){
					if(r.respuesta!=''){
            DeshabilitarE();
						listarEmp($('#EMP_Id'));
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
	});

//Acciones para botones Agregar y actualizar del formulario Sucursal
	//Agregar Sucursal
	$('#btnAgregarSucursal').click(function(){
    var SUCCodigo = $('#SUC_Codigo').val();
		var EMPId = $('#EMP_Id').val();
    var SUCNombre = $('#SUC_Nombre').val();
    var SUCDireccion = $('#SUC_Direccion').val();
		var SUCTelefono = $('#SUC_Telefono').val();
		var SUCDescripcion = $('#SUC_Descripcion').val();

		if (EMPId != 'º') {
			if (SUCCodigo != '' && SUCNombre != '' && SUCDireccion != '' && SUCTelefono != '' )
			{
	      $.ajax({
					type:"POST",
					data:
					{
						accion: 'insertar',
						SUC_Codigo:SUCCodigo,
	          EMP_Id:EMPId,
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
								listarSuc($('#SUC_Id'),$('#EMP_Id').val());
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
		} else {
			swal("Seleccione Una Empresa", {
				icon: "info",
			});
		}
		$('.swal-overlay').css('z-index', 99999);
	});
	// Actualizar Sucursal
	$('#btnActualizaSucursal').click(function(){
		var SUCCodigo = $('#SUC_Codigo').val();
		var EMPId = $('#EMP_Id').val();
    var SUCNombre = $('#SUC_Nombre').val();
    var SUCDireccion = $('#SUC_Direccion').val();
		var SUCTelefono = $('#SUC_Telefono').val();
		var SUCDescripcion = $('#SUC_Descripcion').val();

		if (EMPId != 'º') {
			if (SUCCodigo != '' && SUCNombre != '' && SUCDireccion != '' && SUCTelefono != '' )
			{
				$.ajax({
					type:"POST",
					url:"../../app/controllers/SucursalController.php",
					data:{
						accion: 'modificar',
						codigo: codigoSeleccionadoS,
	          SUC_Codigo:SUCCodigo,
						EMP_Id: EMPId,
						SUC_Nombre: SUCNombre,
						SUC_Telefono: SUCTelefono,
						SUC_Direccion: SUCDireccion,
						SUC_Descripcion: SUCDescripcion
					},
					dataType:'json',
					success:function(r){
						if(r.respuesta!=''){
	            DeshabilitarS();
							listarSuc($('#SUC_Id'),$('#EMP_Id').val());
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
		} else {
			swal("No Seleccionó Una Empresa", {
				icon: "info",
			});
		}
		$('.swal-overlay').css('z-index', 99999);
	});

//Acciones para botones Agregar y actualizar del formulario Consumidor
	//Agregar Consumidor
	$('#btnAgregarConsumidor').click(function(){
		var CONCodigo = $('#CON_Codigo').val();
		var EMPId = $('#EMP_Id').val();
		var SUCId = $('#SUC_Id').val();
		var CONNombre_Corto = $('#CON_Nombre_Corto').val();
		var CONFecha_Baja = $('#CON_Fecha_Baja').val();
		var CONActivo = $('#CON_Activo').val();
		var CONDescripcion = $('#CON_Descripcion').val();

		if (EMPId != 'º') {
			if (SUCId != 'º') {
				if (CONCodigo != '' && CONNombre_Corto != '' && CONFecha_Baja != '' && CONActivo != '' )
				{
					$.ajax({
						type:"POST",
						data:
						{
							accion: 'insertar',
							CON_Codigo: CONCodigo,
							EMP_Id: EMPId,
							SUC_Id: SUCId,
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
									listarConsumidores($('#EMP_Id').val(),$('#SUC_Id').val());
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
			} else {
				swal("Seleccione Una Sucursal", {
					icon: "info",
				});
			}
		} else {
			swal("Seleccione Una Empresa", {
				icon: "info",
			});
		}
		$('.swal-overlay').css('z-index', 99999);
	});
	// Actualizar Consumidor
	$('#btnActualizaConsumidor').click(function(){
		var CONCodigo = $('#CON_Codigo').val();
		var EMPId = $('#EMP_Id').val();
		var SUCId = $('#SUC_Id').val();
		var CONNombre_Corto = $('#CON_Nombre_Corto').val();
		var CONFecha_Baja = $('#CON_Fecha_Baja').val();
		var CONActivo = $('#CON_Activo').val();
		var CONDescripcion = $('#CON_Descripcion').val();

		if (EMPId != 'º') {
			if (SUCId != 'º') {
				if (CONCodigo != '' && CONNombre_Corto != '' && CONFecha_Baja != '' && CONActivo != '' )
				{
					$.ajax({
						type:"POST",
						url:"../../app/controllers/ConsumidorController.php",
						data:{
							accion: 'modificar',
							codigo: codigoSeleccionado,
							CON_Codigo: CONCodigo,
							EMP_Id: EMPId,
							SUC_Id: SUCId,
							CON_Nombre_Corto: CONNombre_Corto,
							CON_Fecha_Baja: CONFecha_Baja,
							CON_Activo: CONActivo,
							CON_Descripcion: CONDescripcion
						},
						dataType:'json',
						success:function(r){
							if(r.respuesta!=''){
								DeshabilitarC();
								listarConsumidores($('#EMP_Id').val(),$('#SUC_Id').val());
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
			} else {
				swal("No Seleccionó Una Sucursal", {
					icon: "info",
				});
			}
		} else {
			swal("No Seleccionó Una Empresa", {
				icon: "info",
			});
		}
		$('.swal-overlay').css('z-index', 99999);
	});

// Definiendo la tabla consumidores como dataTable
	tablaConsumidores=$('#tablaConsumidores').DataTable({
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

});

//Cada vez que se seleccione un elemento del select Empresa
function empresaSelected(){
	mostrarEmpresa($('#EMP_Id'));
	listarSuc($('#SUC_Id'),$('#EMP_Id').val());
  tablaConsumidores.clear().draw(false);
}
//mostrar datos de empresa
function mostrarEmpresa(emp){
	$.ajax({
		type:"POST",
		data:
		{
			accion: 'Mostrar',
			codigo: emp.val()
		},
		url: '../../app/controllers/EmpresaController.php',
		dataType: 'json',
		success:function(resp){
			if(resp !=''){
				limpiarE();
				DeshabilitarE();
				$('#EMP_Codigo').val(resp.codigo);
				$('#EMP_Razon_Social').val(resp.nombre);
				$('#EMP_Telefono').val(resp.telefono);
				$('#EMP_Direccion').val(resp.direccion);
				$('#EMP_Email').val(resp.email);
			}else{
				M.toast({html: 'Ocurrió un error al recibir datos de la empresa'});
			}
		}
	});
}

//Cada vez que se seleccione un elemento del select Sucursal
function sucursalSelected(){
	mostrarSucursal($('#SUC_Id'));
	listarConsumidores($('#EMP_Id').val(),$('#SUC_Id').val());
}
//mostrar datos de sucursal
function mostrarSucursal(suc){
	$.ajax({
		type:"POST",
		data:
		{
			accion: 'Mostrar',
			codigo: suc.val()
		},
		url: '../../app/controllers/SucursalController.php',
		dataType: 'json',
		success:function(resp){
			if(resp !=''){
				limpiarS();
				DeshabilitarS();
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
				//DeshabilitarC();
				$('#newConsumidor').addClass('active');

				$('#CON_Codigo').val(resp.codigo);
				$('#SUC_Id').val(resp.sucursal);
				$('#SUC_Id').trigger('change');
				//$('#EMP_Id').val(resp.empresa);
				//$('#EMP_Id').trigger('change');
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

//control de formulario Empresa
function HabilitarE()
{
  $('#EMP_Codigo').attr('disabled',false);
  $('#EMP_Razon_Social').attr('disabled',false);
  $('#EMP_Telefono').attr('disabled',false);
	$('#EMP_Direccion').attr('disabled',false);
  $('#EMP_Email').attr('disabled',false);
  $('#btnCancelEmpresa').attr('disabled',false);
  $('#btnAgregarEmpresa').attr('disabled',false);
	$('#btnNewEmpresa').attr('disabled',true);
	$('#btnEditEmpresa').attr('disabled',true);
	$('#btnCancelEmpresa').removeClass('hide');
	$('#btnCancelEditEmpresa').addClass('hide');
}
function EditHabilitarE()
{
  $('#EMP_Codigo').attr('disabled',false);
  $('#EMP_Razon_Social').attr('disabled',false);
  $('#EMP_Telefono').attr('disabled',false);
	$('#EMP_Direccion').attr('disabled',false);
  $('#EMP_Email').attr('disabled',false);
	$('#btnNewEmpresa').attr('disabled',true);
	$('#btnEditEmpresa').attr('disabled',true);
	$('#btnAgregarEmpresa').attr('disabled',true);
	$('#btnAgregarEmpresa').addClass('hide');
	$('#btnActualizaEmpresa').attr('disabled',false);
	$('#btnActualizaEmpresa').removeClass('hide');
	$('#btnCancelEmpresa').attr('disabled',true);
	$('#btnCancelEmpresa').addClass('hide');
	$('#btnCancelEditEmpresa').attr('disabled',false);
	$('#btnCancelEditEmpresa').removeClass('hide');
}
function DeshabilitarE()
{
  $('#EMP_Codigo').attr('disabled',true);
  $('#EMP_Razon_Social').attr('disabled',true);
  $('#EMP_Telefono').attr('disabled',true)
  $('#EMP_Direccion').attr('disabled',true);
	$('#EMP_Email').attr('disabled',true);
  $('#btnCancelEmpresa').attr('disabled',true);
  $('#btnAgregarEmpresa').attr('disabled',true);
	$('#btnNewEmpresa').attr('disabled',false);
	$('#btnEditEmpresa').attr('disabled',false);
	$('#btnAgregarEmpresa').removeClass('hide');
	$('#btnActualizaEmpresa').addClass('hide');
	$('#btnCancelEmpresa').removeClass('hide');
	$('#btnCancelEditEmpresa').attr('disabled',true);
	$('#btnCancelEditEmpresa').addClass('hide');
}
function limpiarE()
{
  $('#EMP_Codigo').val('');
  $('#EMP_Razon_Social').val('');
  $('#EMP_Telefono').val('');
	$('#EMP_Direccion').val('');
  $('#EMP_Email').val('');
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
	$('#btnNewSucursal').attr('disabled',true);
	$('#btnEditSucursal').attr('disabled',true);
	$('#btnCancelSucursal').removeClass('hide');
	$('#btnCancelEditSucursal').addClass('hide');
}
function EditHabilitarS()
{
  $('#SUC_Codigo').attr('disabled',false);
  $('#SUC_Nombre').attr('disabled',false);
  $('#SUC_Direccion').attr('disabled',false);
	$('#SUC_Telefono').attr('disabled',false);
  $('#SUC_Descripcion').attr('disabled',false);
	$('#btnNewSucursal').attr('disabled',true);
	$('#btnEditSucursal').attr('disabled',true);
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
	$('#btnNewSucursal').attr('disabled',false);
	$('#btnEditSucursal').attr('disabled',false);
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
	$('#btnNewConsumidor').attr('disabled',true);
	$('#btnCancelConsumidor').removeClass('hide');
	$('#btnCancelEditConsumidor').addClass('hide');
}
function EditHabilitarC()
{
  $('#CON_Codigo').attr('disabled',false);
  $('#CON_Nombre_Corto').attr('disabled',false);
  $('#CON_Fecha_Baja').attr('disabled',false);
	$('#CON_Activo').attr('disabled',false);
	$('#CON_Activo').formSelect();
  $('#CON_Descripcion').attr('disabled',false);
	$('#btnNewConsumidor').attr('disabled',true);
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
	$('#btnNewConsumidor').attr('disabled',false);
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

//funcion para Evaluar el estado del consumidor
var _estado = function(codigo){
	if(codigo == 1){
		return '<span class="badge green accent-3 border-round">ACTIVO</span>';
	}
	else{
		return '<span class="badge red border-round">INACTIVO</span>';
	}
}
//funcion para mostrar botones de accion en la tabla consumidores
var _acciones = function(codigo){
	return '<button title="Editar" codigo="'+codigo+'" class="mb-2 btn-floating waves-effect waves-light gradient-45deg-blue-indigo gradient-shadow border-round btn-small btnEditar" type="button" style="margin-right: 5px;"><i class="material-icons">edit</i></button><button title="Eliminar" codigo="'+codigo+'" class="mb-2 btn-floating waves-effect waves-light red gradient-shadow border-round btn-small btnEliminar" type="button" style="margin-right: 5px;"><i class="material-icons">delete</i></button>';
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
function listarConsumidores(emp,suc){

	$.ajax({
		url: '../../app/controllers/ConsumidorController.php',
		dataType: 'json',
		type: 'post',
		data:{
			accion: 'listar',
			empresa: emp,
			sucursal: suc
		},
		success: function(resp){
			tablaConsumidores.clear().draw(false);
			$(resp).each(function(i, e){
				fila = [e.codigo, e.nombre,_descrip(e.descripcion),e.fechaBaja,_estado(e.estado),_acciones(e.codigo)];
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
function listarSuc(combo,id){

	$.ajax({
		url: '../../app/controllers/SucursalController.php',
		dataType: 'json',
		type: 'post',
		data:{
			accion: 'listar',
			empresa: id
		},
		success: function(resp){
      combo.find('option').remove();
			combo.append('<option value="º" selected>-- Seleccione Sucursal --</option>');
			$(resp).each(function(i, e){
				codigo = e.codigo;
				descripcion = e.nombre;
				combo.append('<option value="' + codigo + '">' + descripcion + '</option>');
			});

			combo.attr('disabled',false);
			combo.formSelect();
			combo.trigger('contentChanged');
			//combo.sm_select();
		}
	});
}

//funcion ejecutada al presionar el boton editar de la tabla consumidor
$(document).on('click','.btnEditar',function (e) {
	codigoSeleccionado = $(this).attr('codigo');
	mostrarConsumidor(codigoSeleccionado);
	EditHabilitarC();
});
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
						listarConsumidores($('#EMP_Id').val(),$('#SUC_Id').val());
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
