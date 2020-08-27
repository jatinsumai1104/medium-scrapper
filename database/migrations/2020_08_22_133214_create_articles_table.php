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
            $table->mediumText('creator_img');
            $table->string('title');
            $table->string('subtitle');
            $table->string('details');
            $table->mediumText('article_image');
            $table->string('short_description');
            $table->string('full_article_link');
            $table->string('claps');
            $table->longText('body');
            $table->string('scrapping_time');
            $table->string('responses_count')->default(0);
            $table->string("visit_count")->default(0);
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
