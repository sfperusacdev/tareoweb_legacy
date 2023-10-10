//empresa='VALLEPAMPA';
//var webservice;
var username;
/*switch(empresa){
    case 'local':
        webservice='http://192.168.1.65:8082/app.sfperusac.services/';
        break;
    case 'VALLEPAMPA':
        webservice='http://161.132.174.214:1955/app.sfperusac.services/';
        break;
    case 'ALAYA':
         webservice='http://192.168.1.65/app.sfperusac.services/';
        break;    
}*/


function geturl()
{
    ruta="";
	$.ajax({
        type: "POST",
        url: '../../controller/Login.php',
        async:false,
        data: {
            accion: 'sesion',

        },
        success: function (resp) {

            ruta= resp;

        }
    });
return ruta;
}