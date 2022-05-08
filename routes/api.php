<?php

use App\Http\Controllers\OfferController;
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
Route::get('offers/{offerId}', [OfferController::class, 'findById']);
//Route::get('books/checkisbn/{isbn}', [BookController::class, 'checkisbn']);

Route::post('auth/login', [\App\Http\Controllers\AuthController::class, 'login']);

Route::group(['middleware' => ['api', 'auth.jwt']], function(){
    Route::post('offers', [OfferController::class, 'save']);
    Route::put('offers/{offerId}', [OfferController::class, 'update']);
    Route::delete('offers/{offerId}', [OfferController::class, 'delete']);
    Route::post('auth/logout', [\App\Http\Controllers\OfferController::class, 'logout']);
});
