<?php

namespace App\Http\Middleware;

use Closure;
use HeadlessChromium\BrowserFactory;
use HeadlessChromium\Page;
use Symfony\Component\DomCrawler\Crawler;

class Scrapper
{

//    $related_tags = [];

    /**
     * Scrapping data from webpage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $start_time = now();

        $crawler = $this->getCrawler('https://medium.com/tag/' . $request['tag'], true, $request['index']);


        if ($crawler === "404") {
            $request["status"] = "Page Not Found";
            return $next($request);
        }

        $this->related_tags = [];


        $articles = $crawler->filter('.streamItem');


        if ($articles->count() == 0) {

            $crawler->filter('.tags--postTags > li')->each(function ($related_tags) {
                array_push($this->related_tags, $related_tags->text());
            });

            $this->data["related_tags"] = $this->related_tags;

            $this->data["status"] = "Article Not Found";

            $request->replace($this->data);

            return $next($request);


        }
        if ($articles->count() <= $request['index']) {
            $this->data["status"] = "Article Not Found";

            $request->replace($this->data);

            return $next($request);
        }

        $articles->eq($request['index'])->each(function ($post, $index) {


            $scrappedArticle = [
                'creator' => $post->filter('.postMetaInline > .ds-link')->text(),
                'creator_img' => $post->filter('img')->eq(0)->attr('src'),
                'title' => $post->filter('.graf--title')->text(),
                'subtitle' => $post->filter('.graf--subtitle')->count() ? $post->filter('.graf--subtitle')->text() : '',
                'details' => $post->filter('.postMetaInline > .js-postMetaInlineSupplemental')->text() . ", " . $post->filter('.postMetaInline > .js-postMetaInlineSupplemental > .readingTime')->attr('title'),
                'short_description' => $post->filter('.graf--p')->count() ? $post->filter('.graf--p')->text() : '',
                'full_article_link' => $post->filter('.postArticle-readMore > a')->attr('href'),
                'claps' => $post->filter('.js-multirecommendCountButton')->count() > 0 ? $post->filter('.js-multirecommendCountButton')->text() : 0,
                'responses_count' => $post->filter('.js-bookmarkButton')->siblings()->count() > 0 ? $post->filter('.js-bookmarkButton')->siblings()->text() : '0 Responses',
                'article_image' => $post->filter('.graf-image')->count() > 0 ? $post->filter('.graf-image')->attr('src') : '',
            ];
            $scrappedArticle = $this->getSingleArticleData($scrappedArticle, $post->filter('.postArticle-readMore > a')->attr('href'));

            $this->data = $scrappedArticle;
        });


        $end_time = now();

        $this->data['scrapping_time'] = $start_time->diffInSeconds($end_time);
        $this->data["status"] = "Article Found";

        $request->replace($this->data);

        return $next($request);

    }

    public function getCrawler($url, $multiple = false, $articleIndex = 0)
    {

        $browserFactory = new BrowserFactory('google-chrome');

        $browser = $browserFactory->createBrowser(['headless' => true,'noSandbox' => true]);

        $page = $browser->createPage();

        $page->navigate($url)->waitForNavigation(Page::LOAD);

        $title = $page->evaluate('document.title')->getReturnValue();

        if (trim(explode("–", $title)[0], " ") == "Not Found") {

            //404

            return "404";
        }

        if ($multiple) {

            $articleCount = $page->evaluate("document.getElementsByClassName('streamItem').length")->getReturnValue();

            if ($articleCount != 0) {

                while ($articleCount <= $articleIndex) {

                    if($articleCount%10 != 0){
                        break;
                    }
                    $prevScroll = $page->evaluate('document.body.scrollHeight')->getReturnValue();
                    $page->evaluate('window.scrollTo(0, document.body.scrollHeight)');
                    $afterScroll = $page->evaluate('document.body.scrollHeight')->getReturnValue();

                    $articleCount = $page->evaluate("document.getElementsByClassName('streamItem').length")->getReturnValue();
                }
            }
        }

        $page->addScriptTag([
            'url' => 'https://code.jquery.com/jquery-3.3.1.min.js'
        ])->waitForResponse();

        $pageHtml = $page->evaluate('$("html").html()')->getReturnValue();

        $browser->close();

        return new Crawler($pageHtml);
    }

    public function getSingleArticleData($scrappedArticle, $url)
    {
        $crawler = $this->getCrawler($url);

        $this->getTags($crawler);
        $this->getContentOfPost($crawler);
        $this->getResponses($crawler);

        return array_merge($scrappedArticle, [
            'body'      => $this->body,
            'tags'      => $this->tags,
            'responses' => $this->responses,
        ]);
    }

    public
    function getResponses($crawler)
    {
        $this->responses = [];
        $crawler->filterXPath('html/body/div/div/div[4]/div[2]/div[3]/div')->each(function ($data, $index) {

            array_push($this->responses, [
                'responded_by'      => $data->filter('img')->attr('alt'),
                'responded_image'   => $data->filter('img')->attr('src'),
                'on_time'           => $data->filterXPath('div/div[1]/div/div[1]')->filter('a')->eq(1)->text(),
                'response'          => $data->children()->children()->eq(1)->text(),
                'claps'             => $data->filterXPath('div/div[1]/div[3]/div[1]')->filter('h4')->count() > 0 ? $data->filterXPath('div/div[1]/div[3]/div[1]')->filter('h4')->text() : 0,
            ]);

        });
    }

    public
    function getContentOfPost($crawler)
    {
        $this->body = "";
        $crawler->filter('article')->children()->last()->children('section')->each(function ($x) {

            $x->filter(".n p,h1,h2,h3,h4,h5,h6,img,span")->each(function ($y) {

                if ($y->nodeName() == 'img') {

                    if ($y->attr('srcset') != "") {
                        $this->body .= "<{$y->nodeName()} src='{$y->attr('src')}' class='img-fluid rounded d-block my-2 mx-auto'/> ";
                    }
                } else {
                    $this->body .= "<{$y->nodeName()}>{$y->text()}</{$y->nodeName()}>";
                }
            });
        });

        $occurrence = 0;
        $offset = 0;

        while (($offset = strpos($this->body, '<img', $offset)) !== false) {
            if ($occurrence++) {
                break;
            }
            $offset += strlen('<img');
        }
        $this->body = substr($this->body, $offset);
    }

    public
    function getTags($crawler)
    {
        $this->tags = [];
        $crawler->filterXPath('html/body/div/div/div[7]/div/div[1]/div/div')->filter('li')->each(function ($data, $index) {
            $this->tags[$index] = $data->filter('a')->html();
        });
    }

}
