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
        Schema::create('citas', function (Blueprint $table) {
            $table->id();
            $table->timestamp('date');
            $table->integer('slot');
           
            $table->string('type');
            $table->enum('status', ['ASIGNADO', 'ATENDIDO', 'CANCELADO'])->default('ASIGNADO');
            $table->string('description');
            $table->timestamp('created_at')->useCurrent();
            $table->unsignedBigInteger('patientId');
            $table->unsignedBigInteger('doctorId');

            $table->foreign('patientId')->references('id')->on('patients');
            $table->foreign('doctorId')->references('id')->on('doctor');

            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('citas');
    }
};
