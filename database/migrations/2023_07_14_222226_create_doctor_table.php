<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('doctor', function (Blueprint $table) {
            $table->id();
            $table->string('documentType');
            $table->string('document');
            $table->string('telephone');
            $table->string('address');
            $table->string('specialization');
            $table->string('professionalCard');
            $table->unsignedBigInteger('userId');
            $table->unsignedBigInteger('consultorioId');
            
            $table->foreign('userId')->references('id')->on('users');
            $table->foreign('consultorioId')->references('id')->on('consultorio');
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctor');
    }
};
