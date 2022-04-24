<?php

namespace Database\Seeders;

use App\Models\Offer;
use App\Models\User;
use Illuminate\Database\Seeder;

class OffersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $offer1 = new Offer();
        //get first user
        $user = User::all()->first();
        $offer1->user()->associate($user);
        $offer1->subject = "JAVA";
        $offer1->description = "Sprechen Sie JAVA";
        $offer1->timeslots = "1,4,5,7";
        $offer1->save();
    }
}
