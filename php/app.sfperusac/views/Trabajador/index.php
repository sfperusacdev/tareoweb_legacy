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
                <h5 class="breadcrumbs-title mt-0 mb-0">Trabajador</h5>
                <ol class="breadcrumbs mb-0">
                  <li class="breadcrumb-item"><a href="../inicio/">Inicio</a>
                  </li>
                  </li>
                  <li class="breadcrumb-item active">Trabajador
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
                    <div class="col s12 m12 l12">
                      <ul class="collapsible popout">
                        <li id="newTrabajador" style="border-color: #00e676; border-width: 3px; border-style: double;">
                          <div class="collapsible-header waves-effect waves-light gradient-shadow" style="text-align: center; color:black;">
                            <div class="col s11 m11 l11" style="color:black;">TRABAJADOR</div>
                            <i class="col s1 m1 l1 material-icons">expand_more</i>
                          </div>
                          <div class="collapsible-body">
                            <div class="row">
                              <div class="input-field col s12 m6 l2">
                                <label for="TRA_Codigo">DNI (*)</label>
                                <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="TRA_Codigo" id="TRA_Codigo" >
                              </div>
                              <div class="input-field col s12 m6 l3">
                                <label for="TRA_ApPaterno">APE. PATERNO (*)</label>
                                <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="TRA_ApPaterno" id="TRA_ApPaterno" >
                              </div>
                              <div class="input-field col s12 m6 l3">
                                <label for="TRA_ApMaterno">APE. MATERNO (*)</label>
                                <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="TRA_ApMaterno" id="TRA_ApMaterno" >
                              </div>
                              <div class="input-field col s12 m6 l4">
                                <label for="TRA_Nombre">NOMBRES (*)</label>
                                <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="TRA_Nombre" id="TRA_Nombre" >
                              </div>
                              <div class="input col s12 m4 l2">
                                <label>F. NACIMIENTO (*)</label>
                                <input type="date" disabled onKeyUp="this.value=this.value.toUpperCase();" name="TRA_Fecha_Nacimiento" id="TRA_Fecha_Nacimiento" >
                              </div>
                              <div class="input col s12 m4 l2">
                                <label>FECHA INGRESO (*)</label>
                                <input type="date" disabled onKeyUp="this.value=this.value.toUpperCase();" name="TRA_Fecha_Ingreso" id="TRA_Fecha_Ingreso" >
                              </div>
                              <div class="input col s12 m4 l2">
                                <label>FECHA CESE </label>
                                <input type="date" disabled onKeyUp="this.value=this.value.toUpperCase();" name="TRA_Fecha_Cese" id="TRA_Fecha_Cese" >
                              </div>
                              <div class="col s12 m4 l2">
                                <label>LIQUIDACION (*)</label>
                                <select disabled name="TRA_Liquidado" id="TRA_Liquidado">
                                  <option value="1">SI</option>
                                  <option value="0">NO</option>
                                </select>
                              </div>
                              <div class="input col s12 m4 l2">
                                <label>FECHA LIQUIDACION </label>
                                <input type="date" disabled onKeyUp="this.value=this.value.toUpperCase();" name="TRA_Fecha_Liquidado" id="TRA_Fecha_Liquidado" >
                              </div>
                              <div class="col s12 m4 l2">
                                <label>ESTADO (*)</label>
                                <select disabled name="TRA_Habilitado" id="TRA_Habilitado">
                                  <option value="1">HABILITADO</option>
                                  <option value="0">INHABILITADO</option>
                                </select>
                              </div>
                              <div class="input-field col s12 m6 l4">
                                <select disabled name="TRA_Empresa_Id" id="TRA_Empresa_Id" onchange="empresaSelect()">
                                  <option value="º">--Seleccione Empresa--</option>
                                </select>
                                <label>EMPRESA (*)</label>
                              </div>
                              <div class="input-field col s12 m6 l3">
                                <select disabled name="TRA_Sucursal_Id" id="TRA_Sucursal_Id">
                                  <option value="º">--Seleccione Sucursal--</option>
                                </select>
                                <label>SUCURSAL (*)</label>
                              </div>
                              <div class="input-field col s12 m6 l3">
                                <label for="TRA_Tipo">TIPO (*)</label>
                                <input type="text" disabled onKeyUp="this.value=this.value.toUpperCase();" name="TRA_Tipo" id="TRA_Tipo" >
                              </div>
                              <div class="input-field col s12 m6 l2">
                                <select disabled name="TRA_Lista_Negra" id="TRA_Lista_Negra">
                                  <option value="1">SI</option>
                                  <option value="0">NO</option>
                                </select>
                                <label>LISTA NEGRA (*)</label>
                              </div>
                              <div class="col s12" id="campoObligatorio">
                                <label>(*) Campo Obligatorio</label>
                              </div>
                              <div class="col s12 m12 l12" id="btnsTrabajador">
                                <button class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-green-teal gradient-shadow border-round" type="button" id="btnNewTrabajador" name="btnNewTrabajador">NUEVO</button>
                                <button class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-amber-amber gradient-shadow border-round" type="button" id="btnCancelTrabajador" name="btnCancelTrabajador">CANCELAR</button>
                                <button disabled class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-deep-purple-blue gradient-shadow border-round" type="submit" name="btnAgregarTrabajador" id="btnAgregarTrabajador">GUARDAR</button>
                                <button class="col s12 m3 l3 mb-2 btn waves-effect waves-light gradient-45deg-deep-purple-blue gradient-shadow border-round hide" type="button" name="btnActualizaTrabajador" id="btnActualizaTrabajador">MODIFICAR</button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <!--Inicio Lista TRABAJADOR-->
                    <div class="col s12 m12 l12">
                      <div class="card animate fadeLeft" style="border-color: #651fff; border-width: 3px; border-style: double;">
                        <div class="card-title" style="padding-top:10px; text-align: center; color:black;">LISTA DE TRABAJADORES</div>
                        <div class="card-content" style="max-height: calc(90vh - 210px);"> <!--overflow-y: scroll;-->
                          <table id="tablaTrabajadores" class="display responsive nowrap">
                            <thead>
                              <tr>
                                <th style="text-align: center;">ID</th>
                                <th style="text-align: center;">NOMBRE COMPLETO</th>
                                <th style="text-align: center;">F. NACIMIENTO</th>
                                <th style="text-align: center;">F. INGRESO</th>
                                <th style="text-align: center;">F. CESE</th>
                                <th style="text-align: center;">LIQUIDACION</th>
                                <th style="text-align: center;">F. LIQUIDACION</th>
                                <th style="text-align: center;">ESTADO</th>
                                <th style="text-align: center;">EMPRESA</th>
                                <th style="text-align: center;">SUCURSAL</th>
                                <th style="text-align: center;">TIPO</th>
                                <th style="text-align: center;">LISTA NEGRA</th>
                                <th style="text-align: center;">OPCIONES</th>
                              </tr>
                            </thead>
                            <tbody>

                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <!--Fin Lista TRABAJADOR-->
                  </div>
                </div>
              </div>
            </div>
            <?php require_once $ruta."/layouts/right_sidebar.php"; ?>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

<script type="text/javascript" src="trabajador.js"></script>
