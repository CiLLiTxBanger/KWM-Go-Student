<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Models\Timeslot;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Type\Time;

class TimeslotController extends Controller
{
    public function delete($timeslotId) : JsonResponse {
        $timeslot = Timeslot::where('id', $timeslotId)->first();
        if($timeslot != null) {
            $timeslot->delete();
        }
        else {
            throw new \Exception('timeslot could not be deleted - it does not exist');
        }
        return response()->json('timeslot (' . $timeslotId . ') successfully deleted', 200);
    }
}
