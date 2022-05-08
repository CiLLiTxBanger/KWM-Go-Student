<?php

namespace Database\Seeders;

use App\Models\Offer;
use App\Models\Timeslot;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class TimeslotsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $timeslot1 = new Timeslot();
        //get first user
        $timeslot1->user()->associate(User::all()->first());
        //get first offer
        $timeslot1->offer()->associate(Offer::all()->first());
        $timeslot1->start = Carbon::now()->format('Y-m-d H:i:s');
        $timeslot1->end = Carbon::now()->addHour()->format('Y-m-d H:i:s');
        $timeslot1->save();
    }
}
