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
        Schema::create('consultorio', function (Blueprint $table) {
            $table->id();
            $table->string('number');
            $table->boolean('enable');
            $table->string('type');
            $table->string('description');
            $table->timestamp('created_at')->useCurrent();
            $table->foreignId('medicalCenterId')->constrained(
                table: 'medical_center', indexName: 'medicalCenterId'
            )->onUpdate('cascade')->onDelete('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultorio');
    }
};
