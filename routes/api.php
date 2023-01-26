<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use Illuminate\Support\Facades\Log;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// filtra los puntos visibles al usuario dentro de la caja-legend 
Route::post('/puntos/puntosMapaCaja', function () {
    Log::debug("Hello world! /puntos/puntosMapaCaja");

    // LayersCaja.push({"nombreLayer":aTempData[i].tipoPunto,"cajaLayer":L.geoJson(null),"direccionIcon":aTempData[i].iconoDir,"idtp":aTempData[i].idtp, "indexEnArray":i});

    $data = [
        array("tipoPunto" => "Restaurants", "iconoDir" => "/img/restaurants.png", "idtp" => 1),
        array("tipoPunto" => "Hotels", "iconoDir" => "/img/hotels.png", "idtp" => 2),
        array("tipoPunto" => "Malls", "iconoDir" => "/img/malls.png", "idtp" => 3)
    ];

    return response()->json($data);
});

//modal desplegado al usuario cuando click en icono sobre mapa
Route::post('/amenities/modalPunto', function () {
    Log::debug("Hello world! /amenities/modalPunto");
    $aListaRespuesta = array( 
        1 => array("tipo" => "Restaurants", "titulo" => "NI idea", "idtp" => 1, "departamento" => "departamento", "municipio" => "NI idea", "descripcion" => "descripcion", "log" => 14.0715518, "lat" => -87.2461207),
        2 => array("tipo" => "Hotels", "titulo" => "NI idea", "idtp" => 2, "departamento" => "departamento", "municipio" => "NI idea", "descripcion" => "descripcion", "log" => 14.0715518, "lat" => -87.2461207),
        3 => array("tipo" => "Malls", "titulo" => "NI idea", "idtp" => 3, "departamento" => "departamento", "municipio" => "NI idea", "descripcion" => "descripcion", "log" => 14.0715518, "lat" => -87.2461207)
    );

    $aFormatearJSON = array();

    foreach ($aListaRespuesta as $clave=>$fila){
        $tempHTMLContent = "<table class='table table-striped table-bordered table-condensed'>" .
                    "<tr><th>Título</th><td>" . utf8_encode($aListaRespuesta[$clave]["titulo"])."</td></tr>" .
                    "<tr><th>Departamento</th><td>".utf8_encode($aListaRespuesta[$clave]["departamento"])."</td></tr>".
                    "<tr><th>Municipio</th><td>".utf8_encode($aListaRespuesta[$clave]["municipio"])."</td></tr>".
                    "<tr><th>Tipo</th><td>".utf8_encode($aListaRespuesta[$clave]["tipo"])."</td></tr>".
                    "<tr><th>Descripción</th><td>".$aListaRespuesta[$clave]["descripcion"]."</td></tr>".
                    "</table>";

        $aFormatearJSON[] = array(
        "type" => "Feature" ,
        "geometry" => array("type" => "Point", "coordinates" => array($aListaRespuesta[$clave]["log"],$aListaRespuesta[$clave]["lat"])),
        "properties" => array("titulo" => utf8_encode($aListaRespuesta[$clave]["titulo"]),
                                "content" => $tempHTMLContent
                                )
        );
    }

    $aEnviarJSON = array("type" => "FeatureCollection", "features" => $aFormatearJSON);

    return response()->json($aEnviarJSON);
});

// COntrola los puntos desplegados sobre el mapa
Route::post('/amenities/puntosEnMapa', function (Request $request) {

    $aRespuestaLista = array( 
        1 => array("idi" => 1,"tipo" => "Restaurants", "titulo" => "NI idea", "idtp" => 1, "departamento" => "departamento", "municipio" => "NI idea", "descripcion" => "descripcion", "lat" => 14.0715518, "log" => -87.2461207),
        2 => array("idi" => 2,"tipo" => "Hotels", "titulo" => "NI idea", "idtp" => 2, "departamento" => "departamento", "municipio" => "NI idea", "descripcion" => "descripcion", "lat" => 14.0715518, "log" => -87.2461207),
        3 => array("idi" => 3,"tipo" => "Malls", "titulo" => "NI idea", "idtp" => 3, "departamento" => "departamento", "municipio" => "NI idea", "descripcion" => "descripcion", "lat" => 14.0715518, "log" => -87.2461207)
    );

    foreach ($aRespuestaLista as $clave=>$fila){
        $aA_FormatearJSON[] = array(
          "type" => "Feature" ,
          "geometry" => array("type" => "Point", "coordinates" => array($aRespuestaLista[$clave]["log"],$aRespuestaLista[$clave]["lat"])),
          "properties" => array("titulo" => utf8_encode($aRespuestaLista[$clave]["titulo"]),
                                "idi"=> $aRespuestaLista[$clave]["idi"],
                                "departamento" => utf8_encode($aRespuestaLista[$clave]["departamento"]),
                                "municipio" => utf8_encode($aRespuestaLista[$clave]["municipio"]),
                                "tipo" => utf8_encode($aRespuestaLista[$clave]["tipo"]),
                                "lugarArray" => $request->lugarArray,
                                "tipoPunto" => $request->tipoPunto
                                )
        );
    }
    
    $aA_EnviarJSON = array("type" => "FeatureCollection", "features" => $aA_FormatearJSON);
    
    return response()->json($aA_EnviarJSON);
});