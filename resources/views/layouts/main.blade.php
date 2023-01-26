<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width">
      <meta name="mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-capable" content="yes">
      <meta name="theme-color" content="#000000">
      <meta name="description" content="">
      <meta name="author" content="Jonathan OLiva">

      <title>Touristic Map Honduras</title>

      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/leaflet.css">
      <link rel="stylesheet" href="{{ asset('/libs/leaflet.markercluster-1.0.4/MarkerCluster.css') }}">
      <link rel="stylesheet" href="https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/MarkerCluster.Default.css">
      <link rel="stylesheet" href="https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-locatecontrol/v0.43.0/L.Control.Locate.css">
      <link rel="stylesheet" href="{{ asset('/libs/leaflet-groupedlayercontrol/leaflet.groupedlayercontrol.css') }}">
      <link rel="stylesheet" href="{{ asset('/css/app.css') }}">
      <link rel="stylesheet" href="{{ asset('/libs/Leaflet.contextmenu/leaflet.contextmenu.min.css') }}">
    </head>
    <body>
      <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container-fluid">
          <div class="navbar-header">
            <div class="navbar-icon-container">
              <a href="#" class="navbar-icon pull-right visible-xs" id="nav-btn"><i class="fa fa-bars fa-lg white"></i></a>
              <a href="#" class="navbar-icon pull-right visible-xs" id="sidebar-toggle-btn"><i class="fa fa-search fa-lg white"></i></a>
            </div>
            <a class="navbar-brand" href="{{ route('pages.home') }}">TMH</a>
          </div>
          <div class="navbar-collapse collapse">
            <form class="navbar-form navbar-right" role="search">
              <div class="form-group has-feedback">
                  <input id="searchbox" type="text" placeholder="Buscar" class="form-control">
                  <span id="searchicon" class="fa fa-search form-control-feedback"></span>
              </div>
            </form>
            <ul class="nav navbar-nav">
              <li class="hidden-xs"><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="list-btn"><i class="fa fa-list white"></i>&nbsp;&nbsp;The List</a></li>
              
              <li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="about-btn"><i class="fa fa-question-circle white"></i>&nbsp;&nbsp;About Us</a></li>
              <li class="dropdown">
                  <a class="dropdown-toggle" id="personalizarDrop" href="#" role="button" data-toggle="dropdown"><i class="fa fa-cogs white"></i>&nbsp;&nbsp;Settings <b class="caret"></b></a>
                  <ul class="dropdown-menu">
                    <li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="personalizar-mapaCalor-btn"><i class="fa fa-paint-brush"></i>&nbsp;&nbsp;Heatmap</a></li>
                    <li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="setting-filter-btn"><i class="fa fa-paint-brush"></i>&nbsp;&nbsp;Geo Filter</a></li>
                  </ul>
              </li>
              <li class="dropdown">
                <a id="toolsDrop" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-globe white"></i>&nbsp;&nbsp;Tools <b class="caret"></b></a>
                <ul class="dropdown-menu">
                  <li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="full-extent-btn"><i class="fa fa-arrows-alt"></i>&nbsp;&nbsp;Zoom to Country</a></li>
                  <li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="legend-btn"><i class="fa fa-picture-o"></i>&nbsp;&nbsp;Leyend</a></li>
                  <li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="marcar-todo-btn"><i class="fa fa-check-square-o"></i>&nbsp;&nbsp;Check All</a></li>
                  <li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="desmarcar-todo-btn"><i class="fa fa-square-o"></i>&nbsp;&nbsp;Uncheck All</a></li>
                </ul>
              </li>
              <li class="dropdown">
                <a id="toolsDrop" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-globe white"></i>&nbsp;&nbsp;Maps <b class="caret"></b></a>
                <ul class="dropdown-menu">
                  <li><a href="{{ route('pages.amenities') }}" data-toggle="collapse" data-target=".navbar-collapse.in" id="amenities-btn"><i class="fa fa-picture-o"></i>&nbsp;&nbsp;All Amenities</a></li>
                  <li><a href="{{ route('pages.restaurants') }}" data-toggle="collapse" data-target=".navbar-collapse.in" id="restaurants-btn"><i class="fa fa-picture-o"></i>&nbsp;&nbsp;Restaurants</a></li>
                  <li><a href="{{ route('pages.hotels') }}" data-toggle="collapse" data-target=".navbar-collapse.in" id="hotels-btn"><i class="fa fa-picture-o"></i>&nbsp;&nbsp;Hotels</a></li>
                </ul>
              </li>
              <li class="dropdown">
                  <a class="dropdown-toggle" id="reportesDrop" href="#" role="button" data-toggle="dropdown"><i class="fa fa-file white"></i>&nbsp;&nbsp;Reports <b class="caret"></b></a>
                  <ul class="dropdown-menu">
                    <li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="listAmenitiesOnCurrentList-report-btn"><i class="fa fa-file"></i>&nbsp;&nbsp;List Amenities On Current List</a></li>
                  </ul>
              </li>
              <li class="dropdown">
                  <a class="dropdown-toggle" id="usuarioDrop" href="#" role="button" data-toggle="dropdown"><i class="fa fa-user white"></i>&nbsp;&nbsp;User <b class="caret"></b></a>
                  <ul class="dropdown-menu">
                    <li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="cuenta-user-btn"><i class="fa fa-male"></i>&nbsp;&nbsp;Account</a></li>
                    <li class="divider hidden-xs"></li>
                    <li><a href="{{ route('pages.logout') }}" data-toggle="collapse" data-target=".navbar-collapse.in" id="cerrar-sesion-btn"><i class="fa fa-sign-out"></i>&nbsp;&nbsp;Log out</a></li>
                  </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div id="loading">
        <div class="loading-indicator">
          <div class="progress progress-striped active">
            <div class="progress-bar progress-bar-info progress-bar-full"></div>
          </div>
        </div>
      </div>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.6.5/sweetalert2.min.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.6.5/sweetalert2.min.css">
      <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
      <script src="{{ asset('/libs/typeahead/typeahead.bundle.js') }}"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.3/handlebars.min.js"></script>
      <script src="https://npmcdn.com/@turf/turf/turf.min.js"></script>
      <script src="{{ asset('/js/aboutus.js') }}"></script>

      <div id="container">
        @yield('content')
      </div>

      <div class="modal fade" id="aboutModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <button class="close" type="button" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 class="modal-title">Welcome to Touristic Map of Honduras App</h4>
            </div>
            <div class="modal-body">
              <ul class="nav nav-tabs nav-justified" id="aboutTabs">
                <li class="active"><a href="#about" data-toggle="tab"><i class="fa fa-question-circle"></i>&nbsp;About the Map</a></li>
                <li><a href="#contact" data-toggle="tab"><i class="fa fa-envelope"></i>&nbsp;Contact us</a></li>
              </ul>
              <div class="tab-content" id="aboutTabsContent">
                <div class="tab-pane fade active in" id="about">
                  <p>This is a map of tourist locations to support effective and safe tourism development by providing help and service to citizens.</p>
                  <div class="panel panel-primary">
                    <div class="panel-heading">Features</div>
                    <ul class="list-group">
                      <li class="list-group-item">Mobile Responsive Design Included</li>
                      <li class="list-group-item">Created with the help of Open Source Libraries and Tools.</li>
                    </ul>
                  </div>
                </div>
                <div class="tab-pane fade" id="contact">
                  <form id="contact-form">
                    <div class="well well-sm">
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label for="first-name">First Name:</label>
                            <input type="text" class="form-control" id="first-name">
                          </div>
                          <div class="form-group">
                            <label for="last-name">Lastname:</label>
                            <input type="text" class="form-control" id="last-email">
                          </div>
                          <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="text" class="form-control" id="email">
                          </div>
                        </div>
                        <div class="col-md-8">
                          <label for="message">Message:</label>
                          <textarea class="form-control" rows="8" id="message"></textarea>
                        </div>
                        <div class="col-md-12">
                          <p>
                            <button type="submit" id="enviar-correo-btn" class="btn btn-primary pull-right" data-dismiss="modal">Send</button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
