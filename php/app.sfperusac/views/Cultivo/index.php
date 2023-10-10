<?php
$ruta = "../..";
require_once($ruta."/controller/login.php");
$login = new Login();

if ($login->isUserLoggedIn() == false) {

   header("location: ".$ruta."/");

} else {


?>
<!DOCTYPE html>
<html class="loading"lang="en" data-textdirection="ltr">
  <head>
    <meta charset="utf-8">
    <title>SF PERU S.A.C</title>
    <?php include $ruta.'/layouts/dependencias1.php';?>
  </head>
  <body class="vertical-layout vertical-menu-collapsible page-header-dark vertical-modern-menu 2-columns  app-page" data-open="click" data-menu="vertical-modern-menu" data-col="2-columns">
    <?php include $ruta.'/layouts/inicio.php';?>
    <div id="main" class="main-full">
      <div class="row">
        <div class="content-wrapper-before gradient-45deg-indigo-purple"></div>
        <div class="col s12">
          <div class="container">
            <div style="bottom: 24px; right: 19px;" class="fixed-action-btn direction-top">
              <a id="btnAddVariedad" class="btn btn-floating tooltipped primary-text gradient-shadow indigo darken-3 modal-trigger hide" data-position="top" data-tooltip="Nueva Variedad" href="#modal1">
                <i class="material-icons">local_florist</i>
              </a>
            </div>
            <!-- Sidebar Area Starts -->
            <div class="sidebar-left sidebar-fixed ">
              <div class="sidebar">
                <div class="sidebar-content">
                  <div class="sidebar-header">
                    <div class="sidebar-details">
                      <h5 class="m-1 sidebar-title">
                        <i class="material-icons app-header-icon text-top">nature</i>
                        Cultivo
                      </h5>
                      <div class="mt-10 pt-2" id="infoTotCult"></div>
                    </div>
                  </div>
                  <div id="sidebar-list" class="sidebar-menu list-group position-relative animate fadeLeft delay-1">
                    <div class="sidebar-list-padding app-sidebar sidenav" id="contact-sidenav">
                      <div class="sidebar-search animate fadeUp">
                        <div class="search-area">
                          <i class="material-icons mr-2 search-icon">search</i>
                          <input type="text" onKeyUp="this.value=this.value.toUpperCase();" placeholder="Buscar Cultivo" class="app-filter" id="buscar">
                        </div>
                        <div class="add-user">
                          <a id="btnAddCultivo" class="tooltipped waves-effect modal-trigger mb-6 btn-floating waves-light purple lightrn-1" data-position="top" data-tooltip="Nuevo Cultivo" href="#modalCult"><i class="material-icons">add</i></a>
                        </div>
                      </div>
                      <div class="sidebar-content " >
                        <ul class="contact-list display-grid" id="listCult"></ul>
                      </div>
                    </div>
                  </div>
                  <a href="#" data-target="contact-sidenav" class="sidenav-trigger hide-on-large-only"><i class="material-icons">menu</i></a>
                </div>
              </div>
            </div>
            <!-- Sidebar Area Ends -->
            <!-- Modal Actividad -->
            <div id="modalCult" class="modal border-radius-6 ">
              <div class="modal-content">
                <h5 class="mt-0">Cultivo</h5>
                <hr>
                <div class="row">
                  <form class="col s12">
                    <div class="input-field col s12 m6 l6">
                      <label id="inputCulCodigo" for="CUL_Codigo">CODIGO (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="CUL_Codigo" id="CUL_Codigo" onkeydown="return tab_btn(event,'CUL_Nombre_Corto');" autofocus >
                    </div>
                    <div class="input-field col s12 m6 l6">
                      <label id="inputCulNombre" for="CUL_Nombre_Corto">NOMBRE CORTO(*)</label>
                      <input type="text"  disabled onKeyUp="this.value=this.value.toUpperCase();" name="CUL_Nombre_Corto" id="CUL_Nombre_Corto" onkeydown="return tab_btn(event,'CUL_Descripcion');">
                    </div>
                    
                    <div class="input-field col s12 m6 l8">
                      <label id="inputCulDescripcion" for="CUL_Descripcion">DESCRIPCION</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="CUL_Descripcion" id="CUL_Descripcion" onkeydown="return tab_btn(event,'CUL_Codigo');" >
                    </div>
                    <div class="input-field col s12 m6 l4">
                      <select disabled name="CUL_Activo" id="CUL_Activo" onkeydown="return tab_btn(event,'CUL_Codigo');" >
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
            
                <a disabled  class="waves-effect waves-light btn gradient-45deg-amber-amber z-depth-4 mr-1 mb-2 hide " type="reset" id="btnCancelEditCultivo" name="btnCancelEditCultivo"><i class="material-icons left">do_not_disturb_alt</i>CANCELAR</a>
                <a disabled  class="waves-effect waves-light btn gradient-45deg-amber-amber z-depth-4 mr-1 mb-2 " type="submit" id="btnCancelCultivo" name="btnCancelCultivo"><i class="material-icons left">do_not_disturb_alt</i>CANCELAR</a>
                <a disabled  class="waves-effect waves-light btn purple z-depth-4 mr-1 mb-2 " type="submit" id="btnAgregarCultivo" name="btnAgregarCultivo"><i class="material-icons left">save</i>GUARDAR</a>
                <a  class="waves-effect waves-light btn purple  z-depth-4 mr-1 mb-2 " type="button" id="btnActualizaCultivo" name="btnActualizaCultivo"><i class="material-icons left">save</i>GUARDAR</a>
                <a  disabled class="waves-effect waves-light btn red z-depth-4 mr-1 mb-2 " type="button" id="btnEliminarCultivo" name="btnEliminarCultivo"><i class="material-icons left">delete</i>ELIMINAR</a>

              
              
              </div>
             
            </div>
            <!-- Modal Actividad Ends -->
            <!-- Modal Structure -->
            <div id="modal1" class="modal border-radius-6 ">
              <div class="modal-content">
                <h5 class="mt-0">Labor</h5>
                <hr>
                <div class="row">
                  <form class="col s12">
                    <div class="input-field col s12 m6 l6">
                      <label id="inputCUVCodigo" for="CUV_Codigo">CODIGO (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="CUV_Codigo" id="CUV_Codigo" onkeydown="return tab_btn(event,'CUV_Nombre_Corto');" autofocus >
                    </div>
                    <div class="input-field col s12 m6 l6">
                      <label id="inputCUVNombre" for="CUV_Nombre_Corto">NOMBRE CORTO (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="CUV_Nombre_Corto" id="CUV_Nombre_Corto" onkeydown="return tab_btn(event,'CUV_Descripcion');" >
                    </div>
                    <div class="input-field col s12 m6 l8">
                      <label id="inputCUVDescripcion" for="CUV_Descripcion">DESCRIPCION</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="CUV_Descripcion" id="CUV_Descripcion" onkeydown="return tab_btn(event,'CUV_Codigo');">
                    </div>
                    <div class="input-field col s12 m6 l4">
                      <select disabled name="CUL_Activo" id="CUV_Activo" onkeydown="return tab_btn(event,'CUV_Codigo');" >
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
                <a disabled  class="waves-effect waves-light btn gradient-45deg-amber-amber z-depth-4 mr-1 mb-2 hide " type="reset" id="btnCancelEditCultivoVariedad" name="btnCancelEditCultivoVariedad"><i class="material-icons left">do_not_disturb_alt</i>CANCELAR</a>
                <a disabled  class="waves-effect waves-light btn gradient-45deg-amber-amber z-depth-4 mr-1 mb-2 " type="submit" id="btnCancelCultivoVariedad" name="btnCancelCultivoVariedad"><i class="material-icons left">do_not_disturb_alt</i>CANCELAR</a>
                <a disabled  class="waves-effect waves-light btn purple z-depth-4 mr-1 mb-2 " type="submit" id="btnAgregarCultivoVariedad" name="btnAgregarCultivoVariedad"><i class="material-icons left">save</i>GUARDAR</a>
                <a  class="waves-effect waves-light btn purple  z-depth-4 mr-1 mb-2 " type="button" id="btnActualizaCultivoVariedad" name="btnActualizaCultivoVariedad"><i class="material-icons left">save</i>GUARDAR</a>
                <a  disabled class="waves-effect waves-light btn red z-depth-4 mr-1 mb-2 " type="button" id="btnEliminarCultivoVariedad" name="btnEliminarCultivoVariedad"><i class="material-icons left">delete</i>ELIMINAR</a>

              </div>
            </div>
            <!-- Modal Structure Ends -->
            <!-- Content Area Starts -->
            <div class="content-area content-right ">
              <div class="app-wrapper">
                <div class="datatable-search">
                  <i class="material-icons mr-2 search-icon">search</i>
                  <input type="text" placeholder="Buscar Variedad" class="app-filter" id="global_filter">
                </div>
                <div id="button-trigger" class="card card card-default scrollspy border-radius-6 fixed-width">
                  <div class="card-title">
                    <div class="col s12" style="padding:5px; text-align: center; color:black;">
                      LISTA DE VARIEDADES
                    </div>
                    <button class="col s12 m4 l4 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" id="btnAllVariedad" name="btnAllVariedad">LISTAR TODAS</button>
                    <button class="col s12 m4 l4 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnAllVariedadActiva" id="btnAllVariedadActiva">LISTAR ACTIVAS</button>
                    <button class="col s12 m4 l4 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnAllVariedadInactiva" id="btnAllVariedadInactiva">LISTAR INACTIVAS</button>
                  
                  </div>
                  <div class="card-content p-0">
                  <div class="row">
                    <div class="col s12">
                    <table id="tablaCultivoVariedades" class="display" style="width:100%; height: auto;">
                      <thead>
                        <tr>
                          <th style="text-align: center;width:8%;">FILA</th>
                          <th style="text-align: center;">ID</th>
                          <th style="text-align: center;">NOMBRE CORTO</th>
                          <th style="text-align: center;">DESCRIPCION</th>
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
              </div>
            </div>
            <!-- Content Area Ends -->            
          </div>
        </div>
      </div>
      <?php // require_once $ruta."/layouts/right_sidebar.php"; ?>
    </div>
  </body>
</html>

<script type="text/javascript" src="cultivo.js"></script>
<?php }  ?>