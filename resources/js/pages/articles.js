import React, {useState} from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import SearchBox from '../components/search-box';
import ArticleList from '../components/article-list';
import RelatedTags from '../components/related-tags';

import {withRouter} from "react-router-dom";

import fetchArticles from '../http/fetch-articles';


class Articles extends React.Component {

    constructor(props) {
        super(props);
        var temp = new Array(10).fill("pending");
        temp[0] = "crawling";
        this.state = {
            data: [],
            value: '',
            related_tags: [],
            status: temp,
        };
        this.setScrappedData = this.setScrappedData.bind(this);
        this.load10More = this.load10More.bind(this);
        this.restoreState = this.restoreState.bind(this);
    }

    componentDidMount() {
        document.title = 'Home - Medium Scrapper';
        if (this.props.match.params.tag) {
            document.getElementById('article-search-component').style.display = 'none';
            document.getElementById('articles').style.display = 'block';
            fetchArticles(this.props.match.params.tag, this.state.data.length, true, this.setScrappedData);
        }
    }

    setScrappedData(scrappedData, index, value) {
        if (scrappedData["related_tags"]) {
            document.getElementById('articles').style.display = 'none';
            this.setState({related_tags: scrappedData["related_tags"]});
            document.getElementById('related_tags').style.display = 'block';
            return;
        }

        var temp = this.state.data.slice();
        temp.push(scrappedData);
        var status = this.state.status.slice();
        status[(temp.length - 1)] = "crawled";
        if (status.length > temp.length) {
            status[temp.length] = "crawling";
        }
        this.setState({value: value, data: temp, status: status});
    }

    restoreState() {
        var temp = new Array(10).fill("pending");
        temp[0] = "crawling";
        this.setState({value: '', data: [], status: temp, related_tags: []});
        document.getElementById('articles').style.display = 'none';
        document.getElementById('load10More').style.display = 'none';
        document.getElementById('related_tags').style.display = 'none';
    }

    load10More() {
        document.getElementById('articles').style.display = 'block';
        fetchArticles(this.state.value, this.state.data.length, false, this.setScrappedData);
        var status = this.state.status.slice();
        var temp = new Array(10).fill("pending");
        temp[0] = "crawling";
        status.push(...temp);
        this.setState({status: status});
    }


    render() {

        return (
            <div className="container">
                <div>
                    <SearchBox setScrappedData={this.setScrappedData} article_count={this.state.data.length}
                               restoreState={this.restoreState}/>
                </div>
                <div id="related_tags" style={{display: "none"}}>
                    <RelatedTags related_tags={this.state.related_tags}/>
                </div>
                <div>
                    <ArticleList ScrappedData={this.state.data} tag={this.state.value} status={this.state.status}/>
                </div>
                <div id="load10More" style={{display: "none"}}>
                    <button type="button" className="btn btn-primary btn-lg btn-block mb-3"
                            onClick={this.load10More}>Load
                        10 more blogs
                    </button>
                </div>
            </div>
        );
    }
}

export default withRouter(Articles);
