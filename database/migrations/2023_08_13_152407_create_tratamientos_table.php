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
        Schema::create('tratamientos', function (Blueprint $table) {
            $table->id();
            $table->string("description");
            $table->integer("quantity");
            $table->timestamp('created_at')->useCurrent();
            $table->unsignedBigInteger('medicamentoId');
            $table->unsignedBigInteger('citasId');

            $table->foreign('medicamentoId')->references('id')->on('medicamentos');
            $table->foreign('citasId')->references('id')->on('citas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tratamientos');
    }
};
