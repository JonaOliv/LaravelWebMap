@extends('layouts.main')  
@section('content')  
  <!--Lista de la izquierda-->
  <div id="sidebar">
    <div class="sidebar-wrapper">
      <div class="panel panel-default" id="features">
        <div class="panel-heading">
          <h3 class="panel-title">Amenities in List<span id="amenities-amount-screen"></span>
          <button type="button" class="btn btn-xs btn-default pull-right" id="sidebar-hide-btn"><i class="fa fa-chevron-left"></i></button></h3>
        </div>
        <div class="panel-body">
            <div class="row">
              <div class="col-xs-12 col-md-12">
                <button type="button" class="btn btn-danger btn-block" id="crearlista-btn">Create List</button>
              </div>
            </div>
          <div class="row">
            <div class="col-xs-8 col-md-8">
              <input type="text" class="form-control search" placeholder="Filtro" />
            </div>
            <div class="col-xs-4 col-md-4">
              <button type="button" class="btn btn-danger pull-right sort" data-sort="feature-name" id="sort-btn"><i class="fa fa-sort"></i>&nbsp;&nbsp;Orden</button>
            </div>
          </div>
        </div>
        <div class="sidebar-table">
          <table class="table table-hover" id="feature-list">
            <tbody class="list"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!--FIN Lista de la izquierda-->

  <!--Lugar donde el Mapa es desplegado-->
  <div id="map"></div>
  <!--FIN Lugar donde el Mapa es desplegado-->

<!--Modal Leyenda-->
    <div class="modal fade" id="legendModal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Legend</h4>
          </div>
          <div class="modal-body">
            <p>Click in Create list to get a group of the current geocoordinates captured by your screen.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
<!--Fin Modal Leyenda-->

<!--Modal Personalizar mapa de calor -->
    <div class="modal fade" id="personalizar-mapaCalor-Modal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Heatmap Settings</h4>
          </div>
          <div class="modal-body">
            <form class="form-horizontal" name="mapaCalorForm">
              <label>Radius</label><input id="radius-mapaCalor" value="25" min="10" max="50" type="range" class="form-control">
              <label>Blur</label><input id="blur-mapaCalor" value="15" min="10" max="50" type="range" class="form-control">
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
<!--FIN Modal Personalizar mapa de calor -->

<!-- Modal Personalizar Filtros Puntos 2 -->
    <div class="modal fade" id="personalizar-filtro-puntos-Modal-2" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Set Filters</h4>
          </div>
          <div class="modal-body">
            <label>Amenity Type</label>
            <select class="form-control" id="filtro-tipoPunto-2-slt">
                @foreach($viewData["sltTiposBox"] as $data)
                <option value="{{ $data['idtp'] }}" {{ $data['Selected'] }}>{{ $data['tp'] }}</option>
                @endforeach
            </select>
            <div id="filtroQueryBuilder"></div>
          </div>
          <div class="modal-footer">
            <div class="row">
              <div align="right" class="col-md-10">
                &nbsp;
                <button type="button" class="btn btn-danger" id="filtro-cargar-2-btn">Load</button>
                <button type="button" class="btn btn-danger" id="filtro-limpiar-2-btn">Clear</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
<!-- FIN Modal Personalizar Filtros Puntos 2 -->

<!--mODAL MAPA ATRIBUCIONES-->
    <div class="modal fade" id="attributionModal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button class="close" type="button" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">
              Map Providers</a>
            </h4>
          </div>
          <div class="modal-body">
            <div id="attribution"></div>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
<!--FIN mODAL MAPA ATRIBUCIONES-->

<!--Modal que es abierto cuando le das click a uno de los elementos de la lista de la izquierda-->
    <div class="modal fade" id="featureModal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button class="close" type="button" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title text-danger" id="feature-title"></h4>
          </div>
          <div class="modal-body" id="feature-info"></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" id="verPunto-btn">More</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
<!--FIN Modal que es abierto cuando le das click a uno de los elementos de la lista de la izquierda-->

<script src="{{ asset('/libs/list/list.min.js') }}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/leaflet.js"></script>
<script src="https://unpkg.com/leaflet.markercluster@1.1.0/dist/leaflet.markercluster.js"></script>
<script src="https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-locatecontrol/v0.43.0/L.Control.Locate.min.js"></script>
<script src="{{ asset('/libs/leaflet-groupedlayercontrol/leaflet.groupedlayercontrol.js') }}"></script>

<!--Las que voy a gregar-->
<script type="text/javascript" src="{{ asset('/libs/leaflet-heat/HeatLayer.js') }}"></script>
<script type="text/javascript" src="{{ asset('/libs/Leaflet.contextmenu/leaflet.contextmenu.min.js') }}"></script>

<link rel="stylesheet" type="text/css" href="{{ asset('/libs/datetimepicker/jquery.datetimepicker.min.css') }}"/>
<script src="{{ asset('/libs/datetimepicker/jquery.datetimepicker.full.min.js') }}"></script>

<link rel="stylesheet" href="{{ asset('/libs/jqueryQueryBuilder/css/query-builder.default.min.css') }}">
<script type="text/javascript" src="{{ asset('/libs/jqueryQueryBuilder/js/query-builder.standalone.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('/libs/jqueryQueryBuilder/i18n/query-builder.es.js') }}"></script>

<script src="{{ asset('/js/filter.js') }}"></script>

<script type="text/javascript">

  $('#filtroQueryBuilder').queryBuilder({
    plugins: ['bt-tooltip-errors'],

    filters: [{
      id: 1,
      label: 'Title',
      type: 'string',
      operators: ['equal', 'not_equal', 'contains','not_contains']
    }, {
      id: 2,
      label: 'Description',
      type: 'string',
      operators: ['equal', 'not_equal', 'contains','not_contains']
    }, {
      id: 4,
      label: 'Does it have pool?',
      type: 'integer',
      input: 'select',
      values: {
        1: 'YES',
        0: 'NO'
      },
      operators: ['equal', 'not_equal']
    }, {
      id: 6,
      label: 'Departamento',
      type: 'integer',
      input: 'select',
      values: {
        1 :	"Francisco Morazan",
        2	: "El Paraiso",
        3	: "Choluteca",
        4	: "Valle",
        5	: "Comayagua",
        6	: "Cortes",
        7	: "Atlantida",
        8	: "Colon",
        9 : "Copan",
        10 : "Gracias a Dios",
        11 : "Intibuca",
        12 : "Islas de la Bahia",
        13 : "La Paz",
        14 :"Lempira",
        15 : "Ocotepeque",
        16 : "Olancho",
        17 : "Santa Barbara",
        18 : "Yoro"
      },
      operators: ['equal', 'not_equal']
    },  {
      id: 7,
      label: 'Municipio',
      type: 'integer',
      validation: {
        format: /^[1-500]{1}$/
      },
      input: function(rule, name) {
        var $container = rule.$el.find('.rule-value-container');

        $container.on('change', '[name='+ name +'_1]', function(){
          var h = '';
          var oMunicipios = {
            1:["<option value='-1'>-</option>"],
            2:["<option value='-1'>-</option>"],
            3:["<option value='-1'>-</option>"],
            4:["<option value='-1'>-</option>"],
            5:["<option value='-1'>-</option>"],
            6:["<option value='-1'>-</option>"],
            7:["<option value='-1'>-</option>"],
            8:["<option value='-1'>-</option>"],
            9:["<option value='-1'>-</option>"],
            10:["<option value='-1'>-</option>"],
            11:["<option value='-1'>-</option>"],
            12:["<option value='-1'>-</option>"],
            13:["<option value='-1'>-</option>"],
            14:["<option value='-1'>-</option>"],
            15:["<option value='-1'>-</option>"],
            16:["<option value='-1'>-</option>"],
            17:["<option value='-1'>-</option>"],
            18:["<option value='-1'>-</option>"]
          };

            @foreach($viewData["sltMunicipiosBox"] as $data)
            oMunicipios[{{ $data['iddep'] }}].push("<option value='{{ $data['idmun'] }}'>{{ $data['mun'] }}</option>");
            @endforeach


          h = oMunicipios[$(this).val()].join(" ");


          $container.find('[name$=_2]')
            .html(h).toggle(!!h)
            .val('-1').trigger('change');
        });

        return '\
        <select name="'+ name +'_1"> '+
          '<option value="-1">-</option> '+
            @foreach($viewData["sltDepartamentosBox"] as $data)
            '<option value="{{ $data['departamentoValue'] }}" >{{ $data['departamentoCol'] }}</option>'+
            @endforeach
        '</select> \
        <select name="'+ name +'_2" style="display:none;"></select>';
      },
      operators: ['equal', 'not_equal'],
      valueGetter: function(rule) {
        return rule.$el.find('.rule-value-container [name$=_2]').val();
      },
      valueSetter: function(rule, value) {
        if (rule.operator.nb_inputs > 0) {
          var val = value;
        }
      }
    }]
  });
$("#filtro-tipoPunto-2-slt").change();
</script>

<!--Fin Las que voy a gregar-->

<script src="{{ asset('/js/mapping.js') }}"></script>
@endsection