<?php

use App\Http\Controllers\OfferController;
use App\Http\Controllers\TimeslotController;
use App\Http\Controllers\UsercommentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//alle offer zurückliefern
Route::get('offers', [OfferController::class, 'index']);
Route::get('offers/{offer_id}', [OfferController::class, 'findById']);
Route::get('offers/search/{q}', [OfferController::class, 'findBySearchTerm']);

Route::post('auth/login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::post('offers', [OfferController::class, 'save']);
Route::put('offers/{offerId}', [OfferController::class, 'update']);
Route::delete('offers/{offerId}', [OfferController::class, 'delete']);

Route::post('usercomment', [UsercommentController::class, 'save']);
Route::delete('timeslot/{timeslotId}', [TimeslotController::class, 'delete']);

//Route::group(['middleware' => ['api', 'auth.jwt']], function(){
//    Route::post('offers', [OfferController::class, 'save']);
//    Route::put('offers/{offerId}', [OfferController::class, 'update']);
//    Route::delete('offers/{offerId}', [OfferController::class, 'delete']);
//    Route::post('auth/logout', [\App\Http\Controllers\OfferController::class, 'logout']);
//});
