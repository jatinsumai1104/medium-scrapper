<?php

namespace App\Http\Controllers;

use App\Article;
use App\Response;
use App\SearchHistory;
use App\Tag;
use HeadlessChromium\BrowserFactory;
use HeadlessChromium\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Psy\Exception\FatalErrorException;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\ErrorHandler\Error\FatalError;

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
        if (isset($request["tag"])) {
            //Searched tag gets 404 page

            $article = Article::where([
                ['creator', 'like', '%'.$request['tag'].'%'],
                ['title', 'like', '%'.$request['tag'].'%'],
                ['subtitle', 'like', '%'.$request['tag'].'%'],
                ['short_description', 'like', '%'.$request['tag'].'%'],
                ['body', 'like', '%'.$request['tag'].'%'],
            ])->skip($request["index"]-1)->first();
            return response()->json($article);
        }

        if (!isset($request['title'])) {
            return response()->json($request);
        }

        $article = $this->store($request);
        return response()->json([
            'id' => $article->id,
            'creator' => $request['creator'],
            'creator_img' => $request['creator_img'],
            'title' => $request['title'],
            'subtitle' => $request['subtitle'],
            'details' => $request['details'],
            'short_description' => $request['short_description'],
            'claps' => $request['claps'],
            'responses_count' => $request['responses_count'],
            'article_image' => $request['article_image'],
            'scrapping_time' => $request["scrapping_time"]
        ]);

    }


    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return Article
     */
    public function store(Request $request)
    {
        $occurrence = 0;
        $offset = 0;

        while (($offset = strpos($request['body'], '<img', $offset)) !== false) {
            if ($occurrence++) {
                break;
            }
            $offset += strlen('<img');
        }

        $article = Article::firstOrCreate([
            'title' => $request['title'],
        ],
            [
                'subtitle' => $request['subtitle'],
                'creator' => $request['creator'],
                'creator_img' => $request['creator_img'],
                'details' => $request['details'],
                'short_description' => $request['short_description'],
                'claps' => $request['claps'],
                'full_article_link' => $request['full_article_link'],
                'body' => substr($request['body'], $offset),
                'article_image' => $request['article_image'],
                'scrapping_time' => $request["scrapping_time"]
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


    public function saveHistory($request)
    {

//        Log::info("Saving History");
//        $searchHistory = SearchHistory::create([
//            'name' => $request['search'],
//        ]);

        dump("Hello");

//        return response()->json(['history'=>'Jatinsumai']);
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
}
