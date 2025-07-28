<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Specialization;

class SpecializationSeeder extends Seeder
{
    public function run(): void
    {
        $specializations = [
            'Cardiology',
            'Dermatology',
            'Neurology',
            'Pediatrics',
            'Orthopedics',
            'Gynecology',
            'General Medicine',
        ];

        foreach ($specializations as $specialization) {
            Specialization::firstOrCreate(['name' => $specialization]);
        }
    }
}
