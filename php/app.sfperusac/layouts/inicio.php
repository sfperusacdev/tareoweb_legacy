    <!-- BEGIN: Header-->
   <header class="page-topbar" id="header">
      <div class="navbar navbar-fixed">
        <nav class="navbar-main navbar-color nav-collapsible sideNav-lock navbar-dark gradient-45deg-indigo-purple no-shadow nav-collapsed">
          <div class="nav-wrapper">
            <div class="header-search-wrapper hide-on-med-and-down"><i class="material-icons">search</i>
              <input class="header-search-input z-depth-2 disabled" type="text" name="Search" placeholder="SF AGRO">
            </div>
            <ul class="navbar-list right">
              <li class="hide-on-med-and-down display-none"><a class="waves-effect waves-block waves-light translation-button" href="javascript:void(0);" data-target="translation-dropdown"><span class="flag-icon flag-icon-gb"></span></a></li>
              <li class="hide-on-med-and-down"><a class="waves-effect waves-block waves-light toggle-fullscreen" href="javascript:void(0);"><i class="material-icons">settings_overscan</i></a></li>
              <li class="hide-on-large-only display-none"><a class="waves-effect waves-block waves-light search-button" href="javascript:void(0);"><i class="material-icons">search</i></a></li>
              <li><a class="waves-effect waves-block waves-light notification-button display-none" href="javascript:void(0);" data-target="notifications-dropdown"><i class="material-icons">notifications_none<small class="notification-badge">5</small></i></a></li>
              <li><a class="waves-effect waves-block waves-light profile-button" href="javascript:void(0);" data-target="profile-dropdown"><span class="avatar-status avatar-online"><img id="avatar" src="<?php echo $ruta;?>/plugins/Materialize/app-assets/images/avatar/avatar.png" alt="avatar"><i></i></span></a></li>
              <li><a class="waves-effect waves-block waves-light sidenav-trigger display-none" href="#" data-target="slide-out-right"><i class="material-icons">format_indent_increase</i></a></li>
            </ul> 
            <!-- translation-button-->
            <ul class="dropdown-content" id="translation-dropdown">
              <li><a class="grey-text text-darken-1" href="#!"><i class="flag-icon flag-icon-gb"></i> English</a></li>
              <li><a class="grey-text text-darken-1" href="#!"><i class="flag-icon flag-icon-fr"></i> French</a></li>
              <li><a class="grey-text text-darken-1" href="#!"><i class="flag-icon flag-icon-cn"></i> Chinese</a></li>
              <li><a class="grey-text text-darken-1" href="#!"><i class="flag-icon flag-icon-de"></i> German</a></li>
            </ul>
            <!-- notifications-dropdown-->
            <ul class="dropdown-content" id="notifications-dropdown">
              <li>
                <h6>NOTIFICATIONS<span class="new badge">5</span></h6>
              </li>
              <li class="divider"></li>
              <li><a class="grey-text text-darken-2" href="#!"><span class="material-icons icon-bg-circle cyan small">add_shopping_cart</span> A new order has been placed!</a>
                <time class="media-meta" datetime="2015-06-12T20:50:48+08:00">2 hours ago</time>
              </li>
              <li><a class="grey-text text-darken-2" href="#!"><span class="material-icons icon-bg-circle red small">stars</span> Completed the task</a>
                <time class="media-meta" datetime="2015-06-12T20:50:48+08:00">3 days ago</time>
              </li>
              <li><a class="grey-text text-darken-2" href="#!"><span class="material-icons icon-bg-circle teal small">settings</span> Settings updated</a>
                <time class="media-meta" datetime="2015-06-12T20:50:48+08:00">4 days ago</time>
              </li>
              <li><a class="grey-text text-darken-2" href="#!"><span class="material-icons icon-bg-circle deep-orange small">today</span> Director meeting started</a>
                <time class="media-meta" datetime="2015-06-12T20:50:48+08:00">6 days ago</time>
              </li>
              <li><a class="grey-text text-darken-2" href="#!"><span class="material-icons icon-bg-circle amber small">trending_up</span> Generate monthly report</a>
                <time class="media-meta" datetime="2015-06-12T20:50:48+08:00">1 week ago</time>
              </li>
            </ul>
            <!-- profile-dropdown-->
            <ul class="dropdown-content" id="profile-dropdown">
              <li class="display-none"><a class="grey-text text-darken-1 " href="user-profile-page.html"><i class="material-icons">person_outline</i> Profile</a></li>
              <li class="display-none"><a class="grey-text text-darken-1 display-none" href="app-chat.html"><i class="material-icons">chat_bubble_outline</i> Chat</a></li>
              <li class="display-none"><a class="grey-text text-darken-1 display-none" href="page-faq.html"><i class="material-icons">help_outline</i> Help</a></li>
              <li class="divider"></li>
              <li class="display-none"><a class="grey-text text-darken-1 display-none" href="user-lock-screen.html"><i class="material-icons">lock_outline</i> Lock</a></li>
              <li><a class="grey-text text-darken-1" href="../../index.php?logout"><i class="material-icons">keyboard_tab</i> Cerrar sesión</a></li>
            </ul>
          </div>
          <nav class="display-none search-sm">
            <div class="nav-wrapper">
              <form>
                <div class="input-field">
                  <input class="search-box-sm" type="search" required="">
                  <label class="label-icon" for="search"><i class="material-icons search-sm-icon">search</i></label><i class="material-icons search-sm-close">close</i>
                </div>
              </form>
            </div>
          </nav>
        </nav>
      </div>
    </header>
    <!-- END: Header-->
    <!-- BEGIN: SideNav-->
    <aside class="sidenav-main nav-collapsible sidenav-light sidenav-active-square nav-collapsed">
      <div class="brand-sidebar">
        <h1 class="logo-wrapper"><a class="brand-logo darken-1" href="<?php echo $ruta;?>/views/inicio/"><img src="<?php echo $ruta;?>/plugins/Materialize/app-assets/images/logo/materialize-logo-color.png" alt="materialize logo"/><span class="logo-text hide-on-med-and-down">SF PERU S.A.C</span></a><a class="navbar-toggler" href="#"><i class="material-icons">radio_button_unchecked</i></a></h1>
      </div>
      <ul class="sidenav sidenav-collapsible leftside-navigation collapsible sidenav-fixed menu-shadow" id="slide-out" data-menu="menu-navigation" data-collapsible="menu-accordion">
        <li class="navigation-header"><a class="navigation-header-text">INICIO </a><i class="navigation-header-icon material-icons">more_horiz</i>
        </li>
        <li class="bold" id="limant"><a class="collapsible-header waves-effect waves-cyan " href="#" tabindex="0"><i class="material-icons">class</i><span class="menu-title" data-i18n="">Mantenedor</span></a>
        <div class="collapsible-body" id="menumant" >
            <ul class="collapsible collapsible-sub" data-collapsible="accordion">
            <li ><a id="liActi" class="collapsible-body " href="<?php echo $ruta;?>/views/Actividad/"><i class="material-icons">radio_button_checked</i><span class="menu-title" data-i18n="">Actividad</span></a></li>
            <li ><a id="liCultivo" class="collapsible-body" href="<?php echo $ruta;?>/views/Cultivo/"><i class="material-icons">radio_button_checked</i><span class="menu-title" data-i18n="">Cultivo</span></a></li>
            <li ><a id="liUniMed" class="collapsible-body " href="<?php echo $ruta;?>/views/UnidadMedida/"><i class="material-icons">radio_button_checked</i><span class="menu-title" data-i18n="">Unidad de Medida</span></a></li>
            <li ><a id="liSucu" class="collapsible-body" href="<?php echo $ruta;?>/views/Sucursal/"><i class="material-icons">radio_button_checked</i><span class="menu-title" data-i18n="">Sucursal</span></a></li>
            <li ><a id="liEmp" class="collapsible-body" href="<?php echo $ruta;?>/views/Empresa/"><i class="material-icons">radio_button_checked</i><span class="menu-title" data-i18n="">Empresa</span></a></li>
            <li ><a id="liBaseDat" class="collapsible-body" href="<?php echo $ruta;?>/views/BaseDatos/"><i class="material-icons">radio_button_checked</i><span class="menu-title" data-i18n="">Base de Datos</span></a></li>
            <li ><a id="liPlani" class="collapsible-body" href="<?php echo $ruta;?>/views/Planilla/"><i class="material-icons">radio_button_checked</i><span class="menu-title" data-i18n="">Planilla</span></a></li>
            <li ><a id="liTraba" class="collapsible-body" href="<?php echo $ruta;?>/views/Trabajador/"><i class="material-icons">radio_button_checked</i><span class="menu-title" data-i18n="">Trabajador</span></a></li>
        
            </ul>
          </div>
      
      
      
      </li>

       <!-- MENU INICIAL <li class="bold"><a id="liActi" class="waves-effect waves-cyan " href="<?php echo $ruta;?>/views/Actividad/"><i class="material-icons">content_paste</i><span class="menu-title" data-i18n="">Actividad</span></a></li> --> 
      <li class="navigation-header"><a class="navigation-header-text">TAREO </a><i class="navigation-header-icon material-icons">more_horiz</i>
        </li>
        <li class="bold"><a id="liTar" class="waves-effect waves-cyan  modal-trigger " href="<?php echo $ruta;?>/views/Tareo/"><i class="material-icons">group</i><span class="menu-title" data-i18n="">Tareos</span></a>
      </li>
      <li class="bold"><a id="eti" class="waves-effect waves-cyan modal-trigger " href="<?php echo $ruta;?>/views/Etiqueta/"><i class="material-icons">group</i><span class="menu-title" data-i18n="">Etiquetas</span></a>
      </li>
      <li class="bold"><a id="lietiqueta" class="waves-effect waves-cyan modal-trigger " href="<?php echo $ruta;?>/views/ListaEtiqueta/"><i class="material-icons">group</i><span class="menu-title" data-i18n="">Busca Etiquetas</span></a>
      </li>      
      <li class="bold"><a id="lietiqueta_con" class="waves-effect waves-cyan modal-trigger " href="<?php echo $ruta;?>/views/ConEtiqueta/"><i class="material-icons">group</i><span class="menu-title" data-i18n="">Consolidado de Etiquetas</span></a>
      </li>
        <li class="navigation-header"><a class="navigation-header-text">REPORTES </a><i class="navigation-header-icon material-icons">more_horiz</i>
        </li>
        <li class="bold"><a class="waves-effect waves-cyan  modal-trigger " href="#tareomodal_costos"><i class="material-icons">monetization_on</i><span class="menu-title" data-i18n="">Tareas Agricolas</span></a>
        </li>
      <li class="navigation-header"><a class="navigation-header-text">PROCESOS </a><i class="navigation-header-icon material-icons">more_horiz</i>
        </li>
        <li class="bold"><a class="waves-effect waves-cyan  modal-trigger " href="#modalTabla"><i class="material-icons">cloud_download</i><span class="menu-title" data-i18n="">Importar</span><span class="badge badge pill light-blue float-right mr-10">Tablas</span></a>
      </li>

        <li class="navigation-header"><a class="navigation-header-text">SOPORTE </a><i class="navigation-header-icon material-icons">more_horiz</i>
        </li>
        <li class="bold display-none" ><a class="waves-effect waves-cyan " href="changelog.html"><i class="material-icons">track_changes</i><span class="menu-title" data-i18n="">Contacto</span><span class="badge badge pill light-blue float-right mr-10">E-mail</span></a>
        </li>
        <li class="bold"><a class="waves-effect waves-cyan " href="../https://pixinvent.com/materialize-material-design-admin-template/documentation/index.html"><i class="material-icons">import_contacts</i><span class="menu-title" data-i18n="">Soporte</span><span class="badge badge pill light-green float-right mr-10">En Linea</span></a>
        </li>
        

      </ul>
      <div class="navigation-background"></div><a class="sidenav-trigger btn-sidenav-toggle btn-floating btn-medium waves-effect waves-light hide-on-large-only" href="#" data-target="slide-out"><i class="material-icons">menu</i></a>
    </aside>

    <div id="modalTabla" class="modal border-radius-6 modal-fixed-footer">
      
              <div class="modal-content">
              
                  
              
                <h5 class="mt-0">Tablas a Sincronizar</h5>
                <div style="top: -10px; right: 10px;" class="fixed-action-btn direction-top active" ><a class="btn-floating waves-effect waves-light red accent-2"  id="btn_cerrar"><i class="material-icons">close</i></a>
                </div>     
                
                  <hr>
                  <br>
                  <div class="modal-body">
                      <div class="row">
                      <input type="text" class="datepicker" id="filtro" hidden>
                          <form class="col s12" id="data_tablageneral">
                          
                          
                          </form>
                      </div>
                      </div>
              </div>            
              
              <div class="modal-footer page-footer footer footer-static footer-dark gradient-45deg-indigo-purple gradient-shadow navbar-border navbar-shadow center ">
             
                      <div class="footer-copyright center">
                           <div class="container"><span>
                           <a href="#" target="">* Para descargar la información de la data principal hacer click en descargar</a>
                           </span></div>
                       </div>
             
              </div>  
           
    </div>
      <div id="modalGener" class="modal border-radius-6 modal-fixed-footer">

      </div>
      <div id="tareomodal_costos" class="modal border-radius-6 ">
            <div class="modal-content">
              <h5 class="mt-0">Filtro</h5>
              <hr>
              <div class="row">
                <form class="col s12">
                  <div class="input-field col s12 m6 l12">
                    <select name="TAR_Estadocosto" id="TAR_Estado">
                      <option value="TO">TODOS</option>
                      <option value="PE">PENDIENTE</option>
                      <option value="AP">APROBADO</option>
                      <option value="EX">EXPORTADO</option>
                      <option value="AN">ANULADO</option>
                    </select>
                    <label>ESTADO (*)</label>
                  </div>
                  
                  <div class="input-field col s12 m8 l12">
                    <label id="inputFechaIniciocosto" for="FechaIniciocosto">Fecha inicio</label>
                    <input type="text" name="FechaInicio" id="FechaIniciocosto" placeholder="2020-01-01">
                  </div>

                  <div class="input-field col s12 m8 l12">
                    <label id="inputFechaFincosto" for="FechaFincosto">Fecha fin</label>
                    <input type="text" name="FechaFincosto" id="FechaFincosto" placeholder="2020-01-01">
                  </div>
                  

                </form>
              </div>
            </div>
            <div class="modal-footer col s12 m2 l12 center ">
              <a class="col s12 m2 l5 waves-effect waves-light btn red z-depth-4 mr-5 ml-5" type="reset" id="btnCancel_costo" name="btnCancel_costo"><i class="material-icons left">do_not_disturb_alt</i>SALIR</a>
              <a class="col s12 m2 l5 waves-effect waves-light btn purple z-depth-4 mr-5 " type="button" id="btnAplica_costo" name="btnAplica_costo"><i class="material-icons left">check_circle</i>APLICAR</a>
            </div>
          </div>

    </div>

           
   
    <script type="text/javascript" src="<?php echo $ruta;?>/views/Tareo/tareo_costos.js"></script>
    <script type="text/javascript" src="<?php echo $ruta;?>/views/TablaMaestra/tablamaestra.js"></script>
    <script type="text/javascript" src="<?php echo $ruta;?>/src/dist/js/openpage.js"></script>
    <!-- END: SideNav-->
