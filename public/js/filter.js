

$("#setting-filter-btn").click(function() {
  $("#personalizar-filtro-puntos-Modal-2").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#filtro-tipoPunto-2-slt").change(function() {

  var oRules = Cookies.get('tipoPunto'+$('#filtro-tipoPunto-2-slt option:selected').val());

  if (oRules == null || oRules == 'undefined') {
    oRules = {};
    $('#filtroQueryBuilder').queryBuilder('reset');
  } else {
    oRules = JSON.parse(oRules);
    $('#filtroQueryBuilder').queryBuilder('setRules',oRules);
  }

  return false;
});

$("#filtro-cargar-2-btn").click(function(e){
  $("#loading").show();
  Cookies.set('tipoPunto'+$('#filtro-tipoPunto-2-slt option:selected').val(), JSON.stringify($('#filtroQueryBuilder').queryBuilder('getRules')), { expires: 7 });

  $.ajax({
      url: 'servicios/personalizaciones/puntosFiltro.servicio.php',
      dataType: 'json',
      type: 'POST',
      data: {
        "tipoPunto":$("#filtro-tipoPunto-slt option:selected").val(),
        "condicionantes":JSON.stringify($('#filtroQueryBuilder').queryBuilder('getRules')),
        "quien":"cargar2",
        "de":$("#filtro-pagina-hdd").val()
      },
      success: function( data, textStatus, jQxhr ){
        $("#loading").hide();
        //swal(data.titulo,data.descripcion,data.tipo);
      },
      error: function( jqXhr, textStatus, errorThrown ){

      },
      complete: function( jqXHR, textStatus ){
        $("#loading").hide();
      }
  });

  return false;
});

$("#filtro-limpiar-2-btn").click(function(e){
  var oRules = Cookies.get('tipoPunto'+$('#filtro-tipoPunto-2-slt option:selected').val());

  if (oRules == null || oRules == 'undefined') {
    oRules = {};
  }

  oRules = JSON.parse(oRules);

  $('#filtroQueryBuilder').queryBuilder('setRules',oRules);

  swal("Carga Completa","cookie cargada","success");
  return false;
});
