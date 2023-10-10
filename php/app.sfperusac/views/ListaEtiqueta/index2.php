<?php
$ruta = "../..";

/*require_once($ruta."/controller/login.php");
$login = new Login();

if ($login->isUserLoggedIn() == false) {

   header("location: ".$ruta."/");

} else {
  */
?>


<div class="modal-content">



  <h5 class="mt-0">Imprimir etiquetas</h5>
  <div style="top: -10px; right: 10px;" class="fixed-action-btn direction-top active"><a class="btn-floating waves-effect waves-light red accent-2" id="btn_cerrar_g" onclick="cerrar()"><i class="material-icons">close</i></a>
  </div>

  <hr>
  <br>
  <div class="modal-body">

    <div class="row">




      <div class="col s12 m12 l6">
        <ul class="collection z-depth-1 animate fadeLeft">
          <li class="collection-item avatar">
            <i class="material-icons cyan circle">label_outline</i>
            <h6 class="collection-header m-0">Etiquetas</h6>
            <p>Imprimir etiquetas</p>
          </li>
          <br>
          <form class="col s12">
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">account_circle</i>
                <input id="txt_cantidad" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text">
                <label for="txt_cantidad" class="">Cantidad de trabajadores</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">label_outline</i>

                <input id="txt_cnt_eti" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text">

                <label for="txt_cnt_eti">Etiquetas x trabajador</label>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <a class="btn cyan waves-effect waves-light right" name="action" onclick="imprimir_etiqueta()">Imprimir
                    <i class="material-icons right">print</i>
                  </a>
                </div>
              </div>
            </div>
          </form>

        </ul>
      </div>

      <div class="col s12 m12 l6">
        <ul id="issues-collection" class="collection z-depth-1 animate fadeRight">
          <li class="collection-item avatar">
            <i class="material-icons red accent-2 circle">opacity</i>
            <h6 class="collection-header m-0">Modelo de etiqueta</h6>
            <p>Código único</p>
          </li>
          <div class="row grey lighten-5">
            <div class="input-field col s12 center ">
              <img class="responsive-img" src="../../plugins/Materialize/app-assets/images/gallery/11.png" alt="">
            </div>
          </div>
          


        </ul>
      </div>
    </div>


  </div>
</div>

<div class="modal-footer page-footer footer footer-static footer-dark gradient-45deg-indigo-purple gradient-shadow navbar-border navbar-shadow center ">

  <div class="footer-copyright center">
    <div class="container"><span>
        <a href="#" target="">* Indicar cantidad de trabajadores y cantidad de etiquetas por trabajador</a>
      </span></div>
  </div>

</div>
<script type="text/javascript" src="etiqueta.js"></script>
<script type="text/javascript">
  function imprimir_etiqueta() {
    alert('');
    $('#modalGener').modal('close');
    $('#modalEti').modal('open'); 
    generateBarcode();
  }

  function generateBarcode(){
    var documento ='ECO';
		var serie = '0001';
    var cantidad = $('#txt_cantidad').val();
    var etiquetas = $('#txt_cnt_eti').val();

    $.post("../app.sfperusac/controller/Etiqueta.php", {"documento": documento,"serie":serie,"cantidad":cantidad,"accion":"login"}, function(ret){
      $(ret).each(function(i, e){
				               
                       console.log(e.num_numero)
                  });

                });


    $.ajax({
                type:"POST",
                data:
                {
                  controller: 'Etiqueta',
                  accion: 'genera_etiquetas',
                  documento=document,
                  serie=serie,
                  cantidad=cantidad,
                  etiquetas=etiquetas
                },
                url: url,
                dataType: 'json',
                success:function(resp){
                  if(resp.respuesta!='' && (resp.respuesta).substr(0,5)!='Error'){
                     
                    
                   
                   
                  }else{
                    
                  }
                }
              }).fail( function( jqXHR, textStatus, errorThrown ) {
                alert( 'Error!!' + errorThrown );
                });



  }

  function completaceros(dato)
  {
    var numero= ("0" + dato.toString());
    numero = numero.substr(numero.length-2,2);
    return numero;
  }
</script>


<?php// } ?>