var idempresa = sessionStorage.getItem("idempresa");
var idsucursal = sessionStorage.getItem("idsucursal");
var idcultivo = sessionStorage.getItem("idcultivo");
var url = sessionStorage.getItem("url");
var tablaEtiquetas;
var tablagrupos;
var tablaTrabajadores;
var respuesta_grupos;
var respuesta_etiquetas;
var respuesta_Trabajadores;
var fini = $('#FechaInicio').val().replace('-', '').replace('-', '');
$(document).ready(function () {
  $('#lietiqueta_con').addClass('active');


  $('#FechaInicio').formatter({
    'pattern': '{{9999}}-{{99}}-{{99}}'
  });


  // var d = new Date();
  // var fecha = d.getDate()+ "-" + "0" +(d.getMonth()+1)+"-"+d.getFullYear(); 

  $('#FechaInicio').datepicker({
    autoClose: true,
    container: 'body',
    format: 'yyyy-mm-dd',
    setDefaultDate: true,
    defaultDate: new Date(),
    // showClearBtn:true,
    i18n: {
      months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
      weekdays: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      weekdaysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      weekdaysAbbrev: ["D", "L", "M", "M", "J", "V", "S"],
      cancel: 'Cancelar',
      clear: 'Limpiar',
      done: 'Ok',


    },
    // setDate: new Date(),
    onSelect() {
      // alert( $('#filtro').val());
    }

  });
  $('#tablaEtiquetas').DataTable({

    paging: true,
    pageLength: 10,
    info: false,
    responsive: true,
    ordering: true,
    processing: true,
    scrollX: true,
    scrollY: true,
    columnDefs: [{
      orderable: false,
      targets: [0]
    }],
    language: {
      lengthMenu: "Mostrar _MENU_ registros por p&aacutegina",
      // "lengthMenu": '<div class="dataTables_legth" id="page-length-option_length"><label>Show <select name="page-length-option_length" aria-controls="page-length-option" class=""><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="-1">All</option></select> entries</label></div>',
      info: "P&aacutegina _PAGE_ of _PAGES_",
      "sProcessing": "Procesando...",
      "sNext": "Siguiente",

      "sPrevious": "Anterior"
    }
  });
  $('#tablaTrabajadores').DataTable({

    paging: true,
    pageLength: 10,
    info: false,
    responsive: true,
    ordering: true,
    processing: true,
    scrollX: true,
    columnDefs: [{
      orderable: false,
      targets: [0]
    }],
    language: {
      lengthMenu: "Mostrar _MENU_ registros por p&aacutegina",
      // "lengthMenu": '<div class="dataTables_legth" id="page-length-option_length"><label>Show <select name="page-length-option_length" aria-controls="page-length-option" class=""><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="-1">All</option></select> entries</label></div>',
      info: "P&aacutegina _PAGE_ of _PAGES_",
      "sProcessing": "Procesando...",
      "sNext": "Siguiente",

      "sPrevious": "Anterior"
    }
  });

  $('#tablaGrupos').DataTable({

    paging: true,
    pageLength: 10,
    info: false,
    responsive: true,
    ordering: true,
    processing: true,
    scrollX: true,
    columnDefs: [{
      orderable: false,
      targets: [0]
    }],
    language: {
      lengthMenu: "Mostrar _MENU_ registros por p&aacutegina",
      // "lengthMenu": '<div class="dataTables_legth" id="page-length-option_length"><label>Show <select name="page-length-option_length" aria-controls="page-length-option" class=""><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="-1">All</option></select> entries</label></div>',
      info: "P&aacutegina _PAGE_ of _PAGES_",
      "sProcessing": "Procesando...",
      "sNext": "Siguiente",

      "sPrevious": "Anterior"
    }
  });

  $('#btn_buscar_gru').click(function () {

    swal({
      title: "Buscando coincidencias",
      html: true,
      text: '<br><br> <div style="width: 100px;height: 100px;"> <div id="loader-wrapper" ><div id="loader"></div></div> </div><br><br>',
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Espere un momento...",
      closeOnConfirm: false,
      closeOnCancel: false
    }, function (isConfirm) {
      if (isConfirm) {
        return false;
      }
    });



    fini = $('#FechaInicio').val().replace('-', '').replace('-', '');
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'post',
      data: {
        controller: 'Etiqueta',
        accion: 'listar_consolidado',
        fecha: fini,
        idempresa: idempresa,
        idcultivo: idcultivo
      },
      success: function (resp) {
        // alert (resp.length);
        if (resp.length == 0) {
          swal("Error", "No existen coincidencias para su búsqueda", "error");
        } else {

          reset_busqueda();
          tablaGrupos = $('#tablaGrupos').DataTable();
          tablaGrupos.clear().draw(false);
          data_export = Array();
          data_export.push(['GRUPOS']);
          /*   $(resp).each(function (i, e) {
               //filename=e.documento+" "+e.codigo_usuario+"["+e.fechaejecucion+"].xlsx";
               fila = [e.gru_id];
               tablaTareos.row.add(fila).draw(true);
               //	row=[e.gru_id];
               //	data_export.push(row);
             });*/

          respuesta_grupos = resp;
          $.each(resp, function (i, item) {
            tablaGrupos.row.add([
              item.gru_id
            ]).draw(false);
          });

          swal.close();



        }


      }
    }).fail(function (jqXHR, textStatus, errorThrown) {
      alert('Error rony!!' + errorThrown);
      swal.close();
    });



  });

  $('#tablaGrupos tbody').on('click', 'tr', function () {
    // Selecciona la fila
  
    var rowIndex = tablaGrupos.row(this).index();
    if (tablaEtiquetas && typeof tablaEtiquetas.clear === "function") {
      tablaEtiquetas.clear().draw();
    }
    if (tablaTrabajadores && typeof tablaTrabajadores.clear === "function") {
      tablaTrabajadores.clear().draw();
    }
    tablaEtiquetas = $('#tablaEtiquetas').DataTable();
    tablaTrabajadores = $('#tablaTrabajadores').DataTable();


    $('#tablaGrupos tbody tr').removeClass('selected');
    $(this).addClass('selected');
 

    $.each(respuesta_grupos, function (i, item) {
      if (i == rowIndex) {
        respuesta_etiquetas = item.etiquetas_concatenadas;
        $('#Cantidadeti').val(item.cantidad_etiquetas);
        $('#Cantidadeti').addClass('personalizado');
        let trabajadores = JSON.parse(item.trabajadores);
        $('#Cantidadtra').val(trabajadores.length);
        $('#Cantidadtra').addClass('personalizado');
        let arreglo = respuesta_etiquetas.split(',');
        let etiquetas = JSON.stringify(arreglo);
        etiquetas = JSON.parse(etiquetas);
        etiquetas.forEach(function (eti) {
          tablaEtiquetas.row.add([eti]).draw(false);
        });

        $(trabajadores).each(function (i, e) {
						fila = [e.nombres];
						tablaTrabajadores.row.add(fila).draw(true);
					});


      }

    });

  $('#tablaEtiquetas tbody').on('click', 'tr', function () {
  $('#tablaEtiquetas tbody tr').removeClass('selected');
    $(this).addClass('selected');
     });
$('#tablaTrabajadores tbody').on('click', 'tr', function () {
  $('#tablaTrabajadores tbody tr').removeClass('selected');
    $(this).addClass('selected');
     });

  });





});
function reset_busqueda() {
  if (tablaGrupos && typeof tablaGrupos.clear === "function") {

    tablaGrupos.clear().draw();
    if (tablaEtiquetas && typeof tablaEtiquetas.clear === "function") {
      tablaEtiquetas.clear().draw();
    }
    if (tablaTrabajadores && typeof tablaTrabajadores.clear === "function") {
      tablaTrabajadores.clear().draw();
    }
$('#Cantidadeti').removeClass('personalizado');
$('#Cantidadeti').val('');
$('#Cantidadtra').removeClass('personalizado');
$('#Cantidadtra').val('');
  } else {
    // Opcional: volver a inicializar
    tablaGrupos = $('#tablaGrupos').DataTable();
    tablaGrupos.clear().draw();
  }


}


