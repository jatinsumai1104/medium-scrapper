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
     * @param  \Illuminate\Http\Request  $request through Scrapper Middleware
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $article = $this->store($request);
        return response()->json([
            'id'                =>  $article->id,
            'creator'           =>  $request['creator'],
            'creator_img'       =>  $request['creator_img'],
            'title'             =>  $request['title'],
            'subtitle'          =>  $request['subtitle'],
            'details'           =>  $request['details'],
            'short_description' =>  $request['short_description'],
            'claps'             =>  $request['claps'],
            'responses_count'   =>  $request['responses_count'],
            'article_image'     =>  $request['article_image'],
            'related_tags'      =>  $request['related_tags'],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Article
     */
    public function store(Request $request)
    {
        $article = Article::firstOrCreate([
                'title'             =>  $request['title'],
            ],
            [
                'subtitle'          =>  $request['subtitle'],
                'creator'           =>  $request['creator'],
                'creator_img'       =>  $request['creator_img'],
                'details'           =>  $request['details'],
                'short_description' =>  $request['short_description'],
                'claps'             =>  $request['claps'],
                'full_article_link' =>  $request['full_article_link'],
                'body'              =>  $request['body'],
                'article_image'     =>  $request['article_image'],
        ]);

        $article_tag = [];
        foreach ($request->tags as $index => $tag){
            $article_tag[$index] = Tag::firstOrCreate(['name' => $tag])->id;
        }

        $article_response = [];
        foreach ($request->responses as $index => $response){
            $article_response[$index] = Response::firstOrCreate($response)->id;
        }


        $article->tags()->sync($article_tag);
        $article->responses()->sync($article_response);

        return $article;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function show(Article $article)
    {
        $article->tags;
        $article->responses;
        return response()->json($article);
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
