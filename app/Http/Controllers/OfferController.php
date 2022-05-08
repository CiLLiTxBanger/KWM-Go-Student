<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\Image;
use App\Models\Offer;
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


    public function findById($id) {
        $book = Book::where('offer_id', $id)->with(['authors', 'images', 'user'])->first();
        return $book ?? "This isbn does not exist"; //response()->json($book, 200)
    }

    public function checkisbn($isbn) {
        $book = Book::where('isbn', $isbn)->first();
        return $book != null ? response()->json(true, 200) : response()->json(false, 200);
    }

    public function findBySearchTerm($searchTerm) {
        $book = Book::with(['authors', 'images', 'user'])
            ->where('title', 'LIKE', '%' . $searchTerm . '%')
            ->orWhere('subtitle', 'LIKE', '%' . $searchTerm . '%')
            ->orWhere('description', 'LIKE', '%' . $searchTerm . '%')
            ->orWhereHas('authors', function ($query) use ($searchTerm){
                $query->where('firstname', 'LIKE', '%' . $searchTerm . '%')
                ->orWhere('lastname', 'LIKE', '%' . $searchTerm . '%');
            })->get();
        return $book;
    }

    public function save(Request $request) : JsonResponse {
        $request = $this->parseRequest($request);
        /**
         * use a transaction for saving model including relations
         */
        DB::beginTransaction();
        try {
            $book = Book::create($request->all());
            if(isset($request['images']) && is_array($request['images'])) {
                foreach ($request['images'] as $img) {
                    $image = Image::firstOrNew(['url' => $img['url'], 'title' => $img['title']]);
                    $book->images()->save($image);
                }
            }
            if(isset($request['authors']) && is_array($request['authors'])) {
                foreach ($request['authors'] as $author) {
                    $newAuthor = Author::firstOrNew(['firstname' => $author['firstname'], 'lastname' => $author['lastname']]);
                    $book->authors()->save($newAuthor);
                }
            }
            DB::commit();
            return response()->json($book, 200);
        }
        catch(\Exception $e) {
            DB::rollBack();
            return response()->json('saving book failed' . $e->getMessage() . $e->getFile() . $e->getLine(), 420);
        }
    }

    private function parseRequest(Request $request) : Request {
        //get data and convert it - iso8601 - 2022-03-28T14:51:00.00Z
        $date = new \DateTime($request->published);
        $request['published'] = $date;
        return $request;
    }

    public function update(Request $request, string $isbn) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $book = Book::with(['authors', 'images', 'user'])
                ->where('isbn', $isbn)->first();
            if ($book != null) {
                $request = $this->parseRequest($request);
                $book->update($request->all());
                //delete all old images
                $book->images()->delete();
                // save images
                if (isset($request['images']) && is_array($request['images'])) {
                    foreach ($request['images'] as $img) {
                        $image = Image::firstOrNew(['url'=>$img['url'],'title'=>$img['title']]);
                        $book->images()->save($image);
                    }
                }
                //update authors
                $ids = [];
                if (isset($request['authors']) && is_array($request['authors'])) {
                    foreach ($request['authors'] as $auth) {
                        array_push($ids,$auth['id']);
                    }
                }
                $book->authors()->sync($ids);
                $book->save();
            }
            DB::commit();
            $book1 = Book::with(['authors', 'images', 'user'])
                ->where('isbn', $isbn)->first();
            // return a vaild http response
            return response()->json($book1, 201);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating book failed: " . $e->getMessage(), 420);
        }
    }

    public function delete($isbn) : JsonResponse {
        $book = Book::where('isbn', $isbn)->first();
        if($book != null) {
            $book->delete();
        }
        else {
            throw new \Exception('book could not be deleted - it does not exist');
        }
        return response()->json('book (' . $isbn . ') successfully deleted', 200);
    }
}
