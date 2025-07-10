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
        <style>
            #tablaGrupos tbody tr {
                cursor: pointer;
            }

            #tablaGrupos tbody tr.selected,
            #tablaGrupos tbody tr.selected>td {
                background-color: #ffe082 !important;
            }

            #tablaEtiquetas tbody tr {
                cursor: pointer;
            }

            #tablaEtiquetas tbody tr.selected,
            #tablaEtiquetas tbody tr.selected>td {
                background-color: #ffe082 !important;
            }

            #tablaTrabajadores tbody tr {
                cursor: pointer;
            }

            #tablaTrabajadores tbody tr.selected,
            #tablaTrabajadores tbody tr.selected>td {
                background-color: #ffe082 !important;
            }

            #tablaGrupos td {
                font-size: 14px;
                color: #1565c0;
                text-align: center;
                vertical-align: middle;
            }

            #tablaGrupos tbody td {
                color: rgb(0, 0, 0);
            }

            #tablaEtiquetas td {
                font-size: 14px;
                color: #1565c0;
                text-align: center;
                vertical-align: middle;
            }

            #tablaEtiquetas tbody td {
                color: rgb(0, 0, 0);
            }

            #tablaTrabajadores td {
                font-size: 14px;
                color: #1565c0;

                vertical-align: middle;
            }

            #tablaTrabajadores tbody td {
                color: rgb(0, 0, 0);
            }

            .personalizado {
                background-color: rgb(6, 150, 42) !important;
                /* Fondo celeste claro */
                color: rgb(255, 255, 255) !important;
                font-weight: bold !important;
                font-size: 14px !important;
                /* Tamaño ampliado */
                text-align: center !important;
            }

            .personalizado::placeholder {
                color: #bdbdbd;
            }
        </style>
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
                                <h5 class="breadcrumbs-title mt-0 mb-0">Consolidado de etiquetas</h5>
                                <ol class="breadcrumbs mb-0">
                                    <li class="breadcrumb-item"><a href="../../inicio/">Inicio</a>
                                    </li>
                                    </li>
                                    <li class="breadcrumb-item active">Listar Etiquetas
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
                                    <h5 class="mt-0" style="padding:5px; color:black; text-align:center">Búsqueda de etiquetas por fecha</h5>

                                    <div class="modal-body">

                                        <div class="row">




                                            <div class="col s4 m4 l4">
                                                <ul class="collection z-depth-1 animate fadeLeft">
                                                    <li class="collection-item avatar">
                                                        <i class="material-icons cyan circle">group</i>
                                                        <h6 class="collection-header m-0">Grupos de trabajo</h6>
                                                        <p>Ingrese una fecha</p>
                                                    </li>

                                                    <form class="col s12">
                                                        <div class="row">
                                                            <div class="input-field col s4 m8 l6">
                                                                <i class="material-icons prefix">date_range</i>

                                                                <input type="text" name="FechaInicio" id="FechaInicio" placeholder="2020-01-01">
                                                            </div>
                                                            <div class="row">
                                                                <div class="input-field col s4">
                                                                    <a class="btn cyan waves-effect waves-light right" name="action" id="btn_buscar_gru">Buscar
                                                                        <i class="material-icons right">search</i>
                                                                    </a>
                                                                </div>
                                                            </div>

                                                        </div>


                                                    </form>

                                                </ul>
                                                <div class="col s12">
                                                    <table id="tablaGrupos" class="display nowrap" style="width:100%; height: auto;">
                                                        <thead>
                                                            <tr>

                                                                <th style="text-align: center;">GRUPO</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>

                                            <div class="col s4 m4 l4">
                                                <ul id="issues-collection" class="collection z-depth-1 animate fadeRight">
                                                    <li class="collection-item avatar">
                                                        <i class="material-icons red accent-2 circle">label</i>
                                                        <h6 class="collection-header m-0">Lista de etiquetas</h6>
                                                        <p>Cantidad de etiquetas leídas</p>
                                                    </li>

                                                 
                                                    <form class="col s12">
                                                        <div class="row">
                                                            <div class="input-field col s12">
                                                                <i class="material-icons prefix">pages</i>

                                                                <input disabled placeholder="Cantidad" name="Cantidadeti" id="Cantidadeti" type="text" class="validate">
                                                            </div>


                                                        </div>


                                                    </form>



                                                </ul>
                                                <div class="col s12">
                                                    <table id="tablaEtiquetas" class="display nowrap" style="width:100%; height: auto;">
                                                        <thead>
                                                            <tr>

                                                                <th style="text-align: center;">ETIQUETAS</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            <div class="col s4 m4 l4">
                                                <ul id="issues-collection" class="collection z-depth-1 animate fadeRight">
                                                    <li class="collection-item avatar">
                                                        <i class="material-icons red accent-2 circle">person</i>
                                                        <h6 class="collection-header m-0">Lista de trabajadores</h6>
                                                        <p>Integrantes del grupo</p>
                                                    </li>

                                                    <form class="col s12">
                                                        <div class="row">
                                                            <div class="input-field col s12">
                                                                <i class="material-icons prefix">person</i>

                                                                <input disabled placeholder="Cantidad" name="Cantidadtra" id="Cantidadtra" type="text" class="validate">
                                                            </div>


                                                        </div>


                                                    </form>



                                                </ul>
                                                <div class="col s12">
                                                    <table id="tablaTrabajadores" class="display nowrap" style="width:100%; height: auto;">
                                                        <thead>
                                                            <tr>

                                                                <th style="text-align: center;">TRABAJADORES</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                </div>
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
    <script type="text/javascript" src="conetiqueta.js"></script>
    <script src="<?php echo $ruta; ?>/plugins/Materialize/app-assets/vendors/materialize-stepper/materialize-stepper.min.js"></script>
    <script src="<?php echo $ruta; ?>/plugins/Materialize/app-assets/js/scripts/form-wizard.js" type="text/javascript"></script>
<?php } ?>