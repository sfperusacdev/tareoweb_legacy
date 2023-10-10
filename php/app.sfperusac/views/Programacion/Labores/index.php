<?php
$ruta = "../../..";
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
                <h5 class="breadcrumbs-title mt-0 mb-0">Labores</h5>
                <ol class="breadcrumbs mb-0">
                  <li class="breadcrumb-item"><a href="../../inicio/">Inicio</a>
                  </li>
                  <li class="breadcrumb-item"><a href="#">Actividad</a>
                  </li>
                  <li class="breadcrumb-item active">Labores
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
                    NUEVA LABOR
                  </div>
                  <div class="card-content" style="max-height: calc(90vh - 210px); overflow-y: scroll; ">
                    <div class="input-field col s12">
                      <select name="ACT_Id" id="ACT_Id">
                        <option value="" disabled selected>Choose your option</option>
                      </select>
                      <label>ACTIVIDAD (*)</label>
                    </div>
                    <div class="input-field col s12">
                      <label for="LAB_Codigo">CODIGO (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="LAB_Codigo" id="LAB_Codigo">
                    </div>
                    <div class="input-field col s12">
                      <label for="LAB_Nombre_Corto">NOMBRE CORTO (*)</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="LAB_Nombre_Corto" id="LAB_Nombre_Corto">
                    </div>
                    <div class="input-field col s12">
                      <select name="LAB_Activo" id="LAB_Activo">
                        <option value="1">ACTIVO</option>
                        <option value="0">INACTIVO</option>
                      </select>
                      <label>ESTADO (*)</label>
                    </div>
                    <div class="input-field col s12">
                      <label for="LAB_Descripcion">DESCRIPCION</label>
                      <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="LAB_Descripcion" id="LAB_Descripcion">
                    </div>
                    <div class="col s12">
                      <label>(*) Campo Obligatorio</label>
                    </div>
                  </div>
                  <div class="card-action">
                    <button class="col l4 mb-2 btn waves-effect waves-light green gradient-shadow border-round" type="button" id="btnNewLab" name="btnNewLab"> NUEVO</button>
                    <button class="col l4 mb-2 btn waves-effect waves-light red gradient-shadow border-round" disabled type="reset" id="btnCancelLab" name="btnCancelLab"><i class="fa fa-times"></i> CANCELAR</button>
                    <button class="col l4 mb-2 btn waves-effect waves-light blue gradient-shadow border-round" disabled type="submit" name="btnAgregarLab" id="btnAgregarLab"><i class="fa fa-save"></i> GUARDAR</button>
                    <button class="col l4 mb-2 btn waves-effect waves-light blue gradient-shadow border-round hide" type="button" name="btnActualizaLab" id="btnActualizaLab"><i class="fa fa-save"></i> MODIFICAR</button>
                  </div>
                </div>
              </div>
              <!--Fin Nueva Labor-->
              <!--Inicio Lista Labores-->
              <div class="col s12 m12 l7">
                <div class="card animate fadeRight">
                  <div class="card-title" style="padding-top:10px; text-align: center;">LISTA DE LABORES</div>
                  <div class="card-content" style="max-height: calc(90vh - 210px); overflow-y: scroll;">
                    <table id="tablaLabores" class="">
                      <thead>
                        <th style="text-align: center;">ID</th>
                        <th style="text-align: center;">NOMBRE CORTO</th>
                        <th style="text-align: center;">DESCRIPCION</th>
                        <th style="text-align: center;">ACTIVIDAD</th>
                        <th style="text-align: center;">ESTADO</th>
                        <th style="text-align: center;">Opciones</th>
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

<script type="text/javascript" src="listaLabores.js"></script>
