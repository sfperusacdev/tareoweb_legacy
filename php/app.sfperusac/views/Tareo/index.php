<?php
$ruta = "../..";
session_start();
if (!isset($_SESSION['user_login_status']) and $_SESSION['user_login_status'] != 1) {
  header("location: " . $ruta . "/");
  exit;
}
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <title>SF PERU SAC</title>
  <?php include $ruta . '/layouts/dependencias1.php'; ?>
  <style>
    #tareomodal {
      width: 20% !important;
      overflow-y: hidden !important;
    }

    #tareomodal_costos {
      width: 25% !important;
      overflow-y: hidden !important;
    }
    #modalTareo {
      width: 20% !important;
      overflow-y: hidden !important;
    }

    #exportamodal {
      width: 20% !important;
      overflow-y: hidden !important;
    }

    #modalProceso {
      height: 40% !important;
      overflow-y: hidden !important;
    }
  </style>
  <script>


  </script>

</head>
<?php include $ruta . '/layouts/inicio.php'; ?>

<body class="vertical-layout vertical-menu-collapsible page-header-dark vertical-modern-menu 2-columns  " data-open="click" data-menu="vertical-modern-menu" data-col="2-columns">

  <div id="main" class="main-full">
    <div class="row">
      <div class="content-wrapper-before gradient-45deg-indigo-purple"></div>

      <div class="col s12">
        <div class="container">
          <div style="bottom: 50px; right: 19px;" class="fixed-action-btn direction-top"><a class="btn-floating btn-large gradient-45deg-light-blue-cyan gradient-shadow"><i class="material-icons">add</i></a>
            <ul>
            <li><a id="btnExportarA2" class="btn-floating light-green darken-4 " style="opacity: 1; transform: scale(1) translateY(0px) translateX(0px);"><i class="material-icons">view_list</i></a></li>
              <li><a id="btnExportarA" class="btn-floating green " style="opacity: 1; transform: scale(1) translateY(0px) translateX(0px);"><i class="material-icons">widgets</i></a></li>
              <li><a id="btnEnviar" class="btn-floating amber" style="opacity: 1; transform: scale(1) translateY(0px) translateX(0px);"><i class="material-icons">send</i></a></li>
              <li><a id="btnFiltro" class="btn-floating red" style="opacity: 1; transform: scale(1) translateY(0px) translateX(0px);"><i class="material-icons">filter_list</i></a></li>
            </ul>
          </div>


          <!-- Modal Structure -->
          <div id="tareomodal" class="modal border-radius-6 ">
            <div class="modal-content">
              <h5 class="mt-0">Filtro</h5>
              <hr>
              <div class="row">
                <form class="col s12">
                  <div class="input-field col s12 m6 l12">
                    <select name="TAR_Estado" id="TAR_Estado">
                      <option value="TO">TODOS</option>
                      <option value="PE">PENDIENTE</option>
                      <option value="AP">APROBADO</option>
                      <option value="EX">EXPORTADO</option>
                      <option value="AN">ANULADO</option>
                    </select>
                    <label>ESTADO (*)</label>
                  </div>
                  <div class="input-field col s12 m6 l12">
                    <select name="TAR_Cultivo" id="TAR_Cultivo">
                      <option value="N">NINGUNO</option>

                    </select>
                    <label>CULTIVO (*)</label>
                  </div>

                  <div class="input-field col s12 m8 l12">
                    <label id="inputFechaInicio" for="FechaInicio">Fecha inicio</label>
                    <input type="text" name="FechaInicio" id="FechaInicio" placeholder="2020-01-01">
                  </div>

                  <div class="input-field col s12 m8 l12">
                    <label id="inputFechaFin" for="FechaFin">Fecha fin</label>
                    <input type="text" name="FechaFin" id="FechaFin" placeholder="2020-01-01">
                  </div>
                  <div class="switch col s12 m8 l12">
                    <label>
                      Tareos en ERP externo
                      <input type="checkbox">
                      <span class="lever"></span>

                    </label>
                  </div>

                </form>
              </div>
            </div>
            <div class="modal-footer col s12 m2 l12 center ">
              <a class="col s12 m2 l5 waves-effect waves-light btn red z-depth-4 mr-5 ml-5" type="reset" id="btnCancel" name="btnCancel"><i class="material-icons left">do_not_disturb_alt</i>SALIR</a>
              <a class="col s12 m2 l5 waves-effect waves-light btn purple z-depth-4 mr-5 " type="button" id="btnAplica" name="btnAplica"><i class="material-icons left">check_circle</i>APLICAR</a>
            </div>
          </div>

          <!-- Modal Structure Ends -->

          <!-- Modal Tareo -->
          <div id="modalTareo" class="modal border-radius-6">
            <div class="modal-content">
              <h5 class="mt-0">Edición Tareo</h5>
              <hr>
              <div class="row">
                <form class="col s12">
                  <div class="input-field col s12 m6 l12">
                    <label id="inputTARCodigo" for="TAR_Codigo">CODIGO (*)</label>
                    <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="TAR_Codigo" id="TAR_Codigo" onkeydown="return tab_btn(event,'TAR_Usuario');" autofocus>
                  </div>
                  <div class="input-field col s12 m6 l12">
                    <label id="inputTARUsario" for="TAR_Usuario">USUARIO (*)</label>
                    <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="TAR_Usuario" id="TAR_Usuario" onkeydown="return tab_btn(event,'TAR_Documento');">
                  </div>
                  <div class="input-field col s12 m6 l12">
                    <label id="inputTARDocumento" for="TAR_Documento">DOCUMENTO (*)</label>
                    <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="TAR_Documento" id="TAR_Documento">
                  </div>
                  <div class="input-field col s12 m6 l12">
                    <label id="inputTARFecha" for="TAR_Fecha">FECHA (*)</label>
                    <input type="text" onKeyUp="this.value=this.value.toUpperCase();" name="TAR_Fecha" id="TAR_Fecha" placeholder="2022-01-01">
                  </div>

                  <div class="col s12" id="campoObligatorio">
                    <label>(*) Campo Obligatorio</label>
                  </div>
                </form>
              </div>
            </div>
            <div class="modal-footer col s12 m2 l12 center ">

              <a class="col s12 m2 l5 waves-effect waves-light btn red z-depth-4 mr-5 ml-5" type="reset" id="btnCancelTareo" name="btnCancelTareo"><i class="material-icons left">do_not_disturb_alt</i>SALIR</a>
              <a class="col s12 m2 l5 waves-effect waves-light btn purple z-depth-4 mr-5 " type="button" id="btnAplicaTareo" name="btnAplicaTareo"><i class="material-icons left">check_circle</i>APLICAR</a>


            </div>
          </div>
          <!-- Modal Structure TAREO Ends -->
          <!-- Modal Proceso -->
          <div id="modalProceso" class=" modal border-radius-6 ">

            <div class="modal-content " id="modal-content_v2">

              <div class="card-content pb-0">


                <ul class="stepper horizontal" id="horizStepper">
                  <li class="step active">
                    <div class="step-title waves-effect">Convertir a Kgr</div>
                    <div class="step-content">
                      <div class="row">
                        <div class="input-field col m6 s12">
                          <label for="txtFecha">Fecha: <span class="red-text">*</span></label>
                          <input type="text" id="txtFecha" name="txtFecha" class="validate" aria-required="true" disabled required="" required autofocus>
                        </div>
                        <div class="input-field col m6 s12">
                          <label for="txtCultivo">Cultivo: <span class="red-text">*</span></label>
                          <input type="text" id="txtCultivo" class="validate" aria-required="true" name="txtCultivo" disabled required="" required autofocus>
                        </div>
                      </div>
                      <div class="row center">
                        <a class="waves-effect waves-light green btn-large mb-1" id="btnToKilogramos" >
                          <i class="material-icons right">account_balance</i> A Kilogramos</a>
                      </div>

                    </div>
                  </li>
                  <li class="step">
                    <div class="step-title waves-effect">Generar horas</div>
                    <div class="step-content">
                      <div class="row">
                        <div class="input-field col m4 s10">
                          <label for="txtFecha_p2">Fecha: <span class="red-text">*</span></label>
                          <input type="text" id="txtFecha_p2" name="txtFecha_p2" class="validate" aria-required="true" disabled required="" required autofocus>
                        </div>

                        <div class="input-field col m2 s10">
                          <label for="txtHInicio">Inicio: <span class="red-text">*</span></label>
                          <input type="text" id="txtHInicio" class="validate" aria-required="true" name="txtHInicio" required="" required autofocus>
                        </div>
                        <div class="input-field col m2 s10">
                          <label for="txtHInicioReceso">Inicio Receso: <span class="red-text">*</span></label>
                          <input type="text" id="txtHInicioReceso" class="validate" aria-required="true" name="txtHInicioReceso" required="" required autofocus>
                        </div>
                        <div class="input-field col m2 s10">
                          <label for="txtHFinReceso">Fin Receso: <span class="red-text">*</span></label>
                          <input type="text" id="txtHFinReceso" class="validate" aria-required="true" name="txtHFinReceso" required="" required autofocus>
                        </div>
                        <div class="input-field col m2 s10">
                          <label for="txtTHoras">Total: <span class="red-text">*</span></label>
                          <input type="text" id="txtTHoras" class="validate" aria-required="true" name="txtTHoras" required="" required autofocus>
                        </div>
                      </div>
                      <div class="row">
                        <div class="input-field col m4 s12">
                          <label for="txtCultivo_p2">Cultivo: <span class="red-text">*</span></label>
                          <input type="text" id="txtCultivo_p2" class="validate" aria-required="true" name="txtCultivo_p2" disabled required="" required autofocus>
                        </div>
                        <div class="row col m6 s12">
                          <a class="waves-effect waves-light red btn-large mb-1" id="btnToHoras">
                            <i class="material-icons right">access_time</i> Obtener Horas</a>
                        </div>
                      </div>



                    </div>
                  </li>
                  <li class="step">
                    <div class="step-title waves-effect">Exportar</div>
                    <div class="step-content">
                      <div class="row">
                        <div class="input-field col m6 s12">
                          <label for="txtFecha_p3">Fecha: <span class="red-text">*</span></label>
                          <input type="text" id="txtFecha_p3" name="txtFecha_p3" class="validate" aria-required="true" disabled required="" required autofocus>
                        </div>
                        <div class="input-field col m6 s12">
                          <label for="txtCultivo_p3">Cultivo: <span class="red-text">*</span></label>
                          <input type="text" id="txtCultivo_p3" class="validate" aria-required="true" name="txtCultivo_p3" disabled required="" required autofocus>
                        </div>
                      </div>
                      <div class="row center">
                        <a class="waves-effect waves-light amber btn-large mb-1" id="btnExportDay">
                          <i class="material-icons right">send</i> Exportar</a>
                      </div>



                    </div>
                  </li>
                </ul>
              </div>




            </div>

            <div style="bottom: -10px; right: 10px;" class="fixed-action-btn direction-top active">
              <p><a class="mb-6 btn waves-effect waves-light red accent-2" id="btn_cerrar_proceso">Salir</a></p>
            </div>
          </div>

          <!-- Modal Structure Trabajador Ends -->
          <!-- Pestañas principales-->
          <div class="row">
            <div class="col s12">
              <ul class="tabs tab-demo-active z-depth-1 white">
                <li class="tab col s4"><a href="#tareos" class="active" id="tabTAREO">TAREOS</a></li>
                <li class="tab col s4"><a class="" href="#subtareo" id="tabDTAREO">CULTIVO / ACTIVIDAD / CONSUMIDOR</a></li>
                <li class="tab col s4"><a href="#dsubtareo" class="" id="tabDDTAREO">TRABAJADORES</a></li>
              </ul>
            </div>
            <div class="col s12">
              <div id="tareos" class="col s12 white" style="display: block;">
                <!-- Content Area Starts -->

                <div class="content-full ">
                  <div class="datatable-search">
                    <i class="material-icons mr-2 search-icon">search</i>
                    <input type="text" placeholder="Buscar Tareos" class="app-filter" id="global_filter_tareo">
                  </div>
                </div>
                <div id="button-trigger_tareo" class="card card card-default border-radius-6 fixed-width">
                  <div class="card-title">
                    <div class="col s12" style="padding:5px; text-align: center; color:black;">
                      Seguimiento de Tareos en SFAGRO
                    </div>
                    <button class="col s12 m4 l3 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" id="btnTAR_All" name="btnTAR_All">TODOS</button>
                    <button class="col s12 m4 l3 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnTAR_PE" id="btnTAR_PE">PENDIENTE</button>
                    <button class="col s12 m4 l2 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnTAR_AP" id="btnTAR_AP">APROBADO</button>
                    <button class="col s12 m4 l2 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnTAR_EX" id="btnTAR_EX">EXPORTADO</button>
                    <button class="col s12 m4 l2 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnTAR_AN" id="btnTAR_AN">ANULADO</button>
                  </div>

                  <div class="col s12">
                    <table id="tablaTareos" class="display nowrap" style="width:100%; height: auto;">
                      <thead>
                        <tr>
                          <th style="text-align: center;">ITEM</th>
                          <th style="text-align: center;">IDUSUARIO</th>
                          <th style="text-align: center;">IDTRABAJADOR</th>
                          <th style="text-align: center;">NOMBRES</th>
                          <th style="text-align: center;">PLANILLA</th>
                          <th style="text-align: center;">DOCUMENTO</th>
                          <th style="text-align: center;">CANT.</th>
                          <th style="text-align: center;">ESTADO</th>
                          <th style="text-align: center;">TURNO</th>
                          <th style="text-align: center;">SEMANA</th>
                          <th style="text-align: center;">EQUIPO</th>
                          <th style="text-align: center;">FECHA EJECUCION</th>
                          <th style="text-align: center;">OPCIONES</th>


                        </tr>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>

                </div>

                <!-- Content Area Ends -->
              </div>
              <div id="subtareo" class="col s12 white" style="display: block;">
                <!-- Content Area Starts -->
                <div class="content-full">
                  <div class="datatable-search">
                    <i class="material-icons mr-2 search-icon">search</i>
                    <input type="text" placeholder="Buscar Tareos" class="app-filter" id="global_filter_dtareo">
                  </div>
                </div>
                <div id="button-trigger" class="card card card-default scrollspy border-radius-6 fixed-width">
                  <div class="card-title">
                    <div class="col s12" style="padding:5px; text-align: center; color:black;">
                      Seguimiento de Tareos en SFAGRO
                    </div>
                    <button class="col s12 m4 l3 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" id="btnDTAR_All" name="btnDTAR_All">TODOS</button>
                    <button class="col s12 m4 l3 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnDTAR_PE" id="btnDTAR_PE">PENDIENTE</button>
                    <button class="col s12 m4 l2 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnDTAR_AP" id="btnDTAR_AP">APROBADO</button>
                    <button class="col s12 m4 l2 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnDTAR_EX" id="btnDTAR_EX">EXPORTADO</button>
                    <button class="col s12 m4 l2 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnDTAR_AN" id="btnDTAR_AN">ANULADO</button>
                  </div>
                  <div class="col s12">
                    <table id="tablaDTareos" class="display" style="width:100%; height: auto;">
                      <thead>
                        <tr>
                          <th style="text-align: center;">ITEM</th>
                          <th style="text-align: center;">IDUSUARIO</th>
                          <th style="text-align: center;">DOCUMENTO</th>
                          <th style="text-align: center;">PLANILLA</th>
                          <th style="text-align: center;">CULTIVO</th>
                          <th style="text-align: center;">VARIEDAD</th>
                          <th style="text-align: center;">ACTIVIDAD</th>
                          <th style="text-align: center;">LABOR</th>
                          <th style="text-align: center;">CONSUMIDOR</th>
                          <th style="text-align: center;">CANT.</th>
                          <th style="text-align: center;">ESTADO</th>
                          <th style="text-align: center;">EQUIPO</th>
                          <th style="text-align: center;">FECHA EJECUCION</th>
                          <th style="text-align: center;">OPCIONES</th>
                        </tr>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- Content Area Ends -->
              </div>
              <div id="dsubtareo" class="col s12 white" style="display: block;">
                <!-- Content Area Starts -->
                <div class="content-full">
                  <div class="datatable-search">
                    <i class="material-icons mr-2 search-icon">search</i>
                    <input type="text" placeholder="Buscar Tareos" class="app-filter" id="global_filter_ddtareo">
                  </div>
                </div>
                <div id="button-trigger" class="card card card-default scrollspy border-radius-6 fixed-width">
                  <div class="card-title">
                    <div class="col s12" style="padding:5px; text-align: center; color:black;">
                      Seguimiento de Tareos en SFAGRO
                    </div>
                    <button class="col s12 m4 l3 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" id="btnDDTAR_All" name="btnDDTAR_All">TODOS</button>
                    <button class="col s12 m4 l3 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnDDTAR_PE" id="btnDDTAR_PE">PENDIENTE</button>
                    <button class="col s12 m4 l2 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnDDTAR_AP" id="btnDDTAR_AP">APROBADO</button>
                    <button class="col s12 m4 l2 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnDDTAR_EX" id="btnDDTAR_EX">EXPORTADO</button>
                    <button class="col s12 m4 l2 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnDDTAR_AN" id="btnDDTAR_AN">ANULADO</button>
                  </div>
                  <div class="col s12">
                    <table id="tablaDDTareos" class="display nowrap" style="width:100%; height: auto;">
                      <thead>
                        <tr>
                          <th style="text-align: center;">ITEM</th>
                          <th style="text-align: center;">IDUSUARIO</th>
                          <th style="text-align: center;">DOCUMENTO</th>
                          <th style="text-align: center;">PLANILLA</th>
                          <th style="text-align: center;">CULTIVO</th>
                          <th style="text-align: center;">VARIEDAD</th>
                          <th style="text-align: center;">ACTIVIDAD</th>
                          <th style="text-align: center;">LABOR</th>
                          <th style="text-align: center;">CONSUMIDOR</th>
                          <th style="text-align: center;">IDTRABAJADOR</th>
                          <th style="text-align: center;">NRO. DOC</th>
                          <th style="text-align: center;">TRABAJADOR</th>
                          <th style="text-align: center;">HORAS</th>
                          <th style="text-align: center;">RENDIMIENTO</th>
                          <th style="text-align: center;">H. INICIO</th>
                          <th style="text-align: center;">H. FIN</th>
                          <th style="text-align: center;">H. EXTRA</th>
                          <th style="text-align: center;">CONCEPTO</th>
                          <th style="text-align: center;">BONO</th>
                          <th style="text-align: center;">ESTADO</th>
                          <th style="text-align: center;">EQUIPO</th>
                          <th style="text-align: center;">FECHA EJECUCION</th>
                          <th style="text-align: center;">OPCIONES</th>
                        </tr>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- Content Area Ends -->
              </div>

            </div>
          </div>



          <?php //require_once $ruta."/layouts/right_sidebar.php"; 
          ?>
        </div>
      </div>
    </div>
  </div>
</body>

</html>

<script type="text/javascript" src="tareo.js"></script>
<script src="<?php echo $ruta; ?>/plugins/Materialize/app-assets/vendors/materialize-stepper/materialize-stepper.min.js"></script>
<script src="<?php echo $ruta; ?>/plugins/Materialize/app-assets/js/scripts/form-wizard.js" type="text/javascript"></script>