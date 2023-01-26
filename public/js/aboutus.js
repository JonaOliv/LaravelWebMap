/*devuelve el modal de about*/
$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});
/*hace que el navegador se pueda abrir en la modalidad movil mostranso asi el menu con sus elementos como el about(resposive design)*/
$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#enviar-correo-btn").click(function() {
  swal({
    title: 'Disculpe usuario',
    text: 'Habilidad bajo desarrollo.',
    timer: 1500
  });
  return false;
});
