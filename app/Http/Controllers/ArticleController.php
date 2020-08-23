<?php

namespace App\Http\Controllers;

use App\Article;
use App\Response;
use App\Tag;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Send a listing of the articles.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->store($request);
        return response()->json([
            'creator'=>$request['creator'],
            'creator_img'=>$request['creator_img'],
            'title'=>$request['title'],
            'details'=>$request['details'],
            'short_description'=>$request['short_description'],
            'claps'=>$request['claps'],
            'responses_count'=>$request['responses_count'],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $article = Article::create([
            'creator'=>$request['creator'],
            'creator_img'=>$request['creator_img'],
            'title'=>$request['title'],
            'details'=>$request['details'],
            'short_description'=>$request['short_description'],
            'claps'=>$request['claps'],
            'full_article_link'=>$request['full_article_link'],
            'body' => $request['body'],
        ]);

        $article_tag = [];
        foreach ($request->tags as $index => $tag){
            $article_tag[$index] = Tag::create(['name' => $tag])->id;
        }

        $article_response = [];
        foreach ($request->responses as $index => $response){
            $article_response[$index] = Response::create($response)->id;
        }


        $article->tags()->attach($article_tag);
        $article->responses()->attach($article_response);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function show(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Article $article)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article $article)
    {
        //
    }
}
