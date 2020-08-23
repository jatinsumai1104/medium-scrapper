<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    protected $guarded=[];

    public function articles(){
        return $this->belongsToMany(Article::class);
    }
}
