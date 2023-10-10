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
                <h5 class="breadcrumbs-title mt-0 mb-0">Empresa</h5>
                <ol class="breadcrumbs mb-0">
                  <li class="breadcrumb-item"><a href="../inicio/">Inicio</a>
                  </li>
                  </li>
                  <li class="breadcrumb-item active">Empresa
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
                    <div class="col s12 m6 l6">
                      <select name="EMP_Id" id="EMP_Id" onchange="empresaSelected()"></select>
                    </div>
                    <div class="col s12 m6 l6">
                      <select disabled name="SUC_Id" id="SUC_Id" onchange="sucursalSelected()">
                        <option value="º">--Seleccione Sucursal--</option>
                      </select>
                    </div>
                    <!--<div class="col s6 m6 l3">
                      <button class="col s12 mb-2 btn waves-effect waves-light green accent-3 gradient-shadow border-round" type="button" id="btnNewAct" name="btnNewAct"> NUEVA ACTIVIDAD</button>
                    </div>
                    <div class="col s6 m6 l3">
                      <a><button class="col s12 mb-2 btn waves-effect waves-light blue gradient-shadow border-round" type="button" id="btnNewLab" name="btnNewLab"> ASIGNAR LABOR</button></a>
                    </div>-->
                    <div class="col s12 m12 l12">
                      <ul class="collapsible popout">
                        <li id="NewEmpresa" style="border-color: #00e676; border-width: 3px; border-style: double;">
                          <div class="collapsible-header waves-effect waves-light gradient-shadow" style="text-align: center; color:black;">
                            <div class="col s11 m11 l11" style="color:black;">EMPRESA</div>
                            <i class="col s1 m1 l1 material-icons">expand_more</i>
                          </div>
                          <div class="collapsible-body">
                            <div class="row">
                              <div class="input-field col s12 m4 l2">
                                <label for="EMP_Codigo">CODIGO (*)</label>
                                <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="EMP_Codigo" id="EMP_Codigo" >
                              </div>
                              <div class="input-field col s12 m8 l7">
                                <label for="EMP_Razon_Social">RAZON SOCIAL (*)</label>
                                <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="EMP_Razon_Social" id="EMP_Razon_Social" >
                              </div>
                              <div class="input-field col s12 m4 l3">
                                <label for="EMP_Telefono">TELEFONO (*)</label>
                                <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="EMP_Telefono" id="EMP_Telefono" >
                              </div>
                              <div class="input-field col s12 m8 l6">
                                <label for="EMP_Email">EMAIL (*)</label>
                                <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="EMP_Email" id="EMP_Email" >
                              </div>
                              <div class="input-field col s12 m12 l6">
                                <label for="EMP_Direccion">DIRECCION (*)</label>
                                <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="EMP_Direccion" id="EMP_Direccion" >
                              </div>
                              <div class="col s12" id="campoObligatorio">
                                <label>(*) Campo Obligatorio</label>
                              </div>
                              <div class="col s12 m12 l12" id="btnsEmpresa">
                                <button class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-green-teal gradient-shadow border-round" type="reset" id="btnNewEmpresa" name="btnNewEmpresa">NUEVO</button>
                                <button disabled class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-amber-amber gradient-shadow border-round hide" type="reset" id="btnCancelEditEmpresa" name="btnCancelEditEmpresa">CANCELAR</button>
                                <button disabled class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-amber-amber gradient-shadow border-round" type="reset" id="btnCancelEmpresa" name="btnCancelEmpresa">CANCELAR</button>
                                <button disabled class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-cyan-cyan gradient-shadow border-round" type="button" id="btnEditEmpresa" name="btnEditEmpresa">EDITAR</button>
                                <button disabled class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-deep-purple-blue gradient-shadow border-round" type="submit" name="btnAgregarEmpresa" id="btnAgregarEmpresa">GUARDAR</button>
                                <button class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-deep-purple-blue gradient-shadow border-round hide" type="button" name="btnActualizaEmpresa" id="btnActualizaEmpresa">MODIFICAR</button>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li id="newSucursal" style="border-color: #2196f3; border-width: 3px; border-style: double; padding-top:10px;">
                          <div class="collapsible-header waves-effect waves-light gradient-shadow" style="padding-top:10px; text-align: center; color:black;">
                            <div class="col s11 m11 l11" style="color:black;">SUCURSAL</div>
                            <i class="col s1 m1 l1 material-icons">expand_more</i>
                          </div>
                          <div class="collapsible-body">
                            <div class="row">
                              <div class="input-field col s12 m4 l2">
                                <label for="SUC_Codigo">CODIGO (*)</label>
                                <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="SUC_Codigo" id="SUC_Codigo" >
                              </div>
                              <div class="input-field col s12 m8 l7">
                                <label for="SUC_Nombre">NOMBRE (*)</label>
                                <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="SUC_Nombre" id="SUC_Nombre" >
                              </div>
                              <div class="input-field col s12 m4 l3">
                                <label for="SUC_Direccion">DIRECCION (*)</label>
                                <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="SUC_Direccion" id="SUC_Direccion" >
                              </div>
                              <div class="input-field col s12 m8 l6">
                                <label for="SUC_Telefono">TELEFONO (*)</label>
                                <input type="number" disabled onKeyUp="this.value=this.value.toUpperCase();" name="SUC_Telefono" id="SUC_Telefono" >
                              </div>
                              <div class="input-field col s12 m12 l6">
                                <label for="SUC_Descripcion">DESCRIPCION</label>
                                <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="SUC_Descripcion" id="SUC_Descripcion" >
                              </div>
                              <div class="col s12" id="campoObligatorio">
                                <label>(*) Campo Obligatorio</label>
                              </div>
                              <div class="col s12 m12 l12" id="btnsSucursal">
                                <button class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-green-teal gradient-shadow border-round" type="reset" id="btnNewSucursal" name="btnNewSucursal">NUEVO</button>
                                <button disabled class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-amber-amber gradient-shadow border-round hide" type="reset" id="btnCancelEditSucursal" name="btnCancelEditSucursal">CANCELAR</button>
                                <button disabled class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-amber-amber gradient-shadow border-round" type="reset" id="btnCancelSucursal" name="btnCancelSucursal">CANCELAR</button>
                                <button disabled class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-cyan-cyan gradient-shadow border-round" type="button" id="btnEditSucursal" name="btnEditSucursal">EDITAR</button>
                                <button disabled class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-deep-purple-blue gradient-shadow border-round" type="submit" name="btnAgregarSucursal" id="btnAgregarSucursal">GUARDAR</button>
                                <button class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-deep-purple-blue gradient-shadow border-round hide" type="button" name="btnActualizaSucursal" id="btnActualizaSucursal">MODIFICAR</button>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li id="newConsumidor" style="border-color: #2196f3; border-width: 3px; border-style: double; padding-top:10px;">
                          <div class="collapsible-header waves-effect waves-light gradient-shadow" style="padding-top:10px; text-align: center; color:black;">
                            <div class="col s11 m11 l11" style="color:black;">CONSUMIDOR</div>
                            <i class="col s1 m1 l1 material-icons">expand_more</i>
                          </div>
                          <div class="collapsible-body" id="bodyNewConsumidor">
                            <div class="row">
                              <div class="input-field col s12 m4 l2">
                                <label for="CON_Codigo">CODIGO (*)</label>
                                <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="CON_Codigo" id="CON_Codigo" >
                              </div>
                              <div class="input-field col s12 m8 l7">
                                <label for="CON_Nombre_Corto">NOMBRE CORTO (*)</label>
                                <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="CON_Nombre_Corto" id="CON_Nombre_Corto" >
                              </div>
                              <div class="col s12 m4 l3">
                                <label>FECHA BAJA (*)</label>
                                <input type="date" disabled onKeyUp="this.value=this.value.toUpperCase();" name="CON_Fecha_Baja" id="CON_Fecha_Baja" >
                              </div>
                              <div class="input-field col s12 m8 l6">
                                <select disabled name="CON_Activo" id="CON_Activo">
                                  <option value="1">ACTIVO</option>
                                  <option value="0">INACTIVO</option>
                                </select>
                                <label>ESTADO (*)</label>
                              </div>
                              <div class="input-field col s12 m12 l6">
                                <label for="CON_Descripcion">DESCRIPCION</label>
                                <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="CON_Descripcion" id="CON_Descripcion" >
                              </div>
                              <div class="col s12" id="campoObligatorio">
                                <label>(*) Campo Obligatorio</label>
                              </div>
                              <div class="col s12 m12 l12" id="btnsConsumidor">
                                <button class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-green-teal gradient-shadow border-round" type="reset" id="btnNewConsumidor" name="btnNewConsumidor">NUEVO</button>
                                <button disabled class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-amber-amber gradient-shadow border-round hide" type="reset" id="btnCancelEditConsumidor" name="btnCancelEditConsumidor">CANCELAR</button>
                                <button disabled class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-amber-amber gradient-shadow border-round" type="reset" id="btnCancelConsumidor" name="btnCancelConsumidor">CANCELAR</button>
                                <!--<button disabled class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-cyan-cyan gradient-shadow border-round" type="button" id="btnEditConsumidor" name="btnEditConsumidor">EDITAR</button>-->
                                <button disabled class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-deep-purple-blue gradient-shadow border-round" type="submit" name="btnAgregarConsumidor" id="btnAgregarConsumidor">GUARDAR</button>
                                <button class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-deep-purple-blue gradient-shadow border-round hide" type="button" name="btnActualizaConsumidor" id="btnActualizaConsumidor">MODIFICAR</button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <!--Inicio Lista Labores-->
                    <div class="col s12 m12 l12">
                      <div class="card animate fadeLeft" style="border-color: #651fff; border-width: 3px; border-style: double;">
                        <div class="card-title" style="padding-top:10px; text-align: center; color:black;">LISTA DE CONSUMIDORES POR EMPRESA Y SUCURSAL</div>
                        <div class="card-content" style="max-height: calc(90vh - 210px);"><!--overflow-y: scroll;-->
                          <!--<table id="tablaLabores" class="display dataTable no-footer dtr-inline">-->
                          <table id="tablaConsumidores" class="display dataTable dtr-inline collapsed">
                            <thead>
                              <tr>
                                <th style="text-align: center;">ID</th>
                                <th style="text-align: center;">NOMBRE CORTO</th>
                                <th style="text-align: center;">DESCRIPCION</th>
                                <th style="text-align: center;">FECHA BAJA</th>
                                <th style="text-align: center;">ESTADO</th>
                                <th style="text-align: center;">OPCIONES</th>
                              </tr>
                            </thead>
                            <tbody>

                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <!--Fin Lista Labores-->
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

<script type="text/javascript" src="empresa.js"></script>
