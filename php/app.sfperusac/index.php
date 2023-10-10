<?php
require_once("controller/login.php");
$login = new Login();

// ... ask if we are logged in here:
if ($login->isUserLoggedIn() == true) {
  // the user is logged in. you can do whatever you want here.
  // for demonstration purposes, we simply show the "you are logged in" view.
  header("location: views/tareo");
} else {

?>


  <!DOCTYPE html>
  <html class="loading" lang="en" data-textdirection="ltr">
  <!-- BEGIN: Head-->

  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <meta name="author" content="ThemeSelect">
    <title>User Login | SF PERU S.A.C</title>
    <link rel="apple-touch-icon" href="plugins/Materialize/app-assets/images/favicon/apple-touch-icon-152x152.png">
    <link rel="shortcut icon" type="image/x-icon" href="plugins/Materialize/app-assets/images/favicon/logo.png">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- BEGIN: VENDOR CSS-->
    <link rel="stylesheet" type="text/css" href="plugins/Materialize/app-assets/vendors/vendors.min.css">
    <!-- END: VENDOR CSS-->
    <!-- BEGIN: Page Level CSS-->
    <link rel="stylesheet" type="text/css" href="plugins/Materialize/app-assets/css/themes/vertical-modern-menu-template/materialize.css">
    <link rel="stylesheet" type="text/css" href="plugins/Materialize/app-assets/css/themes/vertical-modern-menu-template/style.css">
    <link rel="stylesheet" type="text/css" href="plugins/Materialize/app-assets/css/pages/login.css">
    <!-- END: Page Level CSS-->
    <!-- BEGIN: Custom CSS-->
    <link rel="stylesheet" type="text/css" href="plugins/Materialize/app-assets/css/custom/custom.css">
    <!-- END: Custom CSS-->

    <!--<script src="<?php echo $ruta; ?>/plugins/alertifyjs/alertify_.js"></script>-->
    <script type="text/javascript" src="plugins/sweet-alert/sweetalert.min.js"></script>
    <script type="text/javascript" src="plugins/sweet-alert/sweetalert.js"></script>
    <link rel="stylesheet" type="text/css" href="plugins/sweet-alert/sweetalert.css">
    <link rel="stylesheet" type="text/css" href="src/dist/css/load.css">
    <style type="text/css">
      .social-bar {
        position: fixed;
        right: 0;
        top: 30%;
        font-size: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        z-index: 100;
      }

      .icon {
        color: white;
        text-decoration: none;
        padding: .7rem;
        display: flex;
        transition: all .1s;

      }

      .icon-facebook {
        background: #ffff;

      }



      .icon:hover {
        padding-right: 1rem;
        border-radius: 1rem 0 0 1rem;
        box-shadow: 0 0 .5rem rgba(0, 0, 0, 0.42);
      }

      [class^="icon-"],
      [class*=" icon-"] {
        /* use !important to prevent issues with browser extensions that change fonts */
        font-family: 'icomoon' !important;
        speak: none;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;

        /* Better Font Rendering =========== */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .icon-facebook:before {
        content: url(logoagro.png);

      }
    </style>
  </head>
  <!-- END: Head-->

  <body class="vertical-layout vertical-menu-collapsible page-header-dark vertical-modern-menu 1-column login-bg  blank-page blank-page" data-open="click" data-menu="vertical-modern-menu" data-col="1-column">
    <div class="row">
      <div class="col s12">
        <div class="container">
          <div id="login-page" class="row">
            <div class="col s12 m6 l3 z-depth-4 card-panel border-radius-6 login-card bg-opacity-5">
              <form class="login-form formValidate" id="loginform" novalidate="novalidate">
                <div class="row">
                  <div id="topright" class="social-bar">
                    <a href="https://www.agrosoft.pe/" target="_blank"> <img class="icon icon-facebook border-radius-6" src="plugins/Materialize/app-assets/images/logo/logoagro.png" alt=""></a>

                  </div>
                  <div class="input-field col s12 center-align mt-10 ">
                    <a href="https://www.sfperusac.com/" target="_blank"> <img class="z-depth-4 circle responsive-img" width="100" src="plugins/Materialize/app-assets/images/logo/tareonew.png" alt=""></a>

                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <h5 class="center-align">TAREO SF</h5>
                  </div>
                </div>
                <div class="row margin" id="dominio">
                  <div class="input-field col s12">
                    <i class="material-icons prefix pt-2">domain</i>
                    <input class="validate" onKeyUp="this.value=this.value.toUpperCase();" required="" aria-required="true" id="domain" name="domain" type="text" data-error=".errorTxt1">
                    <label for="domain" class="center-align">Dominio</label>
                  </div>
                </div>
                <div class="row margin" id="usuario">
                  <div class="input-field col s12">
                    <i class="material-icons prefix pt-2">person_outline</i>
                    <input class="validate" onKeyUp="this.value=this.value.toUpperCase();" required="" aria-required="true" id="username" type="text" data-error=".errorTxt1">
                    <label for="username" class="center-align">Usuario</label>
                  </div>
                </div>
                <div class="row margin" id="clave">
                  <div class="input-field col s12">
                    <i class="material-icons prefix pt-2">lock_outline</i>
                    <input class="validate" required="" aria-required="true" id="password" type="password" data-error=".errorTxt1">
                    <label for="password">Contraseña</label>
                  </div>
                </div>


                <div class="input-field col s12 m12" id="sucursal" style="display: none;">
                  <i class="material-icons prefix pt-2">location_city</i>
                  <select name="LOG_Sucursal" id="LOG_Sucursal"class="validate" required="" >
                    <option value="" disabled selected>Seleccione una sucursal</option>

                  </select>
                  <label>SUCURSAL (*)</label>
                </div>



                <div class="input-field col s12" id="cultivo" style="display: none;">
                  <i class="material-icons prefix pt-2">nature</i>
                  <select name="LOG_Cultivo" id="LOG_Cultivo">
                    <option value="" disabled selected>Seleccione un cutlivo</option>

                  </select>
                  <label>CULTIVO (*)</label>
                </div>

                <div class="input-field col s12 m12" id="perfil" style="display: none;">
                  <i class="material-icons prefix pt-2">person_pin</i>
                  <select name="LOG_Perfil" id="LOG_Perfil">
                    <option value="" disabled selected>Seleccione un perfil</option>

                  </select>
                  <label>PERFIL (*)</label>
                </div>


                <div class="row" id="recuerda">
                  <div class="col s12 m12 l12 ml-2 mt-1">
                    <p>
                      <label>
                        <input type="checkbox" />
                        <span>Recordar contraseña</span>
                      </label>
                    </p>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12" id="valida">
                    <a href="#" id="btnLogin" class="btn waves-effect waves-light border-round  green col s12">AUTENTICAR</a>
                  </div>
                  <div class="input-field col s12" id="ingresa" style="display: none;">
                    <a href="#" id="btnIngreso" class="btn waves-effect waves-light border-round  green col s12">INGRESAR</a>
                  </div>
                </div>
                <br>
              </form>
            </div>

          </div>

        </div>

      </div>

    </div>

    <!-- BEGIN VENDOR JS-->
    <script src="plugins/Materialize/app-assets/js/vendors.min.js" type="text/javascript"></script>
    <!-- BEGIN VENDOR JS-->
    <!-- BEGIN PAGE VENDOR JS-->
    <!-- END PAGE VENDOR JS-->
    <!-- BEGIN THEME  JS-->
    <script src="plugins/Materialize/app-assets/js/plugins.js" type="text/javascript"></script>
    <script src="plugins/Materialize/app-assets/js/custom/custom-script.js" type="text/javascript"></script>
    <script src="src/dist/js/general.js" type="text/javascript"></script>
    <script src="src/dist/js/login.js" type="text/javascript"></script>

    <script src="plugins/Materialize/app-assets/vendors/jquery-validation/jquery.validate.min.js"></script>
    <!-- END THEME  JS-->
    <!-- BEGIN PAGE LEVEL JS-->
    <!-- END PAGE LEVEL JS-->

    <footer class="footer-dark  navbar-border navbar-shadow" style="background-color: black;
  position: absolute;
  bottom: 0;
  width: 100%; text-align:center;
  height: 50px; color: white; opacity: 0.5; padding-left: 0px; vertical-align: middle;">
      <div class="footer-copyright" style="padding-top: 15px;">
        <div class="container"><span>DESARROLLADO POR <a href="http://www.sfperusac.com" target="_blank"> ::..SOLUCIONES INFORMATICAS SF PERU S.A.C..:: </a> </span></div>
      </div>
    </footer>



  </body>

  </html>

<?php
}
