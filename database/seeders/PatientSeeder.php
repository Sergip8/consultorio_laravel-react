<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Date;
use IntlChar;

class PatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('patients')->insert([
            'documentType' => "CC",
            'document' => Str::random(10),
            'telephone' => Str::random(10),
            'address' => Str::random(10),
            'gender' => "Hombre",
            'birthDate' => Date("Y-m-d"),
            'userId' => 1,
            
        ]);
         
        
        
    
    }
}
