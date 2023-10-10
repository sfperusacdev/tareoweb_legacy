<?php
$ruta = "../..";
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>SF PERU S.A.C</title>
    <?php include $ruta.'/layouts/dependencias1.php';?>
  </head>
  <?php include $ruta.'/layouts/inicio.php';?>
  <body class="vertical-layout vertical-menu-collapsible page-header-dark vertical-modern-menu 2-columns  " data-open="click" data-menu="vertical-modern-menu" data-col="2-columns">

    <div id="main">
      <div class="row">
        <div class="content-wrapper-before gradient-45deg-indigo-purple"></div>
        <div class="breadcrumbs-dark pb-0 " id="breadcrumbs-wrapper">
          <div class="container">
            <div class="row">
              <div class="col s10 m6 l6">
                <h5 class="breadcrumbs-title mt-0 mb-0">Consumidor</h5>
                <ol class="breadcrumbs mb-0">
                  <li class="breadcrumb-item"><a href="../inicio/">Inicio</a>
                  </li>
                  </li>
                  <li class="breadcrumb-item active">Consumidor
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div class="col s12">
          <div class="container">
            <div class="row">
              <div class="col s12 m12 l12">
                <div class="card animate fadeLeft">
                  <div class="card-content">
                    <!--<div class="col s12 m12 l6">
                      <select name="ACT_Id" id="ACT_Id"></select>
                    </div>-->
                    <!--<div class="col s6 m6 l3">
                      <button class="col s12 mb-2 btn waves-effect waves-light green accent-3 gradient-shadow border-round" type="button" id="btnNewAct" name="btnNewAct"> NUEVO CONSUMIDOR</button>
                    </div>
                    <div class="col s6 m6 l3">
                      <a><button class="col s12 mb-2 btn waves-effect waves-light blue gradient-shadow border-round" type="button" id="btnNewLab" name="btnNewLab"> ACTUALIZAR LISTA</button></a>
                    </div>-->
                    <div class="col s12 m12 l12">
                      <ul class="collapsible popout">
                        <li id="newActivity" style="border-color: #651fff; border-width: 3px; border-style: double;">
                          <div class="collapsible-header waves-effect waves-light gradient-shadow" style="text-align: center; color:black;">
                            <div class="col s11 m11 l11" style="color:black;">NUEVO CONSUMIDOR</div>
                            <i  class="col s1 m1 l1 material-icons">expand_more</i>
                          </div>
                          <div class="collapsible-body">
                            <div class="row">
                              <div class="input-field col s12 m6 l6">
                                <label for="ACT_Codigo">CODIGO (*)</label>
                                <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="ACT_Codigo" id="ACT_Codigo" >
                              </div>
                              <div class="input-field col s12 m6 l6">
                                <label for="ACT_Nombre_Corto">NOMBRE CORTO (*)</label>
                                <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="ACT_Nombre_Corto" id="ACT_Nombre_Corto" >
                              </div>
                              <div class="input-field col s12 m6 l6">
                                <select disabled name="ACT_X_Rendimiento" id="ACT_X_Rendimiento">
                                  <option value="S">POR RENDIMIENTO</option>
                                  <option value="N">POR JORNAL</option>
                                </select>
                                <label>TIPO (*)</label>
                              </div>
                              <div class="input-field col s12 m6 l6">
                                <select disabled name="ACT_Activo" id="ACT_Activo">
                                  <option value="1">ACTIVO</option>
                                  <option value="0">INACTIVO</option>
                                </select>
                                <label>ESTADO (*)</label>
                              </div>
                              <div class="input-field col s12 m12 l12">
                                <label for="ACT_Descripcion">DESCRIPCION</label>
                                <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="ACT_Descripcion" id="ACT_Descripcion" >
                              </div>
                              <div class="col s12" id="campoObligatorio">
                                <label>(*) Campo Obligatorio</label>
                              </div>
                              <div class="col s12 m12 l12" id="btnsActividad">
                                <button class="col l3 mb-2 btn waves-effect waves-light gradient-45deg-green-teal gradient-shadow border-round" type="reset" id="btnNewConsumidor" name="btnNewConsumidor">NUEVO</button>
                                <button  class="col l3 mb-2 btn waves-effect waves-light gradient-45deg-amber-amber gradient-shadow border-round" type="reset" id="btnCancelConsumidor" name="btnCancelConsumidor">CANCELAR</button>
                                <!--<button  class="col l3 mb-2 btn waves-effect waves-light gradient-45deg-amber-amber gradient-shadow border-round" type="reset" id="btnEditAct" name="btnEditAct">EDITAR</button>-->
                                <button  class="col l3 mb-2 btn waves-effect waves-light gradient-45deg-deep-purple-blue gradient-shadow border-round" type="submit" name="btnAgregarConsumidor" id="btnAgregarConsumidor">GUARDAR</button>
                                <button class="col l3 mb-2 btn waves-effect waves-light gradient-45deg-deep-purple-blue gradient-shadow border-round hide" type="button" name="btnActualizaConsumidor" id="btnActualizaConsumidor">MODIFICAR</button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <!--Inicio Lista Consumidores-->
                    <div class="col s12 m12 l12">
                      <div class="card animate fadeLeft" style="border-color: #651fff; border-width: 3px; border-style: double;">
                        <div class="card-title" style="padding-top:10px; text-align: center; color:black;">LABORES ASIGNADAS A LA ACTIVIDAD</div>
                        <div class="card-content" style="max-height: calc(90vh - 210px); overflow-y: scroll;">
                          <!--<table id="tablaLabores" class="display dataTable no-footer dtr-inline">-->
                          <table id="tablaLabores" class="display dataTable dtr-inline collapsed">
                            <thead>
                              <tr>
                                <th style="text-align: center;">ID</th>
                                <th style="text-align: center;">NOMBRE CORTO</th>
                                <th style="text-align: center;">DESCRIPCION</th>
                                <th style="text-align: center;">ACTIVIDAD</th>
                                <th style="text-align: center;">ESTADO</th>
                                <th style="text-align: center;">Opciones</th>
                              </tr>
                            </thead>
                            <tbody>

                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <!--Fin Lista Consumidores-->
                  </div>
                </div>
              </div>
              <!-- Inicio Nueva Labor-->
              <!--Fin Nueva Labor-->
            </div>
            <?php require_once $ruta."/layouts/right_sidebar.php"; ?>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

<script type="text/javascript" src="consumidor.js"></script>
