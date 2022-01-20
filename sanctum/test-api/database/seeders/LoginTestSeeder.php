<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class LoginTestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create([
            'name' => 'John Smith',
            'email' => 'john@example.com',
            'password' => bcrypt('asdfasdf')
        ]);
    }
}
