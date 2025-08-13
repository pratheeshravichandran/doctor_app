<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create an admin user
        User::create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@gmail.com',
            'phone_number' => '9999999999',
            'password' => Hash::make('password123'), // never store plain text passwords
            'role_id' => 1, // assuming Admin has role_id = 1
            'dob' => '1990-01-01',
        ]);
    }
}
