$(document).ready(function () {

  $('#eti').addClass('active');
  $('#btn_imprime_eti').click(function () {
    genera_pdf();
  });

});

function validarenblanco() {
  if ($('#txt_cantidad').val() == '') {
    $('#txt_cantidad').focus();
    M.toast({ html: 'Complete todos los Campos Obligatorios (*)' });
    return false;
  }
  if ($('#txt_cnt_eti').val() == '') {
    $('#txt_cnt_eti').focus();
    M.toast({ html: 'Complete todos los Campos Obligatorios (*)' });

    return false;
  }

  return true;
}
function generateBarcode() {

  if (validarenblanco() == true) {
    $('#modalEti').modal('open');
    $('#lstticket').attr('src', 'about:blank');
    swal({
      title: 'Generando pdf',
      html: true,
      text: '<br><br> <div style="width: 100px;height: 100px;"> <div id="loader-wrapper" ><div id="loader"></div></div> </div><br><br>',
      confirmButtonClass: "btn-danger",
      closeOnConfirm: false,
      closeOnCancel: false
    });
    var cantidad = $('#txt_cantidad').val();
    var etiquetas = $('#txt_cnt_eti').val();
    var empresa = sessionStorage.getItem("idempresa");
    var sucursal = sessionStorage.getItem("idsucursal");
    var cultivo = sessionStorage.getItem("idcultivo");

    // alert(empresa + sucursal + cultivo);
    /* $.post("../../controller/Etiqueta.php", {"documento": documento,"serie":serie,"cantidad":cantidad,"etiquetas":etiquetas,"accion":"genera_etiquetas"}, function(ret){
       console.log(ret);
   
       $('#modalEti').html(ret); 
                 });
   */

    $('#lstticket').attr('src', '../../controller/Etiqueta.php?cantidad=' + cantidad + '&etiquetas=' + etiquetas + '&empresa=' + empresa + '&sucursal=' + sucursal + '&cultivo=' + cultivo)

  }




}

function cerrar() {
  swal.close();
}

function genera_pdf() {
//  $('#modalEti').modal('open');
  $('#lstticket').attr('src', 'about:blank');
  swal({
    title: 'Generando etiquetas',
    html: true,
    text: '<br><br> <div style="width: 100px;height: 100px;"> <div id="loader-wrapper" ><div id="loader"></div></div> </div><br><br>',
    confirmButtonClass: "btn-danger",
    closeOnConfirm: false,
    closeOnCancel: false
  });
  var etiquetas = $('#txt_cnt_eti').val();
  var eti=etiquetas;
  var cantidad = $('#txt_cantidad').val();
  var empresa = sessionStorage.getItem("idempresa");
  var sucursal = sessionStorage.getItem("idsucursal");
  var cultivo = sessionStorage.getItem("idcultivo");
  var url = sessionStorage.getItem("url");
  var d = new Date();
  var fecha = d.getDate()+ "-" + "0" +(d.getMonth()+1)+"-"+d.getFullYear() 
  etiquetas = Math.ceil(etiquetas / 3);
  var doc = new jsPDF('l', 'mm', [136.5, 25]);
  doc.setFont('freeserif');
  doc.setFontSize(8);
  doc.setFontType('bold');
  $.post(url, {
    "accion": "genera_etiquetas", "controller": "Etiqueta", "cantidad": cantidad,
    "idempresa": empresa, "idsucursal": sucursal, "idcultivo": cultivo
  }, function (ret) {
   // console.log(ret);
    $(ret).each(function (i, e) {
      var contador=0;
      for (j = 0; j < etiquetas; j++) {
        contador=contador+1;
        var hub_code1 = e.num_numero+("0"+contador).substr(-2);
        //var textToEncode = document.getElementById("textToEncode");
        //textToEncode.value = hub1_code;   

        PDF417.init(hub_code1);

        var barcode = PDF417.getBarcodeArray();

        // block sizes (width and height) in pixels
        var bw = 1.51;
        var bh = 0.98;

        // create canvas element based on number of columns and rows in barcode
        var canvas1 = document.getElementById('canvas1');
        canvas1.width = bw * barcode['num_cols'];
        canvas1.height = bh * barcode['num_rows'];
        //  document.getElementById('barcode').appendChild(canvas);

        var ctx = canvas1.getContext('2d');

        // graph barcode elements
        var y = 0;
        // for each row
        for (var r = 0; r < barcode['num_rows']; ++r) {
          var x = 0;
          // for each column
          for (var c = 0; c < barcode['num_cols']; ++c) {
            if (barcode['bcode'][r][c] == 1) {
              ctx.fillRect(x, y, bw, bh);
            }
            x += bw;
          }
          y += bh;
        }

       var imgData1=canvas1.toDataURL("image/png", 1.0);
       doc.addImage(imgData1,"png", 1.5, 0.5, 0, 17);
       doc.text("    SF-Alaya "+e.num_numero+ ' | ' + ("0"+(contador)).substr(-2) ,0, 20);
       doc.text("    C.L.P=004-04187-0....." ,0, 24);
     //  doc.text("    "+fecha,0, 21);


       //var imgData1=canvas1;
       contador=contador+1;
        var hub_code2 = e.num_numero+("0"+contador).substr(-2);
        PDF417.init(hub_code2);

        var barcode = PDF417.getBarcodeArray();

        // create canvas element based on number of columns and rows in barcode
        var canvas2 = document.getElementById('canvas2');
        canvas2.width = bw * barcode['num_cols'];
        canvas2.height = bh * barcode['num_rows'];
        //document.getElementById('barcode').appendChild(canvas);

        var ctx = canvas2.getContext('2d');

        // graph barcode elements
        y = 0;
        // for each row
        for (var r = 0; r < barcode['num_rows']; ++r) {
          var x = 0;
          // for each column
          for (var c = 0; c < barcode['num_cols']; ++c) {
            if (barcode['bcode'][r][c] == 1) {
              ctx.fillRect(x, y, bw, bh);
            }
            x += bw;
          }
          y += bh;
        }
        var imgData2=canvas2.toDataURL("image/png", 1.0);

        doc.addImage(imgData2, "png", 48, 0.5, 0, 17);
        doc.text("    SF-Alaya "+e.num_numero+ ' | ' + ("0"+(contador)).substr(-2) ,48, 20);
        doc.text("    C.L.P=004-04187-0....." ,48, 24);
       // doc.text("    "+fecha,44, 21);

        contador=contador+1;
        var hub_code3 = e.num_numero+("0"+contador).substr(-2);
        PDF417.init(hub_code3);

        var barcode = PDF417.getBarcodeArray();

        // block sizes (width and height) in pixels

        // create canvas element based on number of columns and rows in barcode
        var canvas = document.getElementById('canvas3');
        canvas.width = bw * barcode['num_cols'];
        canvas.height = bh * barcode['num_rows'];
        //document.getElementById('barcode').appendChild(canvas);

        var ctx = canvas.getContext('2d');

        // graph barcode elements
        var y = 0;
        // for each row
        for (var r = 0; r < barcode['num_rows']; ++r) {
          var x = 0;
          // for each column
          for (var c = 0; c < barcode['num_cols']; ++c) {
            if (barcode['bcode'][r][c] == 1) {
              ctx.fillRect(x, y, bw, bh);
            }
            x += bw;
          }
          y += bh;
        }

        var imgData3=canvas3.toDataURL("image/png", 1.0);
        doc.addImage(imgData3, "png", 94, 0.5, 0, 17);
        doc.text("    SF-Alaya "+e.num_numero+ ' | ' + ("0"+(contador)).substr(-2) ,94, 20);
	doc.text("    C.L.P=004-04187-0....." ,94, 24);
      //  doc.text("    "+fecha,90, 21);

        if(j==etiquetas-1){
          doc.text("___________________________________________________________________________________________________________________",0, 21);
                      
      }

      if(i==ret.length-1 && j==etiquetas-1){
        swal.close();
      }else{
         doc.addPage([136.5, 25], "l");
      }
       
      }

    });
    
   // var cadena = doc.output('datauri');
    doc.save('Etiquetas '+fecha+':'+eti+'-'+cantidad);
//var iframe = "<iframe width='100%' height='100%' src='" + cadena + "'></iframe>"

//$('#lstticket').attr('src', cadena)

   
  }, "json");
}