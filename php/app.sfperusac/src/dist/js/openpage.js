$(document).ready(function () {
    //$("#etiqueta")
    $("#btn_cerrar_etiqueta").on("click", function() {
        $('#modalEti').modal('close');
     });
    
    });

function openpage(){
    //alert('fff');
    $('#modalGener').modal('open'); 
    $.ajax({
        type: "GET",
        url: "../../views/etiqueta/index.php",
        success: function(datos) {
            //alert(datos);
            $("#modalGener").html(datos);
            $("#txt_cantidad").focus();
        }
    });
}

function cerrar()
{

    $('#modalGener').modal('close');

}

function cerrar_eti()
{

  
}

function validaNumericos(){
    $('.validanumericos').keypress(function(e) {
        if(isNaN(this.value + String.fromCharCode(e.charCode))) 
         return false;
      })
      .on("cut copy paste",function(e){
        e.preventDefault();
      });
     
   }