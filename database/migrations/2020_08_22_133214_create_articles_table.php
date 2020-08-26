<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('creator');
            $table->string('creator_img');
            $table->string('title');
            $table->string('subtitle');
            $table->string('details');
            $table->string('article_image');
            $table->string('short_description');
            $table->string('full_article_link');
            $table->string('claps');
            $table->string('body');
            $table->string('scrapping_time');
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
        Schema::dropIfExists('articles');
    }
}
