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
//        Schema::create('responses', function (Blueprint $table) {
//            $table->id();
//            $table->timestamps();
//        });
        Schema::create('responses', function (Blueprint $table) {
            $table->id();
            $table->string("responded_by");
            $table->string("responded_image");
            $table->string("on_time");
            $table->string("response");
            $table->string("claps");
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
