var Domain;
var username;
var url;
var empresa;
var img;
$(document).ready(function () {


    $("#domain").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            $("#username").focus();
        }
    });
    $("#username").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            $("#password").focus();
        }
    });

    $("#password").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {

            login();
        }
    });


    $('#domain').focus();
    $('#btnLogin').click(function () {

        login();
    });


    $('#LOG_Sucursal').change(function () {

        list_cultivo();
    });

    $('#LOG_Cultivo').change(function () {

        list_perfil();
    });

    $('#LOG_Perfil').change(function () {
        var target = $("option:selected", $(this));
        img = $(target).attr("img");
    });




    $('#btnIngreso').click(function () {

        ingresar();
    });


});
function login() {
    swal({
        title: 'Autenticando',
        html: true,
        text: '<br><br> <div style="width: 100px;height: 100px;"> <div id="loader-wrapper" ><div id="loader"></div></div> </div><br><br>',
        confirmButtonClass: "btn-danger",
        closeOnConfirm: false,
        closeOnCancel: false
    });


    if (validarenblanco() == true) {

        if (validardomain($('#domain').val()) == true) {
            
            $.post("../app.sfperusac/controller/Login.php", { "username": $('#username').val(), "password": $('#password').val(), "webservice": webservice, "domain": Domain, "accion": "login" }, function (ret) {
                
                if (ret == "ok") {
                    sessionStorage.setItem("username", $('#username').val());
                    swal.close();

                    if (Domain == "VALLEPAMPA" || Domain == "FFP") {
                        ingresar();


                    } else {
                       
                   
                    //   location.replace("../app.sfperusac/views/Tareo");
                    $("#sucursal").css("display", "inline-block");
                    $("#cultivo").css("display", "inline-block");
                    $("#ingresa").css("display", "inline-block");
                    $("#perfil").css("display", "inline-block");
                    $("#dominio").css("display", "none");
                    $("#usuario").css("display", "none");
                    $("#clave").css("display", "none");
                    $("#recuerda").css("display", "none");
                    $("#valida").css("display", "none");
                    // alert(url);
                    list_suc();
                    }
                }
                else {
                    //window.alert(ret);
                    swal.close();
                    swal("Error", ret, "error");
                }
 


            });

        }
    } else {
        swal.close();
    }
}

function validarenblanco() {
    if ($('#domain').val() == '') {
        $('#domain').focus();
        M.toast({ html: 'Complete todos los Campos Obligatorios (*)' });
        return false;
    }
    if ($('#username').val() == '') {
        $('#username').focus();
        M.toast({ html: 'Complete todos los Campos Obligatorios (*)' });

        return false;
    }
    if ($('#password').val() == '') {
        $('#password').focus();
        M.toast({ html: 'Complete todos los Campos Obligatorios (*)' });
        return false;
    }
    return true;
}

function validarenblanco2() {
 if(Domain=="VALLEPAMPA" || Domain=="FFP"  ){
        return true;
    }
    if (!$('#LOG_Sucursal').val()) {
        $('#LOG_Sucursal').focus();
        M.toast({ html: 'Complete todos los Campos Obligatorios (*)' });
        return false;
    }
    if (!$('#LOG_Cultivo').val()) {
        $('#LOG_Cultivo').focus();
        M.toast({ html: 'Complete todos los Campos Obligatorios (*)' });

        return false;
    }
    if (!$('#LOG_Perfil').val()) {
        $('#LOG_Perfil').focus();
        M.toast({ html: 'Complete todos los Campos Obligatorios (*)' });
        return false;
    }
    return true;
}
function validardomain(domain) {
    var bool = false;
    Domain = domain;
    if (window.sessionStorage) {
        sessionStorage.setItem("dominio", domain);
        // var nombre = sessionStorage.getItem("nombre");
        // sessionStorage.removeItem("nombre");
    }

    else {
        throw new Error('Tu Browser no soporta sessionStorage!');
    }



    if (domain == 'LOCAL') {
        webservice = 'http://192.168.1.65:8082/app.sfperusac.services_alaya/';
        bool = true;
    } else {
        $.ajax({
            async: false,
            type: "GET",
            url: "http://api.sfperusac.com/sf/GetEmpresabydomain.php?domain=" + domain,
            dataType: 'json',
            success: function (resp) {
                console.log(resp);
                if (resp.length == 0) {
                    M.toast({ html: 'Dominio errado' });
                    $('#domain').focus();
                    bool = false;
                } else {
                    $(resp).each(function (i, e) {
                        webservice = e.url;
                        sessionStorage.setItem("iddatabase", e.iddatabase);
                        sessionStorage.setItem("idempresa", e.idempresa);
                        sessionStorage.setItem("url", webservice);
                        url = webservice;
                        empresa = e.idempresa;
                        //alert("dominio existente" + webservice);

                    });
                    bool = true;
                }

            }
        }).fail(function (jqXHR, textStatus, errorThrown) {

            alert('Error!!' + errorThrown);
            bool = false;
        });
    }


    return bool;


}

function list_suc() {
    //alert($('#username').val() + empresa)

    $.ajax({
        async: false,
        type: "POST",
        url: url,
        dataType: 'json',
        data: {
            controller: 'Usuario',
            accion: 'login_suc',
            usuario: $('#username').val(),
            empresa: empresa //trabajarlo en el modal

        },
        success: function (resp) {
            console.log(resp);
            if (resp.length == 0) {
                M.toast({ html: 'Error al listar sucursal' });
            } else {
                $(resp).each(function (i, e) {
                    var option = $(document.createElement('option'));

                    option.text(e.nombre);
                    option.val(e.idsucursal);
                    $("#LOG_Sucursal").append(option);

                });
                $('#LOG_Sucursal').formSelect();
            }

        }
    }).fail(function (jqXHR, textStatus, errorThrown) {

        alert('Error!!' + errorThrown);

    });
}

function list_cultivo() {

    $.ajax({
        async: false,
        type: "POST",
        url: url,
        dataType: 'json',
        data: {
            controller: 'Usuario',
            accion: 'login_cul',
            usuario: $('#username').val(),
            empresa: empresa, //trabajarlo en el modal
            sucursal: $('#LOG_Sucursal').val(),
        },
        success: function (resp) {
            console.log(resp);
            if (resp.length == 0) {
                M.toast({ html: 'Error al listar sucursal' });
            } else {
                $(resp).each(function (i, e) {
                    var option = $(document.createElement('option'));

                    option.text(e.nombre);
                    option.val(e.idcultivo);
                    $("#LOG_Cultivo").append(option);

                });
                $('#LOG_Cultivo').formSelect();
            }

        }
    }).fail(function (jqXHR, textStatus, errorThrown) {

        alert('Error!!' + errorThrown);

    });
}

function list_perfil() {

    $.ajax({
        async: false,
        type: "POST",
        url: url,
        dataType: 'json',
        data: {
            controller: 'Usuario',
            accion: 'login_perfil',
            usuario: $('#username').val(),
            empresa: empresa, //trabajarlo en el modal
            sucursal: $('#LOG_Sucursal').val(),
            cultivo: $('#LOG_Cultivo').val(),
        },
        success: function (resp) {
            console.log(resp);
            if (resp.length == 0) {
                M.toast({ html: 'Error al listar sucursal' });
            } else {
                $(resp).each(function (i, e) {
                    var option = $(document.createElement('option'));
                    option.text(e.nombre);
                    // option.id(e.img);
                    option.val(e.idperfil);
                    // $("#LOG_Perfil").append(option);

                    $('#LOG_Perfil').append('<option img="' + e.img + '" value="' + e.idperfil + '">' + e.nombre + '</option>');
                });
                $('#LOG_Perfil').formSelect();
            }

        }
    }).fail(function (jqXHR, textStatus, errorThrown) {

        alert('Error!!' + errorThrown);

    });
}

function ingresar() {

    if(validarenblanco2()==true){
        swal({
        title: 'Autenticando',
        html: true,
        text: '<br><br> <div style="width: 100px;height: 100px;"> <div id="loader-wrapper" ><div id="loader"></div></div> </div><br><br>',
        confirmButtonClass: "btn-danger",
        closeOnConfirm: false,
        closeOnCancel: false
    });
    $.post("../app.sfperusac/controller/Login.php", { "accion": "log" }, function (ret) {

        if (ret == "ok") {
            if(Domain=="VALLEPAMPA" || Domain=="FFP"){
                sessionStorage.setItem("idsucursal", "S01");
                sessionStorage.setItem("idcultivo", "001");
                sessionStorage.setItem("idperfil", "0001");
                sessionStorage.setItem("img", "http://186.64.120.215/app.sfperusac/plugins/Materialize/app-assets/images/avatar/ysabel.jpg");


            }else{
                sessionStorage.setItem("idsucursal", $('#LOG_Sucursal').val());
            sessionStorage.setItem("idcultivo", $('#LOG_Cultivo').val());
            sessionStorage.setItem("idperfil", $('#LOG_Perfil').val());
            sessionStorage.setItem("img", img);
            }
            location.replace("../app.sfperusac/views/Tareo");
            swal.close();
        }
        else {
            //window.alert(ret);
            swal("Error", ret, "error");
        }

    });

    }
    

}

/*
function validarusuario(usuario, password) {
   // alert(usuario + password + '  ' + webservice);
   var bool =false;
    $.ajax({
        type: "POST",
        url: webservice,
        async:false,
        dataType: 'json',
        data: {
            controller: 'Usuario',
            accion: 'login',
            usuario: usuario, //cambiar al modelo usando sessiones
            password: password,
            webservice:webservice
        },
        success: function (resp) {
            console.log(resp);
            if (resp.length == 0) {
                M.toast({ html: 'Usuario/contraseña errada' });
                $('#username').focus();
                bool= false;
            } else {
                $(resp).each(function (i, e) {
                    username = e.nombres;
                    /// alert("dominio existente" + webservice);
                   // return true;
                   bool=true;
                });
            }

        }
    }).fail(function (jqXHR, textStatus, errorThrown) {

        alert('Error!!' + errorThrown);
        bool= false;
    });

    return (bool);

}*/

