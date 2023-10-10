var url;
var database =sessionStorage.getItem("iddatabase");
var codigoEmp = sessionStorage.getItem("idempresa");
var codigoSuc =sessionStorage.getItem("idsucursal");
var img=sessionStorage.getItem("img");


var codigoTabla;
var tablas;
var filtro='';
var ruta,tabla,header,descripcion,metodo_exter;
$(document).ready(function(){
    url=geturl();
   
    $('#avatar').attr('src',img);
    $('#filtro').datepicker({
       // autoClose: true,
        container: 'body',
        format:'yyyymmdd',
        setDefaultDate:true,
        defaultDate: new Date(),
       // showClearBtn:true,
        i18n: {
            months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
            weekdays: ["Domingo","Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            weekdaysShort: ["Dom","Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
            weekdaysAbbrev: ["D","L", "M", "M", "J", "V", "S"],
            cancel:'Cancelar',
            clear:'Limpiar',
            done:'Ok',
            
            
        },
       // setDate: new Date(),
        onSelect() {
           // alert( $('#filtro').val());
        }
        
    }); 

    $('.datepicker-done').click(function(){
        filtro= $('#filtro').val();
        ruta=ruta.replace("@filtro", filtro);
        //alert('ruta '+ruta+'tabla '+tabla+header+descripcion+metodo_exter)
        download();
	});


    $("#btn_cerrar").on("click", function() {
        $('#modalTabla').modal('close');
     });


    $.ajax({
            url: url,
            dataType: 'json',
            type: 'post',
            data:{
                    controller: 'TablaMaestra',
                    accion: 'listar',
                    bd:database,
                    empresa:codigoEmp
                 },
            success: function(resp){
                
                if(resp.length ==0)
                {
                    swal("Error", "La lista de tablas maestras no devuelve valores", "error");
                }else{
                    tablas=resp;
                    $('#data_tablageneral').find('div').remove();          
                   
                    j = 0;
                    $(resp).each(function(i, e){
                        tablas=resp;
                        j = j + 1;
                        codigo = e.TAB_ID;
                        descripcion = e.TAB_Descripcion;
                        img = e.TAB_Img;
                        
                       
                        //   combo.append('<li class="btnAct lista" codigo="'+codigo+'" estado="'+estado+'"><a class="text-sub"><i class="blue-text material-icons small-icons mr-2">fiber_manual_record</i> '+descripcion+'</a>'+tipohtml+'</li>');
                            $('#data_tablageneral').append('<div class="col s12 m6 l4 card-width center">'+
                            '<div class="card-panel border-radius-6 mt-10 card-animation-1">'+
                                '<img class="responsive-img border-radius-8 z-depth-4 image-n-margin" src="'+img+'" alt="">'+
                                '<h6><a href="#" class="mt-5 center">'+descripcion+'</a></h6>'+
                                '<div class="border-non mt-5 btn_Descargar" codigo="'+codigo+'" >'+
                                            '<a class="waves-effect waves-light btn red border-round box-shadow">Descargar</a>'+
                                '</div>'+
                                
                            '</div>'+
                            
                        '</div>');


                    });
                }
                   
           
              }
            }).fail( function( jqXHR, textStatus, errorThrown ) {
                alert( 'Error!!' + errorThrown );
                });

});


//funcion ejecutada al presionar alguna opci{on para descargar
$(document).on('click','.btn_Descargar',function (e) {
    
    tabla = $(this).attr('codigo');
    filtro="";
    
    $(tablas).each(function(i, e){
        if(e.TAB_ID==tabla)
        {
         header=e.TAB_Cabecera_externa;
         ruta = e.TAB_Ruta_externa;
         descripcion = e.TAB_Descripcion;
         metodo_exter=e.TAB_Metodo_externo;
        
        }
 
 
     });
    if(tabla=='PROGRAMACION'){
        $('#filtro').click();
        
    }else{
        download();
    }

    
});


//Descargar información de servidor
function download()
{
  // alert(ruta + tabla + JSON.stringify(header));
  var dominio = sessionStorage.getItem("dominio");
 // alert(dominio);
//console.log(ruta + tabla + JSON.stringify(header));
   swal({
    title: "Descargando: "+descripcion,
    html:true,
    text:'<br><br> <div style="width: 100px;height: 100px;"> <div id="loader-wrapper" ><div id="loader"></div></div> </div><br><br>',                   
    confirmButtonClass: "btn-danger",
    confirmButtonText: "Espere un momento...",
    closeOnConfirm: false,
    closeOnCancel: false
    },function (isConfirm) {
      if (isConfirm) {
        return false;
      } 
    });
console.log(url + codigoEmp +codigoSuc + ruta+metodo_exter+header+ tabla);
       
        $.ajax({
            url: url,
            method: "POST",
            data:{
                controller: 'IntegraSIDIGE',
                accion: 'download',
                emp: codigoEmp,
                suc: codigoSuc,
                url_externa: ruta,
                method_externo:metodo_exter,
                header_externo:header,
                tabla: tabla,
                filtro: filtro
                      },
            dataType:"json",
            success:function(r){
                if(r.respuesta!='' && (r.respuesta).substr(0,5)!='Error'){
                    console.log(r);
                    swal("Descarga exitosa", "El catálogo de "+ descripcion+" fue descargado con éxito", "success");
                    //swal.close();
                
                }else{
                      if( (r.respuesta).substr(0,5)=='Error')
                      {
                        swal("Error", r.respuesta, "error");
                      }else{
                          swal("Error", "Ocurrió un error", "error");
                      }

                    }
                }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
                   // alert( 'Error!!' + errorThrown );
                    swal("Error", "Ocurrió un error: " + errorThrown, "error");
                    
        });





    //.done(function (response) {
    //    console.log(response);
     // }
      //);
      
    /*.fail( function( jqXHR, textStatus, errorThrown ) {
            alert( 'Error!!' + errorThrown );});*/




}
