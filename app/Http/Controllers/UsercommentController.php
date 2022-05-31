<?php

namespace App\Http\Controllers;

use App\Models\Usercomment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Type\Time;

class UsercommentController extends Controller
{
    public function save(Request $request) : JsonResponse{
        $request = $this->parseRequest($request);
        DB::beginTransaction();
        try{
            $usercomment = Usercomment::create($request->all());
            $comment = Usercomment::firstOrNew([
                'user_id' => $request['user_id'],
                'offer_id' => $request['offer_id'],
                'text' => $request['text']
            ]);
            $usercomment->save([$comment]);
            DB::commit();
            return response()->json($usercomment, 201);
        }
        catch (\Exception $e){
            DB::rollBack();
            return response()->json('saving usercomment failed'.$e->getMessage(), 420);
        }
    }

    private function parseRequest(Request $request) : Request {
        //get data and convert it - iso8601 - 2022-03-28T14:51:00.00Z
        $date = new \DateTime($request->created_at);
        $request['created_at'] = $date;
        return $request;
    }
}
