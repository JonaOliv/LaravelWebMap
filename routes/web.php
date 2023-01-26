<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'App\Http\Controllers\HomeController@home')->name("pages.home");
Route::get('/home', 'App\Http\Controllers\HomeController@home')->name("pages.home");
Route::get('/logout', 'App\Http\Controllers\AmenitiesController@amenities')->name("pages.logout");
Route::get('/amenities', 'App\Http\Controllers\AmenitiesController@amenities')->name("pages.amenities");
Route::get('/hotels', 'App\Http\Controllers\AmenitiesController@amenities')->name("pages.hotels");
Route::get('/restaurants', 'App\Http\Controllers\AmenitiesController@amenities')->name("pages.restaurants");
Route::get('/amenityForm', 'App\Http\Controllers\AmenitiesController@amenities')->name("pages.amenityForm");



