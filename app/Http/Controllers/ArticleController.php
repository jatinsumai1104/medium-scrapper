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
     * @param \Illuminate\Http\Request $request through Scrapper Middleware
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        set_time_limit(15);
        if (isset($request["tag"])) {
            //Searched tag gets 404 page
            $article = Article::where([
                ['creator', 'like', '%' . $request['tag'] . '%'],
                ['title', 'like', '%' . $request['tag'] . '%'],
                ['subtitle', 'like', '%' . $request['tag'] . '%'],
                ['short_description', 'like', '%' . $request['tag'] . '%'],
                ['body', 'like', '%' . $request['tag'] . '%'],
            ])->skip($request["index"] - 1)->first();
            return response()->json($article);
        }

        if (!isset($request['title'])) {
            //Searched Tag has No Articles so send related tags
            return response()->json($request);
        }

        $article = $this->store($request);
        return response()->json($article->toArray());

    }


    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return Article
     */
    public function store(Request $request)
    {

        $article = Article::firstOrCreate(
            [
                'title'             => $request['title'],
            ],
            [
                'subtitle'          => $request['subtitle'],
                'creator'           => $request['creator'],
                'creator_img'       => $request['creator_img'],
                'details'           => $request['details'],
                'short_description' => $request['short_description'],
                'claps'             => $request['claps'],
                'full_article_link' => $request['full_article_link'],
                'body'              => $request['body'],
                'article_image'     => $request['article_image'],
                'scrapping_time'    => $request["scrapping_time"],
                'responses_count'   => $request["responses_count"]
            ]);

        $article_tag = [];
        foreach ($request->tags as $index => $tag) {
            $article_tag[$index] = Tag::firstOrCreate(['name' => $tag])->id;
        }

        $article_response = [];
        foreach ($request->responses as $index => $response) {
            $article_response[$index] = Response::firstOrCreate($response)->id;
        }


        $article->tags()->sync($article_tag);
        $article->responses()->sync($article_response);

        return $article;
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Article $article
     * @return \Illuminate\Http\Response
     */
    public function show(Article $article)
    {
        $article->update(['visit_count' => ($article['visit_count'] + 1)]);
        $article->tags;
        $article->responses;
        return response()->json($article);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Article $article
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Article $article)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Article $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article $article)
    {
        //
    }

    public function getPopularArticles()
    {
        $articles = Article::orderBy('visit_count', 'DESC')->get();

        $articles->each(function ($article) {

            if (ctype_alpha($article->claps[strlen($article->claps) - 1])) {
                switch ($article->claps[strlen($article->claps) - 1]) {
                    case 'k':
                        ;
                    case 'K':
                        $article->claps = "" . substr($article->claps, 0, strlen($article->claps) - 1) * 1000;
                        break;
                    case 'm':
                        ;
                    case 'M':
                        $article->claps = substr($article->claps, 0, strlen($article->claps) - 1) * 1000000;
                        break;
                }
            }
        });

        return response()->json($articles->toArray());

    }
}
