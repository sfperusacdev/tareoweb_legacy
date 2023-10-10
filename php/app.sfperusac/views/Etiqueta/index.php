<?php
$ruta = "../..";
require_once($ruta . "/controller/login.php");
$login = new Login();

if ($login->isUserLoggedIn() == false) {

    header("location: " . $ruta . "/");
} else {

?>
    <!DOCTYPE html>
    <html lang="en" dir="ltr">

    <head>
        <meta charset="utf-8">
        <title>SF PERU S.A.C</title>
        <?php include $ruta . '/layouts/dependencias1.php'; ?>
    </head>
    <?php include $ruta . '/layouts/inicio.php'; ?>

    <body class="vertical-layout vertical-menu-collapsible page-header-dark vertical-modern-menu 2-columns  " data-open="click" data-menu="vertical-modern-menu" data-col="2-columns">

        <div id="main" class="main-full">
            <div class="row">
                <div class="content-wrapper-before gradient-45deg-indigo-purple"></div>
                <div class="breadcrumbs-dark pb-0 " id="breadcrumbs-wrapper">
                    <div class="container">
                        <div class="row">
                            <div class="col s10 m6 l6">
                                <h5 class="breadcrumbs-title mt-0 mb-0">Etiqueta</h5>
                                <ol class="breadcrumbs mb-0">
                                    <li class="breadcrumb-item"><a href="../inicio/">Inicio</a>
                                    </li>
                                    </li>
                                    <li class="breadcrumb-item active">Etiqueta
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col s12">
                    <div class="container">


                        <!-- Content Area Starts -->
                        <div class="content-full">

                            <div id="button-trigger" class="card card card-default scrollspy border-radius-6 fixed-width">
                                <div class="card-title">

                                    <!--<button class="col s12 m4 l4 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" id="btnAllBaseDatos" name="btnAllBaseDatos">LISTAR TODAS</button>
                  <button class="col s12 m4 l4 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnAllBaseDatosActiva" id="btnAllBaseDatosActiva">LISTAR ACTIVAS</button>
                  <button class="col s12 m4 l4 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnAllBaseDatosInactiva" id="btnAllBaseDatosInactiva">LISTAR INACTIVAS</button>-->
                                </div>
                                <div class="card-content p-1">
                                    <h5 class="mt-0" style="padding:5px; color:black; text-align:center">Imprimir etiquetas</h5>

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
                                                                    <a class="btn cyan waves-effect waves-light right" name="action" id="btn_imprime_eti">Imprimir
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

                                    <div id="modalEti" class="modal border-radius-6 modal-fixed-footer ">
                                        <div class="modal-content">
                                            <h5 class="mt-0 ">Impresión de etiquetas</h5>
                                            <div style="top: -10px; right: 10px;" class="fixed-action-btn direction-top active"><a class="btn-floating waves-effect waves-light red accent-2" id="btn_cerrar_etiqueta"><i class="material-icons">close</i></a>

                                            </div>

                                            <hr>
                                            <br>
                                            <div id="etiquetas">
                                                <div class="video-container">
                                                    <iframe id="lstticket" frameborder="0" type="application/pdf" allowfullscreen>

                                                    </iframe>
                                                    <canvas id="canvas1" width="0" height="0" style="display: none;" >
                                                        Tu navegador no admite el elemento &lt;canvas1&gt;.
                                                    </canvas>
                                                    <canvas id="canvas2" width="0" height="0"  style="display: none;" >
                                                        Tu navegador no admite el elemento &lt;canvas2&gt;.
                                                    </canvas>
                                                    <canvas id="canvas3" width="0" height="0"  style="display: none;" >
                                                        Tu navegador no admite el elemento &lt;canvas3&gt;.
                                                    </canvas>


                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer page-footer footer footer-static footer-dark gradient-45deg-indigo-purple gradient-shadow navbar-border navbar-shadow center ">

                                            <div class="footer-copyright center">
                                                <div class="container"><span>
                                                        <a href="#" target="">* Puede realizar la impresión directa desde el sitio o descargar el archivo pdf</a>
                                                    </span></div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <!-- Content Area Ends -->
                            <?php // require_once $ruta."/layouts/right_sidebar.php"; 
                            ?>
                        </div>
                    </div>
                </div>
            </div>
    </body>

    </html>
    <script type="text/javascript" src="etiqueta.js"></script>
<?php } ?>