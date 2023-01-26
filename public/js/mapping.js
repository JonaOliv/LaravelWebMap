/*Colors*/
var sFirstColor = "#006E33";
var sSecondColor = "#caaf34";
/*Fin colors*/

var map, featureList, boroughSearch = [];

/*Variables creadas por mi*/

/*variable que contienen todos los layers que pueden ser desmarcados*/
var desmarcablesLayers = [];
/*FIN variable que contienen todos los layers que pueden ser desmarcados*/

/*variables para el ingreso de una geocoordenada*/
var marcadorTemp = null;
var departamentoSeleccionado = 0;
var aLayersDepartamentos = [];
/*FIN variables para el ingreso de una geocoordenada*/

/*Variable para la creacion de la lista de la izquierda*/
var bolClickCrearListaBtn = false;

/*variable para visualizar aun mas un punto*/
var strPuntoVisualizable = "";

/*heat*/

var heatmapArray = [];

function colocarMarcadoresAbilitados(){
  var newheatmapArray = [];

  for (var i = 0, n = aBoolPuntosSeleccionados.length; i < n; i++) {
    if (aBoolPuntosSeleccionados[i].valor) {
      Array.prototype.push.apply(newheatmapArray, aHeatPuntos[i]);
    }
  }

  heat.setLatLngs(newheatmapArray);
  heat.redraw();
  heatmapArray = null;
}
/*fin heat*/

function getIconStyle(direccion) {
  return L.icon({
    iconUrl: direccion,
    iconSize:     [46, 46],
    iconAnchor:   [23, 42.16],
    className: "iconoSmooth"
  });
}

function mostrarModalDePunto(layerID,lugarArray,tipoPunto) {
  var layer = {};
  strPuntoVisualizable = layerID;
  $.ajax({
        url: '/api/amenities/modalPunto',
        dataType: 'json',
        type: 'POST',
        data: {"layerID":layerID,"lugarArray":lugarArray},
        success: function( data, textStatus, jQxhr ){
            layer=data;

            console.log('/api/amenities/modalPunto');
            console.log(layer);

            if (!map.hasLayer(aLayersCaja[lugarArray].cajaLayer)) {
              map.addLayer(aLayersCaja[lugarArray].cajaLayer);
            }
            map.setView([layer.features[0].geometry.coordinates[1],layer.features[0].geometry.coordinates[0]], map.getZoom());

            var content = layer.features[0].properties.content;

            $("#feature-title").html(
              "Caso: " + layer.features[0].properties.IdCaso
            );
            $("#feature-info").html(content);
            $("#featureModal").modal("show");
            /*pone el circulo dibujado*/
            highlight.clearLayers().addLayer(L.circleMarker([layer.features[0].geometry.coordinates[1],
              layer.features[0].geometry.coordinates[0]], highlightStyle));
        },
        error: function( jqXhr, textStatus, errorThrown ){

        }
    });

}


$("#crearlista-btn").click(function () {
  bolClickCrearListaBtn = true;
  syncSidebar();
  bolClickCrearListaBtn = false;
});

$("#verPunto-btn").click(function() {
  window.location = "home"
  return false;
});

/*heat*/
$("#personalizar-mapaCalor-btn").click(function() {
  $("#personalizar-mapaCalor-Modal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});


$("#aplicar-personalizar-mapaCalor-btn").click(function() {
  heat.changeOptionsJBOS($("#radius-mapaCalor").val(), $("#blur-mapaCalor").val());
  return false;
});

$("#radius-mapaCalor").change(function() {
  heat.changeOptionsJBOS($("#radius-mapaCalor").val(), $("#blur-mapaCalor").val());
  return false;
});

$("#blur-mapaCalor").change(function() {
  heat.changeOptionsJBOS($("#radius-mapaCalor").val(), $("#blur-mapaCalor").val());
  return false;
});
/*Fin heat*/


function getMensajeAunEnDesarrollo() {
  swal({
    title: 'Disculpe usuario',
    text: 'Habilidad bajo desarrollo.',
    timer: 1500
  });
}



/*herramientas*/
$("#marcar-todo-btn").click(function () {
  for (i = 0; i < desmarcablesLayers.length; i++) {
    map.addLayer(desmarcablesLayers[i]);
  }
  return false;
});

$("#desmarcar-todo-btn").click(function () {
  for (i = 0; i < desmarcablesLayers.length; i++) {
    map.removeLayer(desmarcablesLayers[i]);
  }
  return false;
});
/*fin herramientas*/

/*reportes*/
$("#listAmenitiesOnCurrentList-report-btn").click(function () {
  getMensajeAunEnDesarrollo();
  return false;
});
/*FIN reportes*/

/*Usuario*/
$("#cuenta-user-btn").click(function () {
  getMensajeAunEnDesarrollo();
  return false;
});
/*FIN Usuario*/

/*contextmenu*/
function mostrarCoordenadas (e) {
  swal({
    title: 'Coordenadas Actuales',
    text: 'Latitud,Longitud: '+e.latlng
  });

  return false;
}

function centrarMapa (e) {
	map.panTo(e.latlng);
}

function createGeoreference() {
  swal({
    title: '¿Wish to add a georeference?',
    text: "Please remember to put a georeference on map.",
    type: 'info',
    showCancelButton: true,
    confirmButtonColor: sSecondColor,
    cancelButtonColor: sFirstColor,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No, thanks'
  }).then(function () {
    if (marcadorTemp == null) {
      swal(
        'Error',
        'There is not a reference in the map.',
        'error'
      );
    } else if (departamentoSeleccionado == 0) {
      swal(
        'Error',
        'Please select a department before submitting your georeference.',
        'error'
      );
    } else {
      swal({
        title: 'Excuse us',
        text: 'It is under development yet.',
        timer: 1500
      });
    }

  });
}


function colocarMarcadorTempEnMapa(e) {
  if (marcadorTemp == null) {
    marcadorTemp = L.marker(e.latlng).addTo(map);
  } else {
    marcadorTemp.setLatLng(e.latlng);
  }

  var pt = turf.point([e.latlng.lng,e.latlng.lat]);
  departamentoSeleccionado = 0;

  for (var i = 0; i < aLayersDepartamentos.length; i++) {
    if (turf.inside(pt,aLayersDepartamentos[i].feature.geometry)) {
      departamentoSeleccionado = aLayersDepartamentos[i].feature.properties.IdDepartamento;
    }
  }
}

function quitarMarcadorTempEnMapa(e) {
  if (marcadorTemp != null) {
    map.removeLayer(marcadorTemp);
    marcadorTemp = null;
  }
}
/*fin contextmenu*/

/*fin Variables creadas por mi*/

/* sin funcion aparente*/
$(window).resize(function() {
  sizeLayerControl();
});
/* controla el evento click de la lista de la izquierda*/
$(document).on("click", ".feature-row", function(e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt($(this).attr("id"), 10));
});
/* pone un circulo encima del punto cuando realizamos un mouseover sobre algun punto de la lista de la izquierda*/
if ( !("ontouchstart" in window) ) {
  $(document).on("mouseover", ".feature-row", function(e) {
    highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
  });
}


/* limpia el circulo que se le pone al punto azul cuando no estamos ya haciendo un evento mouseover sobre algun elemento de la lista de la izquierda*/
$(document).on("mouseout", ".feature-row", clearHighlight);

/*devuelve la ventana principal deacuerdo a los margenes de boroughs es decir devuelve el viewport que contenga todo el boroughs (importante)*/
$("#full-extent-btn").click(function() {
  map.fitBounds(boroughs.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

/*devuelve el modal de la leyenda*/
$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

/*devuelve el modal del login*/
$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

/*devuelve la lista de la izquierda*/
$("#list-btn").click(function() {
  animateSidebar();/*devuelve la lista de la izquierda*/
  return false;
});

/*el boton para desplegar la lista cuando el programa esta en modod movil (responsive design)*/
$("#sidebar-toggle-btn").click(function() {
  animateSidebar();
  return false;
});
/*el boton que se encarga de ocultar la lista de la izquierda*/
$("#sidebar-hide-btn").click(function() {
  animateSidebar();
  return false;
});

/*funcion utilizada para mostrar y coultar la lista de la izquierda*/
function animateSidebar() {
  $("#sidebar").animate({
    width: "toggle"
  }, 350, function() {
    map.invalidateSize();
  });
}

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

/*limpia el circulo que se le pone a los puntos*/
function clearHighlight() {
  highlight.clearLayers();
}
/*es para mostrarnos cual lista es la que se hizo click y desplegar su info*/
function sidebarClick(id) {
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}

/*(importante)*/
function syncSidebar() {
  var tempPuntoLista = null;
  var iAmenitiesCurrentAmountList = 0;

  /* Empty sidebar features */
  if (bolClickCrearListaBtn) {
      $("#feature-list tbody").empty();
  }

  /*realiza el bucle a travez de del layer respetivo y agrega las caracteristicas que esten dentro del viewport*/
  if (bolClickCrearListaBtn) {
    for (var i = 0, n=aLayersCaja.length; i < n; i++) {
      if (iAmenitiesCurrentAmountList >= 50) {
        swal("Warning","There is a limit in georeferences in list, it is 50 units.","warning");
        return;
      }

      aLayersMapaPuntos[aLayersCaja[i].indexEnArray].eachLayer(function (layer) {
        if (map.hasLayer(aLayersCaja[i].cajaLayer)) {
          if (map.getBounds().contains(layer.getLatLng())) {
            tempPuntoLista = layer.feature.properties;
            $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' +
              layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng +
              '"><td style="vertical-align: middle;"><img width="16" height="18" src="'+  aLayersCaja[i].direccionIcon+'"></td><td class="feature-name">' +
              "Amenity: " + tempPuntoLista.idAmenity +" Tipo: "+tempPuntoLista.tipoAmenity+'</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
            );
            iAmenitiesCurrentAmountList++;
          }
        }
      });
    }
  }

  /* Update list.js featureList */
  featureList = new List("features", {
    valueNames: ["feature-name"]
  });
  featureList.sort("feature-name", {
    order: "asc"
  });

  /*we add the amount of visibles amenities by the screen*/
  if (bolClickCrearListaBtn) {
    if (iAmenitiesCurrentAmountList>0) {
      $("#amenities-amount-screen").text(": "+iAmenitiesCurrentAmountList);
    } else {
      $("#amenities-amount-screen").text(" ");
    }
  }
}

/* Basemap Layers */

var arcgisOnlineEnri = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 19,
    minZoom: 4
  });


/* Overlay Layers */
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00FFFF",
  fillOpacity: 0.7,
  radius: 10
};

var openStreetMap = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  maxZoom: 19,
  minZoom: 4,
  opacity: 0.45
});

var boroughs = L.geoJson(null, {
  style: function (feature) {
    return {
      weight: 2,
      color: sSecondColor,
      fill: false,
      opacity: 1,
      clickable: false
    };
  },
  onEachFeature: function (feature, layer) {
    //ayuda visual para poder diferenciar los departamentos al momento de ingresar amenities
    aLayersDepartamentos.push(layer);

    /*es para algo de bloodhound (importante)*/
    boroughSearch.push({
      name: layer.feature.properties.name,
      source: "Boroughs",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });


  }
});
/*le cargamos los bordes, bien los modificamos para que sean los bordes de los departamentos (importante)*/
$.getJSON("/layers/honduras.min.geojson", function (data) {
  boroughs.addData(data);
});


/* Single marker cluster layer to hold all clusters */

function updateProgressBar(processed, total, elapsed) {
  if (processed == total) {
		$("#loading").hide();
	} else {
	  $("#loading").show();
	}
}

var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
	showCoverageOnHover: true,
	zoomToBoundsOnClick: false,chunkedLoading: true, chunkProgress: updateProgressBar
});

/*llamador de georeferencias*/
function getGeoreferences(vURL,vGeojsonLayer,llamarCallBackAntes) {
  var jsonRespuesta = llamarCallBackAntes();
  var jsonEnviar = {};

  if (jsonRespuesta == null || jsonRespuesta == "" || jsonRespuesta == "undefined") {
    jsonEnviar.de = $("#filtro-pagina-hdd").val();
  } else {
    jsonEnviar = jsonRespuesta;
    jsonEnviar.de = $("#filtro-pagina-hdd").val();
  }

  $.ajax({
      url: vURL,
      dataType: 'json',
      type: 'POST',
      data: jsonEnviar,
      async: false,
      success: function( data, textStatus, jQxhr ){
        console.log("puntosEnMapa");
        console.log(data);
        vGeojsonLayer.addData(data);
      },
      error: function( jqXhr, textStatus, errorThrown ){

      }
  });
}

/* Empty layer placeholder to add to layer control for listening when to add/remove amenities to markerClusters layer */
var aLayersCaja = [];
var aLayersMapaPuntos = [];
var aBoolPuntosSeleccionados = [];
var aHeatPuntos = [];

function llenarCajaMapa() {
  $.ajax({
      url: '/api/puntos/puntosMapaCaja',
      dataType: 'json',
      type: 'POST',
      data: {"de":$("#filtro-pagina-hdd").val()},
      async: false,
      success: function( data, textStatus, jQxhr ){
        var aTempData = data;

        for (let i = 0, n=aTempData.length; i < n; i++) {
          /*Para manejar y usar las cajas de check del mapa creo su objeto*/
          aLayersCaja.push({"nombreLayer":aTempData[i].tipoPunto,"cajaLayer":L.geoJson(null),"direccionIcon":aTempData[i].iconoDir,"idtp":aTempData[i].idtp, "indexEnArray":i});

          /*creamos un array de puntos de calor por cada tipo de punto*/
          aHeatPuntos.push([]);

          /*creamos los puntos objectos que albergaran nuestros puntos.*/
          crearObjectosPuntos(aLayersCaja);

          /*inicializamos el booleano controlador a cero*/
          aBoolPuntosSeleccionados.push({"valor":false});
        }
      },
      error: function( jqXhr, textStatus, errorThrown ){

      }
  });
}

function crearObjectosPuntos(aTempData) {
  for (var i = 0, n = aLayersCaja.length; i < n; i++) {
    aLayersMapaPuntos.push(L.geoJson(null, {
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
          icon: getIconStyle(aLayersCaja[feature.properties.lugarArray].direccionIcon),
          title: feature.properties.title,
          riseOnHover: true
        });
      },
      onEachFeature: function (feature, layer) {
        if (feature.properties) {
          /*heat*/
          aHeatPuntos[feature.properties.lugarArray].push([feature.geometry.coordinates[1],feature.geometry.coordinates[0]]);
          /*fin heat*/
          layer.on({
            click: function (e) {
              mostrarModalDePunto(feature.properties.idi,feature.properties.lugarArray,feature.properties.tipoPunto);
            }
          });
        }
      }
    }));
  }
}

llenarCajaMapa();

var aContextMenuTemp = null;


aContextMenuTemp = [{
    text: 'Show Current Coordinates',
    callback: mostrarCoordenadas,
    iconCls: "fa fa-compass"
}, {
    text: 'Center in Current Coordinates',
    callback: centrarMapa,
    iconCls: "fa fa-crosshairs"
},'-',{
  text: 'Mark user Georeference',
  callback: colocarMarcadorTempEnMapa,
  iconCls: 'fa fa-map-marker'
},{
  text: 'Unmark User Georeference',
  callback: quitarMarcadorTempEnMapa,
  iconCls: 'fa fa-map-marker'
},'-',{
  text: 'Create Georeference',
  callback: createGeoreference,
  iconCls: 'fa fa-map-marker'
}];


map = L.map("map", {
  zoom: 8,
  center: [14.940833, -86.523261],
  layers: [arcgisOnlineEnri, boroughs, markerClusters, highlight],
  zoomControl: false,
  attributionControl: false,
  /*esto le agregue a la plantilla*/
  contextmenu: true,
  contextmenuWidth: 230,
  contextmenuItems: aContextMenuTemp
});



/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {
  $("#loading").show();

  for (var i = 0, n=aLayersCaja.length; i < n; i++) {

    if (e.layer === aLayersCaja[i].cajaLayer) {
      getGeoreferences("/api/amenities/puntosEnMapa",aLayersMapaPuntos[i],function() {
        aHeatPuntos[i].length = 0;

        var jsonTempEnviar = {"tipoPunto":aLayersCaja[i].idtp,"lugarArray":aLayersCaja[i].indexEnArray};

        return jsonTempEnviar;
      });

      markerClusters.addLayers(aLayersMapaPuntos[i]);
      aBoolPuntosSeleccionados[i].valor = true;
      syncSidebar();
      colocarMarcadoresAbilitados();
    }
  }

  $("#loading").hide();
});

map.on("overlayremove", function(e) {
  for (var i = 0, n=aLayersCaja.length; i < n; i++) {

    if (e.layer === aLayersCaja[i].cajaLayer) {
      markerClusters.removeLayer(aLayersMapaPuntos[i]);
      aBoolPuntosSeleccionados[i].valor = false;
      syncSidebar();
      colocarMarcadoresAbilitados();

      aLayersMapaPuntos[i].clearLayers();
    }
  }
});

/* Filter sidebar feature list to only show features in current map bounds */
map.on("moveend", function (e) {
  syncSidebar();
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  highlight.clearLayers();
});

/* Attribution control */

function updateAttribution(e) {
  var strAtribuciones = "<ul>";
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      strAtribuciones += ("<li>"+layer.getAttribution()+"</li>");
    }
  });
  strAtribuciones += "</ul>"
  $("#attribution").html(strAtribuciones);
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'>Leaflet | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Proveedores de Mapas</a>";
  return div;
};
map.addControl(attributionControl);

var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
/*esto es para visibilidad entre diferentes tamanos de pantallas de lo que seria el control*/
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

/*heat*/
var heat = L.heatLayer(heatmapArray).addTo(map);
heat.redraw();
/*fin heat*/

/*Este esta deshabilitado iba donde esta null en layerControl*/
var baseLayers = {
  "Street Map": openStreetMap,
  "Aerial Imagery": arcgisOnlineEnri
};

var groupedOverlays = {
  "Amenities": {
  },
  "Geocercas": {
    "Honduras": boroughs
  },
  "Otros Mapas":{
    "OpenStreetMap": openStreetMap,
    "Heatmap": heat
  }
};

desmarcablesLayers.push(boroughs);
desmarcablesLayers.push(openStreetMap);
desmarcablesLayers.push(heat);

var layerControl = L.control.groupedLayers(null, groupedOverlays, {
  collapsed: isCollapsed
}).addTo(map);

for (var i = 0; i < aLayersCaja.length; i++) {
  layerControl.addOverlay(aLayersCaja[i].cajaLayer, "<img src='"+aLayersCaja[i].direccionIcon+"' width='24' height='28'>&nbsp;"+aLayersCaja[i].nombreLayer,"Amenities");
  desmarcablesLayers.push(aLayersCaja[i].cajaLayer);
}

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
  $(this).val('');
});

/* Prevent hitting enter from refreshing the page */
$("#searchbox").keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
  }
});
/*sin especificar*/
$("#featureModal").on("hidden.bs.modal", function (e) {
  $(document).on("mouseout", ".feature-row", clearHighlight);
});



/* Typeahead search functionality */
/*one function: Attach a handler to an event for the elements. The handler is executed at most once per element per event type.*/
/*ajaxStop: Register a handler to be called when all Ajax requests have completed.*/
$(document).one("ajaxStop", function () {

  /*heat*/
  colocarMarcadoresAbilitados();
  /*fin heat*/

  /*sizeLayerControl();*/
  /* Fit map to boroughs bounds */
  map.fitBounds(boroughs.getBounds());
  featureList = new List("features", {valueNames: ["feature-name"]});
  featureList.sort("feature-name", {order:"asc"});

/*todos estos bloodhound se encargan de creer buffer donde uno pueda realizar typeaheads*/

  var boroughsBH = new Bloodhound({
    name: "Boroughs",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: boroughSearch,
    limit: 10
  });



/*Este bloodhound en particular es de una fuente externa*/
  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "http://api.geonames.org/searchJSON?username=jonaoliv&featureClass=R&featureClass=P&featureClass=L&featureClass=S&maxRows=5&countryCode=HN&country=HN&name_startsWith=%QUERY",
      wildcard: '%QUERY',
      filter: function (data) {
        return $.map(data.geonames, function (result) {
          return {
            name: result.name + ", " + result.adminCode1,
            lat: result.lat,
            lng: result.lng,
            source: "GeoNames"
          };
        });
      },
      ajax: {
        beforeSend: function (jqXhr, settings) {
          settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
          $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 5
  });
  boroughsBH.initialize();
  geonamesBH.initialize();

  /*bloodhound dinamico y demas bloodhound*/
  var jsonA_Bloodhound = [];

  jsonA_Bloodhound.push(
    {
      name: "Boroughs",
      displayKey: "name",
      source: boroughsBH.ttAdapter(),
      templates: {
        header: "<h4 class='typeahead-header'>Geocercas: Honduras</h4>"
      }
    }
  );


  for (var i = 0, n=aLayersCaja.length; i < n; i++) {
    var tempStrTipoBuscado = "name"+aLayersCaja[i].indexEnArray;
    var tempStrTipoBuscadoNom = aLayersCaja[i].nombreLayer;
    var tempStrTipoBuscadoIconoDir = aLayersCaja[i].direccionIcon;

    jsonA_Bloodhound.push(
      {
        name: tempStrTipoBuscado,
        displayKey: "name",
        limit: 10,
        minLength: 3,
        source: function(query, syncResults, asyncResults) {
          var tempIntIndice = parseInt(this.name.replace("name", ""));
          var tempIntTipoBuscado  = aLayersCaja[tempIntIndice].idtp;
          var tempObjectJSONseleccionado = aBoolPuntosSeleccionados[aLayersCaja[tempIntIndice].indexEnArray];
          $.ajax({
            data: {"tipobuscado": tempIntTipoBuscado,"buscado": $("#searchbox").val(),"seleccionado":tempObjectJSONseleccionado.valor,"de":$("#filtro-pagina-hdd").val()},
            type: "POST",
            dataType: "json",
            url: "servicios/personalizaciones/bloodhound.servicio.php",
            success: function(data){
              asyncResults(data);
            }
          });
        },
        templates: {
          header: "<h4 class='typeahead-header'><img src='"+tempStrTipoBuscadoIconoDir+"' width='24' height='28'>&nbsp;"+tempStrTipoBuscadoNom+"</h4>",
          suggestion: Handlebars.compile(["<div>{{name}}<br>&nbsp;<small>{{address}}</small></div>"].join(""))
        }
      }
    );
  }

  jsonA_Bloodhound.push(
    {
      name: "GeoNames",
      displayKey: "name",
      source: geonamesBH.ttAdapter(),
      templates: {
        header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;GeoNames</h4>",
        suggestion: Handlebars.compile(["<div>{{name}}</div>"].join(""))
      }
    }
  );
  /*FIN bloodhound dinamico y demas bloodhound*/

  /* instantiate the typeahead UI */
  /*basicamente conectamos la interfaz del typeaheads con bloodhound y le decimos como es el titulo*/
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, jsonA_Bloodhound).on("typeahead:selected", function (obj, datum) {
    /*Los redirigimos hacia donde tienen que ir*/
    if (datum.source === "Boroughs") {
      map.fitBounds(datum.bounds);
    }

    for (var i = 0, n = aLayersCaja.length; i < n; i++) {

      if (datum.tipobuscado === aLayersCaja[i].idtp) {
        mostrarModalDePunto(datum.idi,aLayersCaja[i].indexEnArray,aLayersCaja[i].idtp);
      }
    }

    if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
    }
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }

  }).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");

  $("#loading").hide();
});



// Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
  L.DomEvent
  .disableClickPropagation(container)
  .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}
