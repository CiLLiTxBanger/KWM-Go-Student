<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\Image;
use App\Models\Offer;
use App\Models\Timeslot;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OfferController extends Controller
{
    public function index() {

        //load all books and relations with eager loading - eager gegenteil von lazy - alles ist sofort da
        $offers = Offer::with(['user', 'timeslots', 'usercomments'])->get();
        return $offers;
    }


    public function findById($offer_id) {
        $offer = Offer::where('id', $offer_id)->with(['user'])->first();
        return $offer ?? "This offer_id does not exist"; //response()->json($book, 200)
    }

//    public function checkisbn($isbn) {
//        $book = Book::where('isbn', $isbn)->first();
//        return $book != null ? response()->json(true, 200) : response()->json(false, 200);
//    }

    public function findBySearchTerm($searchTerm) {
        $offer = Offer::with(['user', 'timeslots'])
            ->where('subject', 'LIKE', '%' . $searchTerm . '%')
            ->orWhere('description', 'LIKE', '%' . $searchTerm . '%')
            ->get();
        return $offer;
    }

    public function save(Request $request) : JsonResponse {
        $request = $this->parseRequest($request);
        /**
         * use a transaction for saving model including relations
         */
        DB::beginTransaction();
        try {
            $offer = Offer::create($request->all());
//            if(isset($request['images']) && is_array($request['images'])) {
//                foreach ($request['images'] as $img) {
//                    $image = Image::firstOrNew(['url' => $img['url'], 'title' => $img['title']]);
//                    $book->images()->save($image);
//                }
//            }
//            if(isset($request['users']) && is_array($request['users'])) {
//                foreach ($request['users'] as $user) {
//                    $newUser = User::firstOrNew(['firstname' => $author['firstname'], 'lastname' => $author['lastname']]);
//                    $book->authors()->save($newAuthor);
//                }
//            }
            DB::commit();
            return response()->json($offer, 200);
        }
        catch(\Exception $e) {
            DB::rollBack();
            return response()->json('saving offer failed' . $e->getMessage() . $e->getFile() . $e->getLine(), 420);
        }
    }

    private function parseRequest(Request $request) : Request {
        //get data and convert it - iso8601 - 2022-03-28T14:51:00.00Z
        $date = new \DateTime($request->created_at);
        $request['created_at'] = $date;
        return $request;
    }

    public function update(Request $request, string $offer_id) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $offer = Offer::with(['user', 'timeslots', 'usercomments'])
                ->where('id', $offer_id)->first();
            if ($offer != null) {
                $request = $this->parseRequest($request);
                $offer->update($request->all());
                //delete all old timeslots
                $offer->timeslots()->delete();
                // save timeslots
                if (isset($request['timeslots']) && is_array($request['timeslots'])) {
                    foreach ($request['timeslots'] as $slot) {
                        $timeslot = Timeslot::firstOrNew(['start'=>$slot['start'],'end'=>$slot['end']]);
                        $offer->timeslots()->save($timeslot);
                    }
                }
                $offer->save();
            }
            DB::commit();
            $offer1 = Offer::with(['user', 'timeslots', 'usercomments'])
                ->where('id', $offer_id)->first();
            // return a vaild http response
            return response()->json($offer1, 201);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating offer failed: " . $e->getMessage(), 420);
        }
    }

    public function delete($offer_id) : JsonResponse {
        $offer = Offer::where('id', $offer_id)->first();
        if($offer != null) {
            $offer->delete();
        }
        else {
            throw new \Exception('offer could not be deleted - it does not exist');
        }
        return response()->json('offer (' . $offer_id . ') successfully deleted', 200);
    }
}
