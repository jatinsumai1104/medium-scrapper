<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResponsesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('responses', function (Blueprint $table) {
            $table->id();
            $table->longText("responded_by");
            $table->longText("responded_image");
            $table->longText("on_time");
            $table->longText("response");
            $table->longText("claps");
            $table->timestamps();
        });
        Schema::create('article_response', function (Blueprint $table) {
            $table->id();
            $table->unSignedBigInteger("article_id");
            $table->unSignedBigInteger("response_id");
            $table->unique(["article_id", "response_id"]);
            $table->foreign('article_id')->references('id')->on('articles')->onDelete('cascade');
            $table->foreign('response_id')->references('id')->on('responses')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('responses');
    }
}
