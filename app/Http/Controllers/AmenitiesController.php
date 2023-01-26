<?php

namespace App\Http\Controllers;  
use Illuminate\Http\Request;

class AmenitiesController extends Controller  {  
    public function amenities()  {  
        $viewData = [];  
        $viewData["title"] = "Home Page - Online Store";  

        $viewData["sltDepartamentosBox"] = array(
            1 => array("departamentoValue" => 1, "departamentoCol" => "Something1",  "Selected" => true), 
            2 => array("departamentoValue" => 2, "departamentoCol" => "Something2",  "Selected" => false),
            3 => array("departamentoValue" => 3, "departamentoCol" => "Something3",  "Selected" => false)
        );

        $viewData["sltMunicipiosBox"] = array(
            1 => array("iddep" => 1, "mun" => "Something1", "idmun" => 1), 
            2 => array("iddep" => 2, "mun" => "Something2", "idmun" => 2), 
            3 => array("iddep" => 3, "mun" => "Something3", "idmun" => 3)
        );

        $viewData["sltTiposBox"] = array(
            1 => array("idtp" => 1, "tp" => "Something1", "Selected" => true), 
            2 => array("idtp" => 2, "tp" => "Something2", "Selected" => false), 
            3 => array("idtp" => 3, "tp" => "Something3", "Selected" => false)
        );
    
        return view('pages.amenities')->with("viewData", $viewData);   
    }   
}