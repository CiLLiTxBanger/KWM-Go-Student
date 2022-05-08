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
        $user->password = bcrypt('secret');

        $user->save();
    }
}
