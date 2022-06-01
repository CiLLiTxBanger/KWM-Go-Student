<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Models\Timeslot;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Type\Time;

class UserController extends Controller
{
    public function getUser($userId) : JsonResponse {
        $user = User::with(['offers', 'offers.timeslots'])->where('id', $userId)->first();
        if($user != null) {
            return response()->json($user, 201);
        }
        else {
            throw new \Exception('user could not be retrieved - it does not exist');
        }
    }
}
