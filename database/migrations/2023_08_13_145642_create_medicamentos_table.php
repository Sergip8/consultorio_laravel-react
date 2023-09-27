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
        Schema::create('medicamentos', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("brand");
            $table->enum('dosage', ['ORAL', 'INYECCION',]);
            $table->enum('dosage_form', ['PASTILLA', 'LIQUIDO'])->default('PASTILLA');
            $table->string("dosage_grams");
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicamentos');
    }
};
