<?php

namespace App\Http\Controllers;  
use Illuminate\Http\Request;

class HomeController extends Controller  {  
    public function home()  {  
        $viewData = [];  
        $viewData["title"] = "Home Page - Online Store";  

        return view('pages.home')->with("viewData", $viewData);  
    }   
}