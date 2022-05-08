<?php

namespace Database\Seeders;

use App\Models\Offer;
use App\Models\Usercomment;
use App\Models\User;
use Illuminate\Database\Seeder;

class UsercommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $comment1 = new Usercomment();
        //get first user
        $comment1->user()->associate(User::all()->first());
        //get first offer
        $comment1->offer()->associate(Offer::all()->first());
        $comment1->text = "lmao this offer is noice!";
        $comment1->save();
    }
}
