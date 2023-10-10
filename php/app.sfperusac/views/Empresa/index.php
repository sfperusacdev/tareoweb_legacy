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
            <div style="bottom: 24px; right: 19px;" class="fixed-action-btn direction-top">
              <a id="btnAddEmpresa" class="btn btn-floating tooltipped primary-text gradient-shadow indigo darken-3 modal-trigger" data-position="top" data-tooltip="Nueva Empresa" href="#modal1">
                <i class="material-icons">business</i>
              </a>
            </div>
            <!-- Modal Structure -->
            <div id="modal1" class="modal border-radius-6 ">
              <div class="modal-content">
                <h5 class="mt-0">Empresa</h5>
                <hr>
                <div class="row">
                  <form class="col s12">
                    <div class="input-field col s12 m4 l2">
                      <label id="inputEMPCodigo" for="EMP_Codigo">CODIGO (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="EMP_Codigo" id="EMP_Codigo" >
                    </div>
                    <div class="input-field col s12 m8 l4">
                      <label id="inputEMPRUC" for="EMP_RUC">RUC (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="EMP_RUC" id="EMP_RUC" >
                    </div>
                    <div class="input-field col s12 m12 l12">
                      <label id="inputEMPRazon_Social" for="EMP_Razon_Social">RAZON SOCIAL (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="EMP_Razon_Social" id="EMP_Razon_Social" >
                    </div>
                    <div class="input-field col s12 m4 l3">
                      <label id="inputEMPTelefono" for="EMP_Telefono">TELEFONO (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="EMP_Telefono" id="EMP_Telefono" >
                    </div>
                    <div class="input-field col s12 m8 l6">
                      <label id="inputEMPEmail" for="EMP_Email">EMAIL (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="EMP_Email" id="EMP_Email" >
                    </div>
                    <div class="input-field col s12 m12 l8">
                      <label id="inputEMPDireccion" for="EMP_Direccion">DIRECCION (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="EMP_Direccion" id="EMP_Direccion" >
                    </div>
                    <div class="input-field col s12 m6 l4">
                      <select disabled name="EMP_Activo" id="EMP_Activo">
                        <option value="1">ACTIVO</option>
                        <option value="0">INACTIVO</option>
                      </select>
                      <label>ESTADO (*)</label>
                    </div>
                    <div class="col s12" id="campoObligatorio">
                      <label>(*) Campo Obligatorio</label>
                    </div>
                  </form>
                </div>
              </div>
              <div class="modal-footer">
                <a disabled  class="waves-effect waves-light btn gradient-45deg-amber-amber z-depth-4 mr-1 mb-2 hide " type="reset" id="btnCancelEditEmpresa" name="btnCancelEditEmpresa"><i class="material-icons left">do_not_disturb_alt</i>CANCELAR</a>
                <a disabled  class="waves-effect waves-light btn gradient-45deg-amber-amber z-depth-4 mr-1 mb-2 " type="submit" id="btnCancelEmpresa" name="btnCancelEmpresa"><i class="material-icons left">do_not_disturb_alt</i>CANCELAR</a>
                <a disabled  class="waves-effect waves-light btn purple z-depth-4 mr-1 mb-2 " type="submit" id="btnAgregarEmpresa" name="btnAgregarEmpresa"><i class="material-icons left">save</i>GUARDAR</a>
                <a  class="waves-effect waves-light btn purple  z-depth-4 mr-1 mb-2 " type="button" id="btnActualizaEmpresa" name="btnActualizaEmpresa"><i class="material-icons left">save</i>GUARDAR</a>
                <a  disabled class="waves-effect waves-light btn red z-depth-4 mr-1 mb-2 " type="button" id="btnEliminarEmpresa" name="btnEliminarEmpresa"><i class="material-icons left">delete</i>ELIMINAR</a>

              
              
              
              </div>
            </div>
            <!-- Modal Structure Ends -->
            <!-- Content Area Starts -->
            <div class="content-full">
              <div class="datatable-search">
                <i class="material-icons mr-2 search-icon">search</i>
                <input type="text" placeholder="Buscar Empresa" class="app-filter" id="global_filter">
              </div>
              <div id="button-trigger" class="card card card-default scrollspy border-radius-6 fixed-width">
                <div class="card-title">
                  <div class="col s12" style="padding:5px; text-align: center; color:black;">
                    LISTA DE EMPRESAS
                  </div>
                  <!--<button class="col s12 m4 l4 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" id="btnAllBaseDatos" name="btnAllBaseDatos">LISTAR TODAS</button>
                  <button class="col s12 m4 l4 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnAllBaseDatosActiva" id="btnAllBaseDatosActiva">LISTAR ACTIVAS</button>
                  <button class="col s12 m4 l4 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnAllBaseDatosInactiva" id="btnAllBaseDatosInactiva">LISTAR INACTIVAS</button>-->
                </div>
                <div class="card-content p-0">
                  <table id="tablaEmpresas" class="display" style="width:100%; height: auto;">
                    <thead>
                      <tr>
                        <th style="text-align: center;">ID</th>
                        <th style="text-align: center;">RUC</th>
                        <th style="text-align: center;">RAZÓN SOCIAL</th>
                        <th style="text-align: center;">DIRECCIÓN</th>
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

<script type="text/javascript" src="empresa.js"></script>
