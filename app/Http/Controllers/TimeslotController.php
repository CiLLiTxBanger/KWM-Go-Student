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

    public function updateUserId(Request $request, int $timeslotId): JsonResponse {
//        DB::beginTransaction();
        try {
            $timeslot = Timeslot::where('id', $timeslotId)->first();
            $userId = $request->input('user_id');

            $timeslot->user_id = $userId;
            $timeslot->save();
            DB::commit();
            return response()->json('timeslot (' . $timeslotId . ') successfully booked to user (' . $userId . ')', 201);
//            $timeslot1 = Timeslot::where('id', $timeslotId)->first();
//            // return a vaild http response
//            return response()->json($timeslot1, 201);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating offer failed: " . $e->getMessage(), 420);
        }

    }
}
