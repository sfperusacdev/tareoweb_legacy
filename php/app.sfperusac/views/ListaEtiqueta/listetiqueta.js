var idempresa = sessionStorage.getItem("idempresa");
var idsucursal = sessionStorage.getItem("idsucursal");
var idcultivo = sessionStorage.getItem("idcultivo");
var url = sessionStorage.getItem("url");

$(document).ready(function () {

  $('#lietiqueta').addClass('active');
  $('#liEti').removeClass('active');
  $('#liEti').addClass('close');

  $('#FechaInicio').formatter({
    'pattern': '{{9999}}-{{99}}-{{99}}'
  });
  $('#FechaFin').formatter({
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

  $('#FechaFin').datepicker({
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




  $('#btn_buscar_eti').click(function () {

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



    var fini = $('#FechaInicio').val().replace('-', '').replace('-', '');
    var ffin = $('#FechaFin').val().replace('-', '').replace('-', '');
    var txt = $('#txt_doc').val();
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'post',
      data: {
        controller: 'Etiqueta',
        accion: 'listar',
        txt: txt,
        fini: fini,
        ffin: ffin,
        idempresa: idempresa,
        idsucursal: idsucursal,
        idcultivo: idcultivo
      },
      success: function (resp) {
        // alert (resp.length);
        if (resp.length == 0) {
          swal("Error", "No existen coincidencias para su búsqueda", "error");
        } else {

          reset_busqueda();
          var j = 0;
          $(resp).each(function (i, e) {


            /*
             //   combo.append('<li class="btnAct lista" codigo="'+codigo+'" estado="'+estado+'"><a class="text-sub"><i class="blue-text material-icons small-icons mr-2">fiber_manual_record</i> '+descripcion+'</a>'+tipohtml+'</li>');
                 $('#data_tablageneral').append('<div class="col s12 m4 l4 card-width center">'+
                 '<div class="card-panel border-radius-6 mt-10 card-animation-1">'+
                     '<img class="responsive-img border-radius-8 z-depth-4 image-n-margin" src="'+img+'" alt="">'+
                     '<h6><a href="#" class="mt-5 center">'+descripcion+'</a></h6>'+
                     '<div class="border-non mt-5 btn_Descargar" codigo="'+codigo+'" >'+
                                 '<a class="waves-effect waves-light btn red border-round box-shadow">Descargar</a>'+
                     '</div>'+
                     
                 '</div>'+
                 
             '</div>');*/
            j = j + 1;

            $('#issues-collection').append('<li class="collection-item dismissable">' +

              '<div class="row">' +
              '<div class="col s1" >' +
              ' <span class="task-cat deep-orange accent-2"  id="' + e.idmovimiento + '">' + ('000' + j).substr(-4) + ' </span>' +
              '</div>' +

              '<div class="col s6">' +
              '<p class="collections-title font-weight-600">' + e.etiqueta + '</p>' +
              '<p class="collections-content">' + e.idtrabajador + ' - ' + e.nombres + '</p>' +
              '</div>' +
              '<div class="col s2 center-align"><p class="collections-title font-weight-600">' + e.asignacion + '</p></div>' +
              '<div class="col s2 center-align">' +
              _cambState(e.idmovimiento, e.activo) +
              '</div>' +
              '<div class="col s1 right-align">' +
              // '<button title="Anular" codigo="'+e.idmovimiento+'" class="mb-2 btn-floating waves-effect waves-light red gradient-shadow border-round btn-small btnAnular" type="button" style="margin-right: 5px;"><i class="material-icons white-text">close</i></button>'+
              '</div>' +

              '</div>' +
              '' +
              '</li>');




          });
          swal.close();
        }


      }
    }).fail(function (jqXHR, textStatus, errorThrown) {
      alert('Error rony!!' + errorThrown);
    });



  });


  /* $(".switch").on('switch-change', function(){    // 2nd (A)
     // do your code here
     // It will specifically called on change of your element
     alert("");
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
   
     }, function (isConfirm) {
       if (isConfirm) {
         //btn.prop("checked", true);
         $(this).attr("checked", false)
       } else {
         swal("Cancelled", "Operación Cancelada! :)", "error");
         if ($(this).is(':checked')) {
           //alert('estaba sin marcado');
           //cambiaEstado($(this).prop("id"), 1);
           $(this).attr("checked", true);
         } else {
           //alert('estaba marcado');
           //cambiaEstado($(this).prop("id"), 0)
           $(this).attr("checked", false);
         }
         
       }
     });
 
 });*/




});
function reset_busqueda() {
  $('#issues-collection').empty();
  $('#issues-collection').append('<li class="collection-item avatar">' +
    '<i class="material-icons red accent-2 circle">opacity</i>' +
    '<h6 class="collection-header m-0">Lista de etiquetas</h6>' +
    '<p>Coincidencias</p>' +
    '</li>');
}

//funcion para mostrar botones de cambio de estado en la tabla variedades
var _cambState = function (codigo, state) {
  if (state == 1) {
   // alert("activo");
    return '<div class="switch" > <label> I <input type="checkbox" class="btn_estado" id="' + codigo + '" checked> <span class="lever" onclick="on_off(this)"></span> A</label></div>';
  } else {
   // alert("inactivo");
    return '<div class="switch" ><label> I <input type="checkbox" class="btn_estado" id="' + codigo + '"> <span class="lever" onclick="on_off(this)"></span> A</label></div>';
  }
}

//funcion para cambiar de estado
function cambiaEstado(idmovimiento, state) {
      $.ajax({
        type: "POST",
        url: url,
        data: {
          controller: 'Etiqueta',
          accion: 'cambiaState',
          idmovimiento: idmovimiento,
          idempresa: idempresa,
          idsucursal: idsucursal,
          idcultivo: idcultivo,
          activo: state
        },
        dataType: 'json',
        success: function (r) {
          console.log(r);
          if (r.respuesta != '' && (r.respuesta).substr(0, 5) != 'Error') {
            M.toast({ html: r.respuesta + '!' });
            swal("Actualizado!", (r.respuesta).substr(3, 100), "success");
            setTimeout(function () {
              swal.close();
            }, 3000);
            // rpta = true;
          } else {
            M.toast({ html: 'Ocurrió un error: ' + r.respuesta });
            swal("Error", "Oucrrió un error! :) " + r.respuesta, "error");
            
          }
        }
      }).fail(function (jqXHR, textStatus, errorThrown) {
        alert('Error!!' + errorThrown);

      });


}


function on_off(elemento) {

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

  }, function (isConfirm) {
    if (isConfirm) {
      if ($(elemento).siblings('input').prop("checked")) {
        //alert('estaba sin marcado');
        cambiaEstado($(elemento).prop("id"), 1);
      } else {
        //alert('estaba marcado');
        cambiaEstado($(elemento).prop("id"), 0)

      }

    } else {
      var checked = $(elemento).siblings('input').prop("checked");
      console.log(checked);
      if ($(elemento).siblings('input').prop("checked")) {
        //alert('estaba sin marcado');
        //cambiaEstado($(this).prop("id"), 1);
        console.log("no se activa")
        $(elemento).siblings('input').prop('checked', !checked);
      } else {
        //alert('estaba marcado');
        //cambiaEstado($(this).prop("id"), 0)
        console.log("no se inactiva")
        $(elemento).siblings('input').prop('checked', !checked);
      }


      swal("Cancelled", "Operación Cancelada! :)", "error");
    }
  });





}