<?php
$ruta = "../..";

require_once($ruta."/controller/Login.php");
$login = new Login();

if ($login->isUserLoggedIn() == false) {

   header("location: ".$ruta."/");

} else {
   
    ?>


<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>SF PERU S.A.C</title>
    <?php include $ruta.'/layouts/dependencias1.php';?>
  </head>
  <?php include $ruta.'/layouts/inicio.php';?>
  <body class="vertical-layout vertical-menu-collapsible page-header-dark vertical-modern-menu 2-columns app-page" data-open="click" data-menu="vertical-modern-menu" data-col="2-columns">

    <div id="main" class="main-full">
      <div class="row">
        <div class="content-wrapper-before gradient-45deg-indigo-purple"></div>
        <div class="col s12">
          <div class="container">
            <div style="bottom: 24px; right: 19px;" class="fixed-action-btn direction-top">
              <a id="btnAddLabor" class="btn-floating btn-large gradient-45deg-light-blue-cyan gradient-shadow modal-trigger hide" data-position="top" data-tooltip="Nueva Labor" href="#modal1">
                <i class="material-icons">nature_people</i>
              </a>
            </div>
            <!-- Sidebar Area Starts -->
            <div class="sidebar-left sidebar-fixed ">
              <div class="sidebar">
                <div class="sidebar-content">
                  <div class="sidebar-header">
                    <div class="sidebar-details">
                      <h5 class="m-1 sidebar-title">
                        <i class="material-icons app-header-icon text-top">content_paste</i>
                        Actividad
                      </h5>
                      <div class="mt-10 pt-2" id="infoTotActi"></div>
                    </div>
                  </div>
                  <div id="sidebar-list" class="sidebar-menu list-group position-relative animate fadeLeft delay-1">
                    <div class="sidebar-list-padding app-sidebar sidenav" id="contact-sidenav">
                      <div class="sidebar-search animate fadeUp">
                        <div class="search-area">
                          <i class="material-icons mr-2 search-icon">search</i>
                          <input type="text" onKeyUp="this.value=this.value.toUpperCase();" placeholder="Buscar Actividad" class="app-filter" id="buscar">
                        </div>
                        <div class="add-user">
                          <a id="btnAddActividad" class="tooltipped waves-effect modal-trigger mb-6 btn-floating waves-light purple lightrn-1" data-position="top" data-tooltip="Nueva Actividad" href="#modalActi" ><i class="material-icons">add</i></a>
                        </div>
                      </div>
                      <div class="sidebar-content">
                        <ul class="contact-list display-grid" id="listActi"></ul>
                      </div>
                    </div>
                  </div>
                  <a href="#" data-target="contact-sidenav" class="sidenav-trigger hide-on-large-only"><i class="material-icons">menu</i></a>
                </div>
              </div>
            </div>
            <!-- Sidebar Area Ends -->
            <!-- Modal Actividad -->
            <div id="modalActi" class="modal border-radius-6 ">
              <div class="modal-content">
                <h5 class="mt-0">Actividad</h5>
                <hr>
                <div class="row">
                  <form class="col s12">
                    <div class="input-field col s12 m6 l6">
                      <label id="inputActCodigo" for="ACT_Codigo">CODIGO (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="ACT_Codigo" id="ACT_Codigo" onkeydown="return tab_btn(event,'ACT_Nombre_Corto');" autofocus>
                    </div>
                    <div class="input-field col s12 m6 l6">
                      <label id="inputActNombre" for="ACT_Nombre_Corto">NOMBRE CORTO (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="ACT_Nombre_Corto" id="ACT_Nombre_Corto" onkeydown="return tab_btn(event,'ACT_Descripcion');" >
                    </div>
                    <div class="input-field col s12 m6 l6 ">
                      <select disabled name="ACT_X_Rendimiento" id="ACT_X_Rendimiento">
                        <option value="S">POR DESTAJO</option>
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
                      <label id="inputActDescripcion" for="ACT_Descripcion">DESCRIPCION</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="ACT_Descripcion" id="ACT_Descripcion" onkeydown="return tab_btn(event,'ACT_Codigo');" >
                    </div>
                    <div class="col s12" id="campoObligatorio">
                      <label>(*) Campo Obligatorio</label>
                    </div>
                  </form>
                </div>
              </div>
              <div class="modal-footer">
          
                <a disabled  class="waves-effect waves-light btn gradient-45deg-amber-amber z-depth-4 mr-1 mb-2 hide " type="reset" id="btnCancelEditActividad" name="btnCancelEditActividad"><i class="material-icons left">do_not_disturb_alt</i>CANCELAR</a>
                <a disabled  class="waves-effect waves-light btn gradient-45deg-amber-amber z-depth-4 mr-1 mb-2 " type="submit" id="btnCancelActividad" name="btnCancelActividad"><i class="material-icons left">do_not_disturb_alt</i>CANCELAR</a>
                <a disabled  class="waves-effect waves-light btn purple z-depth-4 mr-1 mb-2 " type="submit" id="btnAgregarActividad" name="btnAgregarActividad"><i class="material-icons left">save</i>GUARDAR</a>
                <a  class="waves-effect waves-light btn purple  z-depth-4 mr-1 mb-2 " type="button" id="btnActualizaActividad" name="btnActualizaActividad"><i class="material-icons left">save</i>GUARDAR</a>
                <a  disabled class="waves-effect waves-light btn red z-depth-4 mr-1 mb-2 " type="button" id="btnEliminarActividad" name="btnEliminarActividad"><i class="material-icons left">delete</i>ELIMINAR</a>

              
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
                        <label id="inputCodigo" for="LAB_Codigo">CODIGO (*)</label>
                        <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="LAB_Codigo" id="LAB_Codigo" >
                      </div>
                      <div class="input-field col s12 m6 l6">
                        <label id="inputNombre" for="LAB_Nombre_Corto">NOMBRE CORTO (*)</label>
                        <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="LAB_Nombre_Corto" id="LAB_Nombre_Corto">
                      </div>
                      <div class="input-field col s12 m6 l6">
                        <select disabled name="LAB_Activo" id="LAB_Activo">
                          <option value="1">ACTIVO</option>
                          <option value="0">INACTIVO</option>
                        </select>
                        <label>ESTADO (*)</label>
                      </div>
                      <div class="input-field col s12 m6 l6">
                        <label id="inputDescripcion" for="LAB_Descripcion">DESCRIPCION</label>
                        <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="LAB_Descripcion" id="LAB_Descripcion">
                      </div>
                      <div class="col s12">
                        <label>(*) Campo Obligatorio</label>
                      </div>
                  </form>
                </div>
              </div>
              <div class="modal-footer">
                 <a disabled  class="waves-effect waves-light btn gradient-45deg-amber-amber z-depth-4 mr-1 mb-2 " type="submit" id="btnCancelEditLabor" name="btnCancelEditLabor"><i class="material-icons left">do_not_disturb_alt</i>CANCELAR</a>
                 <a disabled  class="waves-effect waves-light btn gradient-45deg-amber-amber z-depth-4 mr-1 mb-2 " type="submit" id="btnCancelLabor" name="btnCancelLabor"><i class="material-icons left">do_not_disturb_alt</i>CANCELAR</a>
                 <a  class="waves-effect waves-light btn purple  z-depth-4 mr-1 mb-2 " type="button" id="btnAgregarLabor" name="btnAgregarLabor"><i class="material-icons left">save</i>GUARDAR</a>
                 <a  class="waves-effect waves-light btn purple  z-depth-4 mr-1 mb-2 " type="button" id="btnActualizaLabor" name="btnActualizaLabor"><i class="material-icons left">save</i>GUARDAR</a>
                 <a  disabled class="waves-effect waves-light btn red z-depth-4 mr-1 mb-2 " type="button" id="btnEliminarLabor" name="btnEliminarLabor"><i class="material-icons left">delete</i>ELIMINAR</a>
              </div>
            </div>
            <!-- Modal Structure Ends -->
            <!-- Content Area Starts -->
            <div class="content-area content-right ">
              <div class="app-wrapper">
                <div class="datatable-search">
                  <i class="material-icons mr-2 search-icon">search</i>
                  <input type="text" placeholder="Buscar Labor" class="app-filter" id="global_filter">
                </div>
                <div id="button-trigger" class="card card card-default scrollspy border-radius-6 fixed-width">
                  <div class="card-title">
                    <div class="col s12" style="padding:5px; text-align: center; color:black;">
                      LISTA DE LABORES
                    </div>
                    <button class="col s12 m4 l4 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" id="btnAllLabor" name="btnAllLabor">LISTAR TODAS</button>
                    <button class="col s12 m4 l4 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnAllLaborActiva" id="btnAllLaborActiva">LISTAR ACTIVAS</button>
                    <button class="col s12 m4 l4 mr-0 btn waves-effect waves-light white" style="color:black;" type="button" name="btnAllLaborInactiva" id="btnAllLaborInactiva">LISTAR INACTIVAS</button>
                  
                  </div>
                
    

                  <div class="card-content p-0">
            
                  <div class="row">
                    <div class="col s12">
                          
                              <table id="tablaLabores" class="display" style="width:100%; height: auto;">
                                <thead>
                                  <tr>
                                    <th style="text-align: center;width:8%;">FILA</th>
                                    <th style="text-align: center;">ID</th>
                                    <th style="text-align: center;">NOMBRE CORTO</th>
                                    <th style="text-align: center;">DESCRIPCION</th>
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
             



                </div>
              </div>
            </div>
            <!-- Content Area Ends -->
          </div>
        </div>
            </div>
           <?php //require_once $ruta."/layouts/right_sidebar.php"; ?>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

<script type="text/javascript" src="actividad.js"></script>
<?php } ?>