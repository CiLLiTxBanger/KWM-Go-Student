<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->firstname = "David";
        $user->lastname = "Hasselhoff";
        $user->email = "test@gmail.com";
        $user->description = "The one and only";
        $user->phonenumber = "+43 66474767498";
        $user->role = true;
        $user->password = bcrypt('secret');

        $user->save();

        $user2 = new User();
        $user2->firstname = "Susi";
        $user2->lastname = "Mayer";
        $user2->email = "test2@gmail.com";
        $user2->description = "i like cookies";
        $user2->phonenumber = "+43 66474767499";
        $user2->role = false;
        $user2->password = bcrypt('secret2');

        $user2->save();
    }
}
