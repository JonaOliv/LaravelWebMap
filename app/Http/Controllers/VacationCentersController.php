<?php

namespace App\Http\Controllers;  
use Illuminate\Http\Request;

class VacationCentersController extends Controller  {  
    public function vacation_centers()  {  
        $viewData = [];  
        $viewData["title"] = "Home Page - Online Store";  
        return view('pages.vacation_centers')->with("viewData", $viewData);   
    }   
}