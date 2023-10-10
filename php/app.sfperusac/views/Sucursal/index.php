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

    <div id="main" class="main-full">
      <div class="row">
        <div class="content-wrapper-before gradient-45deg-indigo-purple"></div>
        <div class="col s12">
          <div class="container">
            <div style="bottom: 24px; right: 19px;" class="fixed-action-btn direction-top">
              <a id="btnAddConsumidor" class="btn btn-floating tooltipped primary-text gradient-shadow indigo darken-3 modal-trigger hide" data-position="top" data-tooltip="Nuevo Consumidor" href="#modal1">
                <i class="material-icons">burst_mode</i>
              </a>
            </div>
            <!-- Sidebar Area Starts -->
            <div class="sidebar-left sidebar-fixed ">
              <div class="sidebar">
                <div class="sidebar-content">
                  <div class="sidebar-header">
                    <div class="sidebar-details">
                      <h5 class="m-1 sidebar-title">
                        <i class="material-icons app-header-icon text-top">business_center</i>
                        Sucursal
                      </h5>
                      <div class="mt-10 pt-2" id="infoTotSucu"></div>
                    </div>
                  </div>
                  <div id="sidebar-list" class="sidebar-menu list-group position-relative animate fadeLeft delay-1">
                    <div class="sidebar-list-padding app-sidebar sidenav" id="contact-sidenav">
                      <div class="sidebar-search animate fadeUp">
                        <div class="search-area">
                          <i class="material-icons mr-2 search-icon">search</i>
                          <input type="text" onKeyUp="this.value=this.value.toUpperCase();" placeholder="Buscar Sucursal" class="app-filter" id="buscar">
                        </div>
                        <div class="add-user">
                          <a id="btnAddSucursal" class="tooltipped waves-effect modal-trigger" data-position="top" data-tooltip="Nueva Sucursal" href="#modalSucu" style="color:blue;"><i class="material-icons mr-2 add-user-icon">add</i></a>
                        </div>
                      </div>
                      <div class="sidebar-content sidebar-chat" id="sidebarchat">
                        <ul class="contact-list display-grid" id="listSucu"></ul>
                      </div>
                    </div>
                  </div>
                  <a href="#" data-target="contact-sidenav" class="sidenav-trigger hide-on-large-only"><i class="material-icons">menu</i></a>
                </div>
              </div>
            </div>
            <!-- Sidebar Area Ends -->
            <!-- Modal Actividad -->
            <div id="modalSucu" class="modal border-radius-6 ">
              <div class="modal-content">
                <h5 class="mt-0">Sucursal</h5>
                <hr>
                <div class="row">
                  <form class="col s12">
                    <div class="input-field col s12 m4 l2">
                      <label id="inputSUCCodigo" for="SUC_Codigo">CODIGO (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="SUC_Codigo" id="SUC_Codigo" >
                    </div>
                    <div class="input-field col s12 m8 l7">
                      <label id="inputSUCNombre" for="SUC_Nombre">NOMBRE (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="SUC_Nombre" id="SUC_Nombre" >
                    </div>
                    <div class="input-field col s12 m4 l3">
                      <label id="inputSUCDireccion" for="SUC_Direccion">DIRECCION (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="SUC_Direccion" id="SUC_Direccion" >
                    </div>
                    <div class="input-field col s12 m8 l6">
                      <label id="inputSUCTelefono" for="SUC_Telefono">TELEFONO (*)</label>
                      <input type="number" disabled onKeyUp="this.value=this.value.toUpperCase();" name="SUC_Telefono" id="SUC_Telefono" >
                    </div>
                    <div class="input-field col s12 m12 l6">
                      <label id="inputSUCDescripcion" for="SUC_Descripcion">DESCRIPCION</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="SUC_Descripcion" id="SUC_Descripcion" >
                    </div>
                    <div class="col s12" id="campoObligatorio">
                      <label>(*) Campo Obligatorio</label>
                    </div>
                  </form>
                </div>
              </div>
              <div class="modal-footer">
                <button disabled class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-amber-amber gradient-shadow border-round hide" type="reset" id="btnCancelEditSucursal" name="btnCancelEditSucursal">CANCELAR</button>
                <button disabled class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-amber-amber gradient-shadow border-round" type="reset" id="btnCancelSucursal" name="btnCancelSucursal">CANCELAR</button>
                <button disabled class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-deep-purple-blue gradient-shadow border-round" type="submit" name="btnAgregarSucursal" id="btnAgregarSucursal">GUARDAR</button>
                <button class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-deep-purple-blue gradient-shadow border-round hide" type="button" name="btnActualizaSucursal" id="btnActualizaSucursal">MODIFICAR</button>
              </div>
            </div>
            <!-- Modal Actividad Ends -->
            <!-- Modal Structure -->
            <div id="modal1" class="modal border-radius-6 ">
              <div class="modal-content">
                <h5 class="mt-0">Consumidor</h5>
                <hr>
                <div class="row">
                  <form class="col s12">
                    <div class="input-field col s12 m4 l2">
                      <label id="inputCONCodigo" for="CON_Codigo">CODIGO (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="CON_Codigo" id="CON_Codigo" >
                    </div>
                    <div class="input-field col s12 m8 l7">
                      <label id="inputCONNombre_Corto" for="CON_Nombre_Corto">NOMBRE CORTO (*)</label>
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
                      <label id="inputCONDescripcion" for="CON_Descripcion">DESCRIPCION</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="CON_Descripcion" id="CON_Descripcion" >
                    </div>
                    <div class="col s12" id="campoObligatorio">
                      <label>(*) Campo Obligatorio</label>
                    </div>
                  </form>
                </div>
              </div>
              <div class="modal-footer">
                <button disabled class="col s12 m3 l3 mr-2 btn waves-effect waves-light gradient-45deg-amber-amber gradient-shadow border-round hide" type="reset" id="btnCancelEditConsumidor" name="btnCancelEditConsumidor">CANCELAR</button>
                <button disabled class="col s12 m3 l3 mr-2 btn modal-close waves-effect waves-light gradient-45deg-amber-amber gradient-shadow border-round" type="reset" id="btnCancelConsumidor" name="btnCancelConsumidor">CANCELAR</button>
                <button disabled class="col s12 m3 l3 mr-2 btn waves-effect waves-light gradient-45deg-deep-purple-blue gradient-shadow border-round" type="submit" name="btnAgregarConsumidor" id="btnAgregarConsumidor">GUARDAR</button>
                <button class="col s12 m3 l3 mr-2 btn waves-effect waves-light gradient-45deg-deep-purple-blue gradient-shadow border-round hide" type="button" name="btnActualizaConsumidor" id="btnActualizaConsumidor">MODIFICAR</button>
              </div>
            </div>
            <!-- Modal Structure Ends -->
            <!-- Content Area Starts -->
            <div class="content-area content-right ">
              <div class="app-wrapper">
                <div class="datatable-search">
                  <i class="material-icons mr-2 search-icon">search</i>
                  <input type="text" placeholder="Buscar Consumidor" class="app-filter" id="global_filter">
                </div>
                <div id="button-trigger" class="card card card-default scrollspy border-radius-6 fixed-width">
                  <div class="card-title">
                    <div class="col s12" style="padding:5px; text-align: center; color:black;">
                      LISTA DE CONSUMIDORES
                    </div>
                    <button class="col s12 m4 l4 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" id="btnAllConsumidor" name="btnAllConsumidor">LISTAR TODAS</button>
                    <button class="col s12 m4 l4 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnAllConsumidorActiva" id="btnAllConsumidorActiva">LISTAR ACTIVAS</button>
                    <button class="col s12 m4 l4 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnAllConsumidorInactiva" id="btnAllConsumidorInactiva">LISTAR INACTIVAS</button>
                  </div>
                  <div class="card-content p-0">
                    <table id="tablaConsumidores" class="display" style="width:100%; height: auto;">
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
            </div>
            <!-- Content Area Ends -->
            <?php require_once $ruta."/layouts/right_sidebar.php"; ?>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

<script type="text/javascript" src="sucursal.js"></script>
