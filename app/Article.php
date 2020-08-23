<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    public function tags(){
        return $this->belongsToMany(Tag::class);
    }

    public function responses(){
        return $this->belongsToMany(Response::class);
    }
}
