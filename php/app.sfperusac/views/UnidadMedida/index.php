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
              <a id="btnAddUnidadEquivalencia" class="btn btn-floating tooltipped primary-text gradient-shadow indigo darken-3 modal-trigger hide" data-position="top" data-tooltip="Nueva Unid. Equivalencia" href="#modal1">
                <i class="material-icons">turned_in_not</i>
              </a>
            </div>
            <!-- Sidebar Area Starts -->
            <div class="sidebar-left sidebar-fixed ">
              <div class="sidebar">
                <div class="sidebar-content">
                  <div class="sidebar-header">
                    <div class="sidebar-details">
                      <h5 class="m-1 sidebar-title">
                        <i class="material-icons app-header-icon text-top">turned_in</i>
                        Unidad de Medida
                      </h5>
                      <div class="mt-10 pt-2" id="infoTotUnidMed"></div>
                    </div>
                  </div>
                  <div id="sidebar-list" class="sidebar-menu list-group position-relative animate fadeLeft delay-1">
                    <div class="sidebar-list-padding app-sidebar sidenav" id="contact-sidenav">
                      <div class="sidebar-search animate fadeUp">
                        <div class="search-area">
                          <i class="material-icons mr-2 search-icon">search</i>
                          <input type="text" onKeyUp="this.value=this.value.toUpperCase();" placeholder="Buscar Unid. Medida" class="app-filter" id="buscar">
                        </div>
                        <div class="add-user">
                          <a id="btnAddUnidMedida" class="tooltipped waves-effect modal-trigger" data-position="top" data-tooltip="Nueva Sucursal" href="#modalUnidMed" style="color:blue;"><i class="material-icons mr-2 add-user-icon">add</i></a>
                        </div>
                      </div>
                      <div class="sidebar-content sidebar-chat" id="sidebarchat">
                        <ul class="contact-list display-grid" id="listUnidMed"></ul>
                      </div>
                    </div>
                  </div>
                  <a href="#" data-target="contact-sidenav" class="sidenav-trigger hide-on-large-only"><i class="material-icons">menu</i></a>
                </div>
              </div>
            </div>
            <!-- Sidebar Area Ends -->
            <!-- Modal Actividad -->
            <div id="modalUnidMed" class="modal border-radius-6 ">
              <div class="modal-content">
                <h5 class="mt-0">Unidad de Medida</h5>
                <hr>
                <div class="row">
                  <form class="col s12">
                    <div class="input-field col s12 m2 l2">
                      <label id="inputUNMCodigo" for="UNM_Codigo">CODIGO (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="UNM_Codigo" id="UNM_Codigo" >
                    </div>
                    <div class="input-field col s12 m7 l7">
                      <label id="inputUNMNombre" for="UNM_Nombre">NOMBRE (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="UNM_Nombre" id="UNM_Nombre" >
                    </div>
                    <div class="input-field col s12 m3 l3">
                      <label id="inputUNMSimbolo" for="UNM_Simbolo">SIMBOLO (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="UNM_Simbolo" id="UNM_Simbolo" >
                    </div>
                    <div class="input-field col s12 m12 l12">
                      <label id="inputUNMDescripcion" for="UNM_Descripcion">DESCRIPCION</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="UNM_Descripcion" id="UNM_Descripcion" >
                    </div>
                    <div class="col s12" id="campoObligatorio">
                      <label>(*) Campo Obligatorio</label>
                    </div>
                  </form>
                </div>
              </div>
              <div class="modal-footer">
                <button disabled class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-amber-amber gradient-shadow border-round hide" type="reset" id="btnCancelEditUnidadMedida" name="btnCancelEditUnidadMedida">CANCELAR</button>
                <button disabled class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-amber-amber gradient-shadow border-round" type="reset" id="btnCancelUnidadMedida" name="btnCancelUnidadMedida">CANCELAR</button>
                <button disabled class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-deep-purple-blue gradient-shadow border-round" type="submit" name="btnAgregarUnidadMedida" id="btnAgregarUnidadMedida">GUARDAR</button>
                <button class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-deep-purple-blue gradient-shadow border-round hide" type="button" name="btnActualizaUnidadMedida" id="btnActualizaUnidadMedida">MODIFICAR</button>
              </div>
            </div>
            <!-- Modal Actividad Ends -->
            <!-- Modal Structure -->
            <div id="modal1" class="modal border-radius-6 ">
              <div class="modal-content">
                <h5 class="mt-0">Unidad de Equivalencia</h5>
                <hr>
                <div class="row">
                  <form class="col s12">
                    <div class="input-field col s12 m2 l2">
                      <label id="inputUNECodigo" for="UNE_Codigo">CODIGO (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="UNE_Codigo" id="UNE_Codigo">
                    </div>
                    <div class="input-field col s12 m7 l7">
                      <label id="inputUNENombre" for="UNE_Nombre">NOMBRE (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="UNE_Nombre" id="UNE_Nombre">
                    </div>
                    <div class="input-field col s12 m3 l3">
                      <label id="inputUNESimbolo" for="UNE_Simbolo">SIMBOLO (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="UNE_Simbolo" id="UNE_Simbolo">
                    </div>
                    <div class="input-field col s12 m12 l12">
                      <label id="inputUNEDescripcion" for="UNE_Descripcion">DESCRIPCION</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="UNE_Descripcion" id="UNE_Descripcion">
                    </div>
                    <div class="col s12">
                      <label>(*) Campo Obligatorio</label>
                    </div>
                  </form>
                </div>
              </div>
              <div class="modal-footer">
                <button disabled class="col s12 m3 l3 mr-2 btn waves-effect waves-light gradient-45deg-amber-amber gradient-shadow border-round hide" type="reset" id="btnCancelEditUnidadEquivalencia" name="btnCancelEditUnidadEquivalencia">CANCELAR</button>
                <button disabled class="col s12 m3 l3 mr-2 btn modal-close waves-effect waves-light gradient-45deg-amber-amber gradient-shadow border-round" type="reset" id="btnCancelUnidadEquivalencia" name="btnCancelUnidadEquivalencia">CANCELAR</button>
                <button disabled class="col s12 m3 l3 mr-2 btn waves-effect waves-light gradient-45deg-deep-purple-blue gradient-shadow border-round" type="submit" name="btnAgregarUnidadEquivalencia" id="btnAgregarUnidadEquivalencia">GUARDAR</button>
                <button class="col s12 m3 l3 mr-2 btn waves-effect waves-light gradient-45deg-deep-purple-blue gradient-shadow border-round hide" type="button" name="btnActualizaUnidadEquivalencia" id="btnActualizaUnidadEquivalencia">MODIFICAR</button>
              </div>
            </div>
            <!-- Modal Structure Ends -->
            <!-- Content Area Starts -->
            <div class="content-area content-right ">
              <div class="app-wrapper">
                <div class="datatable-search">
                  <i class="material-icons mr-2 search-icon">search</i>
                  <input type="text" placeholder="Buscar Unidad de Equivalencia" class="app-filter" id="global_filter">
                </div>
                <div id="button-trigger" class="card card card-default scrollspy border-radius-6 fixed-width">
                  <div class="card-title">
                    <div class="col s12" style="padding:5px; text-align: center; color:black;">
                      LISTA DE UNIDADES DE EQUIVALENCIA
                    </div>
                    <!--<button class="col s12 m4 l4 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" id="btnAllConsumidor" name="btnAllConsumidor">LISTAR TODAS</button>
                    <button class="col s12 m4 l4 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnAllConsumidorActiva" id="btnAllConsumidorActiva">LISTAR ACTIVAS</button>
                    <button class="col s12 m4 l4 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnAllConsumidorInactiva" id="btnAllConsumidorInactiva">LISTAR INACTIVAS</button>-->
                  </div>
                  <div class="card-content p-0">
                    <table id="tablaUnidadEquivalenciaes" class="display" style="width:100%; height: auto;">
                      <thead>
                        <tr>
                          <th style="text-align: center;">ID</th>
                          <th style="text-align: center;">NOMBRE</th>
                          <th style="text-align: center;">SIMBOLO</th>
                          <th style="text-align: center;">DESCRIPCION</th>
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

<script type="text/javascript" src="unidadMedida.js"></script>
