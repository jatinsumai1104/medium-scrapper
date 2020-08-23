<?php

namespace App\Http\Middleware;

use Closure;
use HeadlessChromium\BrowserFactory;
use HeadlessChromium\Page;
use Symfony\Component\DomCrawler\Crawler;

class Scrapper
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next){

        $crawler = $this->getCrawler('https://medium.com/tag/'.$request['tag'], true, $request['index']);

        $articles = $crawler->filter('.streamItem');


        dump("Scrapping Data");

        $articles->eq($request['index'])->each(function ($post, $index){
            $scrappedArticle = [
                'creator' => $post->filter('.postMetaInline > .ds-link')->text(),
                'creator_img' => $post->filter('img')->eq(0)->attr('src'),
                'title' => $post->filter('.graf--title')->text(),
                'details' => $post->filter('.postMetaInline > .js-postMetaInlineSupplemental')->text() . ", " . $post->filter('.postMetaInline > .js-postMetaInlineSupplemental > .readingTime')->attr('title'),
                'short_content' => $post->filter('.graf--trailing')->text(),
                'full_article' => $post->filter('.postArticle-readMore > a')->attr('href'),
                'claps' => $post->filter('.js-multirecommendCountButton')->text()
            ];
            $scrappedArticle = $this->getSingleArticleData($scrappedArticle, $post->filter('.postArticle-readMore > a')->attr('href'));

            $this->data = $scrappedArticle;

            dump(($index+1) . " article scrapped Successfully");
        });

//        $request = $this->data;

        $request->replace($this->data);
        \Log::info($request->all());

        return $next($request);
    }

    public function getCrawler($url, $multiple = false, $articleIndex = 0)
    {

        $browserFactory = new BrowserFactory('google-chrome');

        $browser = $browserFactory->createBrowser();

        $page = $browser->createPage();

        $page->navigate($url)->waitForNavigation(Page::LOAD);

        if ($multiple) {

            $articleCount = $page->evaluate("document.getElementsByClassName('streamItem').length")->getReturnValue();

            while ($articleCount <= $articleIndex) {

                $prevScroll = $page->evaluate('document.body.scrollHeight')->getReturnValue();
                $page->evaluate('window.scrollTo(0, document.body.scrollHeight)');
                $afterScroll = $page->evaluate('document.body.scrollHeight')->getReturnValue();

                $articleCount = $page->evaluate("document.getElementsByClassName('streamItem').length")->getReturnValue();
            } ;
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
            'body'        =>    $this->body,
            'tags'        =>    $this->tags,
            'responses'   =>    $this->responses,
        ]);
    }

    public function getResponses($crawler)
    {
        $this->responses = [];
        $crawler->filterXPath('html/body/div/div/div[4]/div[2]/div[3]/div')->each(function ($data, $index) {

            array_push($this->responses, [
                'responser'     =>  $data->filter('img')->attr('alt'),
                'responser_img' =>  $data->filter('img')->attr('src'),
                'on_time'       =>  $data->filterXPath('div/div[1]/div/div[1]')->filter('a')->eq(1)->text(),
                'response'      =>  $data->children()->children()->eq(1)->text(),
                'claps' => $data->filterXPath('div/div[1]/div[3]/div[1]')->filter('h4')->count() > 0 ? $data->filterXPath('div/div[1]/div[3]/div[1]')->filter('h4')->text() : 0,
            ]);

        });
    }

    public function getContentOfPost($crawler)
    {
        $this->body = "";
        $crawler->filter('article')->children()->last()->children('section')->each(function ($x) {

            $x->filter(".n p,h1,h2,h3,h4,h5,h6,img,span")->each(function ($y) {

                if ($y->nodeName() == 'img') {
                    if ($y->attr('src') != "") {
                        $this->body .= "<{$y->nodeName()} src='{$y->attr('src')}'/>";
                    }
                } else {
                    $this->body .= "<{$y->nodeName()}>{$y->text()}</{$y->nodeName()}>";
                }
            });
        });
    }

    public function getTags($crawler)
    {
        $this->tags = [];
//        /html/body/div[1]/div/div[7]/div/div[1]/div/div[3]/ul/li[1]
//        /html/body/div/div/div[7]/div/div[1]/div/div[4]/ul/li[2]
        $crawler->filterXPath('html/body/div/div/div[7]/div/div[1]/div/div')->filter('li')->each(function ($data, $index) {
            $this->tags[$index] = $data->filter('a')->html();
        });
    }

}
