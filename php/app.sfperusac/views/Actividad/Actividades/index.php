<?php
$ruta = "../../..";
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <title>SF PERU S.A.C</title>
    <?php include $ruta.'/layouts/dependencias1.php';?>
  </head>
  <body class="vertical-layout vertical-menu-collapsible page-header-dark vertical-modern-menu 2-columns  " data-open="click" data-menu="vertical-modern-menu" data-col="2-columns">
    <?php include $ruta.'/layouts/inicio.php';?>
    <div id="main">
      <div class="row">
        <div class="content-wrapper-before gradient-45deg-indigo-purple"></div>
        <div class="breadcrumbs-dark pb-0 " id="breadcrumbs-wrapper">
          <div class="container">
            <div class="row">
              <div class="col s10 m6 l6">
                <h5 class="breadcrumbs-title mt-0 mb-0">Actividades</h5>
                <ol class="breadcrumbs mb-0">
                  <li class="breadcrumb-item"><a href="../../inicio/">Inicio</a>
                  </li>
                  <li class="breadcrumb-item"><a href="#">Actividad</a>
                  </li>
                  <li class="breadcrumb-item active">Actividades
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div class="col s12">
          <div class="container">
            <div class="row">
              <!-- Inicio Nueva Labor-->
              <div class="col s12 m12 l5">
                <div class="card animate fadeLeft">
                  <div class="card-title" style="padding-top:10px; text-align: center;">
                    NUEVA ACTIVIDAD
                  </div>
                  <div class="card-content" style="max-height: calc(90vh - 210px); overflow-y: scroll; ">
                    <div class="input-field col s12">
                      <label for="ACT_Codigo">CODIGO (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="ACT_Codigo" id="ACT_Codigo" >
                    </div>
                    <div class="input-field col s12">
                      <label for="ACT_Nombre_Corto">NOMBRE CORTO (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="ACT_Nombre_Corto" id="ACT_Nombre_Corto" >
                    </div>
                    <div class="input-field col s12">
                      <select name="ACT_X_Rendimiento" id="ACT_X_Rendimiento">
                        <option value="S">POR RENDIMIENTO</option>
                        <option value="N">POR JORNAL</option>
                      </select>
                      <label>TIPO (*)</label>
                    </div>
                    <div class="input-field col s12">
                      <select name="ACT_Activo" id="ACT_Activo">
                        <option value="1">ACTIVO</option>
                        <option value="0">INACTIVO</option>
                      </select>
                      <label>ESTADO (*)</label>
                    </div>
                    <div class="input-field col s12">
                      <label for="ACT_Descripcion">DESCRIPCION</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="ACT_Descripcion" id="ACT_Descripcion" >
                    </div>
                    <div class="col s12">
                      <label>(*) Campo Obligatorio</label>
                    </div>
                  </div>
                  <div class="card-action">
                    <button class="col l4 mb-2 btn waves-effect waves-light green gradient-shadow border-round" type="button" id="btnNewAct" name="btnNewAct"> NUEVO</button>
                    <button class="col l4 mb-2 btn waves-effect waves-light red gradient-shadow border-round" disabled type="reset" id="btnCancelAct" name="btnCancelAct"><i class="fa fa-times"></i> CANCELAR</button>
                    <button class="col l4 mb-2 btn waves-effect waves-light blue gradient-shadow border-round" disabled type="submit" name="btnAgregarAct" id="btnAgregarAct"><i class="fa fa-save"></i> GUARDAR</button>
                    <button class="col l4 mb-2 btn waves-effect waves-light blue gradient-shadow border-round hide" type="button" name="btnActualizaAct" id="btnActualizaAct"><i class="fa fa-save"></i> MODIFICAR</button>
                  </div>
                </div>
              </div>
              <!--Fin Nueva Labor-->
              <!--Inicio Lista Labores-->
              <div class="col s12 m12 l7">
                <div class="card animate fadeRight">
                  <div class="card-title" style="padding-top:10px; text-align: center;">LISTA DE ACTIVIDADES</div>
                  <div class="card-content" style="max-height: calc(90vh - 210px); overflow-y: scroll;">
                    <table id="tablaActividades">
                      <thead>
                        <th style="text-align: center;">ID</th>
                        <th style="text-align: center;">NOMBRE CORTO</th>
                        <th style="text-align: center;">DESCRIPCION</th>
                        <th style="text-align: center;">TIPO</th>
                        <th style="text-align: center;">ESTADO</th>
                        <th style="width: 120px; text-align: center;">Opciones</th>
                      </thead>
                      <tbody>

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <!--Fin Lista Labores-->
            </div>
            <?php require_once $ruta."/layouts/right_sidebar.php"; ?>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

<script type="text/javascript" src="listaActividades.js"></script>

   
