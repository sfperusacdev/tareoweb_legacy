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
        <div class="breadcrumbs-dark pb-0 " id="breadcrumbs-wrapper">
          <div class="container">
            <div class="row">
              <div class="col s10 m6 l6">
                <h5 class="breadcrumbs-title mt-0 mb-0">Base de Datos</h5>
                <ol class="breadcrumbs mb-0">
                  <li class="breadcrumb-item"><a href="../inicio/">Inicio</a></li>
                  <li class="breadcrumb-item active">Base de Datos</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div class="col s12">
          <div class="container">
            <div style="bottom: 24px; right: 19px;" class="fixed-action-btn direction-top">
              <a id="btnAddBaseDatos" class="btn btn-floating tooltipped primary-text gradient-shadow indigo darken-3 modal-trigger" data-position="top" data-tooltip="Nueva Base de Datos" href="#modal1">
                <i class="material-icons">storage</i>
              </a>
            </div>
            <!-- Modal Structure -->
            <div id="modal1" class="modal border-radius-6 ">
              <div class="modal-content">
                <h5 class="mt-0">Base de Datos</h5>
                <hr>
                <div class="row">
                  <form class="col s12">
                    <div class="input-field col s12 m2 l2">
                      <label id="inputBADCodigo" for="BAD_Codigo">CODIGO (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="BAD_Codigo" id="BAD_Codigo" >
                    </div>
                    <div class="input-field col s12 m5 l5">
                      <label id="inputBADNombre" for="BAD_Nombre">NOMBRE (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="BAD_Nombre" id="BAD_Nombre" >
                    </div>
                    <div class="input-field col s12 m5 l5">
                      <label id="inputBADServidor" for="BAD_Servidor">SERVIDOR (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="BAD_Servidor" id="BAD_Servidor" >
                    </div>
                    <div class="input-field col s12 m4 l4">
                      <label id="inputBADAdmin" for="BAD_Admin">ADMIN (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="BAD_Admin" id="BAD_Admin" >
                    </div>
                    <div class="input-field col s12 m4 l4">
                      <select disabled name="BAD_Estado" id="BAD_Estado">
                        <option value="1">ACTIVO</option>
                        <option value="0">INACTIVO</option>
                      </select>
                      <label>ESTADO (*)</label>
                    </div>
                    <div class="input-field col s12 m4 l4">
                      <select disabled name="BAD_Permisos" id="BAD_Permisos">
                        <option value="1">SI</option>
                        <option value="0">NO</option>
                      </select>
                      <label>PERMISOS (*)</label>
                    </div>
                    <div class="input-field col s12 m6 l6">
                      <label id="inputBADConexion" for="BAD_Conexion">CONEXIÓN (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="BAD_Conexion" id="BAD_Conexion" >
                    </div>
                    <div class="input-field col s12 m6 l6">
                      <label id="inputBADDescripcion" for="BAD_Descripcion">DESCRIPCION</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="BAD_Descripcion" id="BAD_Descripcion" >
                    </div>
                    <div class="col s12" id="campoObligatorio">
                      <label>(*) Campo Obligatorio</label>
                    </div>
                  </form>
                </div>
              </div>
              <div class="modal-footer">
                <button disabled class="col s12 m3 l3 mr-2 btn waves-effect waves-light gradient-45deg-amber-amber gradient-shadow border-round hide" type="reset" id="btnCancelEditBaseDatos" name="btnCancelEditBaseDatos">CANCELAR</button>
                <button disabled class="col s12 m3 l3 mr-2 btn modal-close waves-effect waves-light gradient-45deg-amber-amber gradient-shadow border-round" type="reset" id="btnCancelBaseDatos" name="btnCancelBaseDatos">CANCELAR</button>
                <button disabled class="col s12 m3 l3 mr-2 btn waves-effect waves-light gradient-45deg-deep-purple-blue gradient-shadow border-round" type="submit" name="btnAgregarBaseDatos" id="btnAgregarBaseDatos">GUARDAR</button>
                <button class="col s12 m3 l3 mr-2 btn waves-effect waves-light gradient-45deg-deep-purple-blue gradient-shadow border-round hide" type="button" name="btnActualizaBaseDatos" id="btnActualizaBaseDatos">MODIFICAR</button>
              </div>
            </div>
            <!-- Modal Structure Ends -->
            <!-- Content Area Starts -->
            <div class="content-full">
              <div class="datatable-search">
                <i class="material-icons mr-2 search-icon">search</i>
                <input type="text" placeholder="Buscar Base de Datos" class="app-filter" id="global_filter">
              </div>
              <div id="button-trigger" class="card card card-default scrollspy border-radius-6 fixed-width">
                <div class="card-title">
                  <div class="col s12" style="padding:5px; text-align: center; color:black;">
                    LISTA DE BASES DE DATOS
                  </div>
                  <button class="col s12 m4 l4 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" id="btnAllBaseDatos" name="btnAllBaseDatos">LISTAR TODAS</button>
                  <button class="col s12 m4 l4 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnAllBaseDatosActiva" id="btnAllBaseDatosActiva">LISTAR ACTIVAS</button>
                  <button class="col s12 m4 l4 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnAllBaseDatosInactiva" id="btnAllBaseDatosInactiva">LISTAR INACTIVAS</button>
                </div>
                <div class="card-content p-0">
                  <table id="tablaBasesDatos" class="display" style="width:100%; height: auto;">
                    <thead>
                      <tr>
                        <th style="text-align: center;">ID</th>
                        <th style="text-align: center;">NOMBRE</th>
                        <th style="text-align: center;">SERVIDOR</th>
                        <th style="text-align: center;">ADMIN</th>
                        <th style="text-align: center;">CONEXIÓN</th>
                        <th style="text-align: center;">PERMISOS</th>
                        <th style="text-align: center;">ESTADO</th>
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
            <!-- Content Area Ends -->
            <?php require_once $ruta."/layouts/right_sidebar.php"; ?>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

<script type="text/javascript" src="baseDatos.js"></script>
